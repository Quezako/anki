import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn

from aqt import mw
from aqt.qt import QTimer

PORT = 8766


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True


class FilteredDeckHandler(BaseHTTPRequestHandler):
    def _send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        length = int(self.headers.get('Content-Length', 0))
        if length <= 0:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw.decode('utf-8'))
        except Exception:
            return {}

    def do_GET(self):
        if self.path != '/':
            self.send_error(404)
            return
        self._send_json({'status': 'ok', 'message': 'Filtered deck addon is running.'})

    def do_POST(self):
        if self.path == '/create_filtered_deck':
            payload = self._read_json()
            name = payload.get('name')
            search = payload.get('search')
            limit = payload.get('limit', 9999)
            order = payload.get('order')

            if not name or not search:
                self._send_json({'error': 'Missing required name or search parameter.'}, status=400)
                return

            try:
                did = mw.col.decks.new_filtered(name)
                deck = mw.col.decks.get(did)
                deck['terms'] = [[search, limit, 0]]
                deck['dyn'] = True
                if order:
                    # Set the order for the filtered deck
                    order_map = {
                        'oldest': 0,
                        'random': 1,
                        'interval': 2,
                        'intervalDesc': 3,
                        'lapses': 4,
                    }
                    order_value = order_map.get(order, 0)  # default to oldest
                    deck['terms'][0][2] = order_value
                mw.col.decks.save(deck)
                mw.col.save()
                self._send_json({'deck_id': did, 'deckName': name})
            except Exception as exc:
                self._send_json({'error': str(exc)}, status=500)
        elif self.path == '/get_deck_config':
            payload = self._read_json()
            deck_name = payload.get('deck')
            if not deck_name:
                self._send_json({'error': 'Missing deck parameter.'}, status=400)
                return
            try:
                deck = mw.col.decks.by_name(deck_name)
                if not deck:
                    self._send_json({'error': 'Deck not found.'}, status=404)
                    return
                config = mw.col.decks.config_dict_for_deck_id(deck['id'])
                self._send_json(config)
            except Exception as exc:
                self._send_json({'error': str(exc)}, status=500)
        else:
            self.send_error(404)

    def log_message(self, format, *args):
        return


def start_server():
    if getattr(mw, 'filtered_deck_server', None):
        return

    try:
        server = ThreadedHTTPServer(('127.0.0.1', PORT), FilteredDeckHandler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        mw.filtered_deck_server = server
        mw.filtered_deck_server_thread = thread
    except OSError as exc:
        mw.filtered_deck_server = None
        print(f'Filtered deck addon failed to start HTTP server: {exc}')


QTimer.singleShot(0, start_server)

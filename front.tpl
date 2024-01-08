<span id="external_links">
  <span id="kanji_key">{{kanji:key}}</span>
  <span id="kana_key">{{kana:key}}</span>
  <span id="kanji_only">{{kanji_only}}{{^kanji_only}}{{kanji:key}}{{/kanji_only}}</span>
  <span id="dict_key">{{dict_key}}</span>
</span>

<br>

<a class="replay-button soundLink" href="#" onclick="pycmd('play:a:0'); return false;"><svg viewBox="0 0 64 64"
    version="1.1">
    <circle cx="32" cy="32" r="29"></circle>
    <rect x="17" y="17" width="30" height="30" stroke="#333" fill="#333" stroke-width="5" />
  </svg></a>
<span id="stop_sound">[sound:empty.ogg]</span>{{#voc_mp3}}{{edit:voc_mp3}}<br>{{/voc_mp3}}

<details>
  <summary>kana hint</summary>
  <span id="kana_hint">
    {{kana:kun_pre}}
    <span id="kana_hint_main" class="furi">{{kana:voc_furi}}{{^voc_furi}}{{kana:key}}{{/voc_furi}}</span>
    {{kana:kun_post}}
  </span><br>

</details>

<details>
  <summary>kanji hint</summary>
  <span id="kanji_hint">
    <span
      id="KanjiFront">{{kanji:kun_pre}}<span>{{kanji:voc_furi}}{{^voc_furi}}{{kanji:key}}{{/voc_furi}}</span>{{kanji:kun_post}}</span>
  </span>
</details>

{{#voc_sentence_ja}}<span id="furigana">{{edit:hint:furigana:voc_sentence_ja}}</span><br>{{/voc_sentence_ja}}

{{#voc_notes_personal}}
<br>
<details>
  <summary>voc notes</summary><span id="voc_notes">{{edit:furigana:voc_notes_personal}}</span>
</details>
{{/voc_notes_personal}}

<br>
<div class="tags">{{edit:Tags}}</div>

<span id="source"></span>

<script type="text/javascript" src="anki-loader.js"></script>
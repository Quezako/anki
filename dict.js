async function start() {
    const sqlPromise = await initSqlJs({
        locateFile: file => `../sql-wasm.wasm`
    });

    const dataPromise = fetch("../assets/db/dict.sqlite").then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));

    arrTags = kanji_only.split('');
    console.log(kanji_only);
    console.log(arrTags);

    $.each(arrTags, function (index) {
        const stmt = db.prepare("SELECT * FROM Quezako WHERE kanji_only = '" + arrTags[index] + "' AND key LIKE '" + arrTags[index] + "[%'");
        const result = stmt.getAsObject({ ':aval': 1, ':bval': 'world' });
        document.body.innerHTML += ('<br><br>' + result.fr_chmn_mnemo.split('\n')[0]);
    });
}
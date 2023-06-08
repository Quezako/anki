async function start() {
	const sqlPromise = await initSqlJs({
	  locateFile: file => `../sql-wasm.wasm`
	});

	// const dataPromise = fetch("../dict.db").then(res => res.arrayBuffer());
	const dataPromise = fetch("../anki.db").then(res => res.arrayBuffer());
	const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
	const db = new SQL.Database(new Uint8Array(buf));


	arrTags = kanji_only.split('');
		console.log(kanji_only);
		console.log(arrTags);

	$.each(arrTags, function (index) {
		// const stmt = db.prepare("SELECT * FROM dict WHERE tags LIKE '%JLPT::5%' ORDER BY RANDOM() LIMIT 1");
		// const stmt = db.prepare("SELECT * FROM Quezako WHERE kanji_only = '" + kanji_only + "'");
		const stmt = db.prepare("SELECT * FROM Quezako WHERE kanji_only = '"+arrTags[index]+"' AND key LIKE '"+arrTags[index]+"[%'");

		const result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});

		// console.log(result);
		// console.log(result.fr_chmn_mnemo);
		// console.log(result.kanji_mnemo_personal);
		// var tbody = document.getElementById('tbody');
		// console.log(Object.keys(result).length);

		// for (const [key, value] of Object.entries(result)) {
		  // console.log(`${key}: ${value}`);
		  // document.getElementById('tbody').innerHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
		// }

		// document.body.innerHTML += (result.kanji_mnemo_personal.replace(/[A-z]/g, "").trim().split('\n').splice(1).join("<br />"));
		// document.body.innerHTML += ('<br><br>'+result.kanji_mnemo_personal.split('\n')[0]);
		document.body.innerHTML += ('<br><br>'+result.fr_chmn_mnemo.split('\n')[0]);
	});
}
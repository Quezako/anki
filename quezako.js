/**
 * TODO:
 * sqlwasm introuvable sur anki mobile.
 * freeze de 10 secondes sur anki pc.
 * double chargement des details.
 * kanji_mnemo_personal: n'afficher que la ligne concernée, avec regexp.
 * ajouter mneno read pour chaque kanji.
 * détails des radiicaux.
 */
$(function () {
  var isLoaded = true;

  if (document.querySelector("#mnemo_personal") && !document.querySelector("#each_details")) {
    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
      console.log('mobile');
      $.getScript("sql-wasm.js")
        .fail(function () {
          $.getScript("https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.1/dist/sql-wasm.js")
            .fail(function (jqxhr, settings, exception) {
              console.log(jqxhr, settings, exception);
              isLoaded = false;
            });
        });
    } else {
      console.log('PC');
      $.getScript("sql-wasm.js")
        .fail(function (jqxhr, settings, exception) {
          console.log(jqxhr, settings, exception);
          $.getScript("http://localhost/js/sql-wasm.js")
            .fail(function (jqxhr, settings, exception) {
              $.getScript("https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.1/dist/sql-wasm.js")
                .fail(function (jqxhr, settings, exception) {
                  console.log(jqxhr, settings, exception);
                  isLoaded = false;
                });
            });
        });
    }
  }

  if (isLoaded) {
    dbSearch();
  }

  async function _FileExist(src1, src2) {
    var http = new XMLHttpRequest();
    http.open('HEAD', src1, false);
    http.send();
    if (http.status === 200) {
      return src1;
    } else {
      return src2;
    }
  }

  // Auto fetch kanji details + radical details.
  async function dbSearch() {
    var sqlwasm = await _FileExist('sql-wasm.wasm', '../../js/sql-wasm.wasm');
    const sqlPromise = await initSqlJs({
      locateFile: (file) => sqlwasm,
    });

    const dataPromise = fetch(await _FileExist("vocab.db", "../db/vocab.db")).then((res) => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
    const db = new SQL.Database(new Uint8Array(buf));

    const dataPromise2 = fetch(await _FileExist("chmn-full.db", "../db/chmn-full.db")).then((res) => res.arrayBuffer());
    const [SQL2, buf2] = await Promise.all([sqlPromise, dataPromise2]);
    const db2 = new SQL.Database(new Uint8Array(buf2));

    strSearch = $('#KanjiFront span:first').text();
    var strKanjiOnly = strSearch.replace(/[^一-龯々ヶ]/gi, "");
    var strDetails = '<span id="each_details">';

    Array.from(strKanjiOnly).forEach((element) => {
      stmt = db.prepare(
        `SELECT kanji_mnemo_personal FROM Quezako WHERE kanji_mnemo_personal LIKE "%${element} :%"`
      );
      result = stmt.getAsObject({});
      var strDetails2 = result.kanji_mnemo_personal ? `- Menmo perso: ${result.kanji_mnemo_personal}<br>` : '';

      stmt = db.prepare(
        `SELECT chmn_mean, fr_chmn_mnemo, mean, fr_koohii_story_1, fr_koohii_story_2, fr_mean_mnemo_wani, fr_story_wani_mean, fr_mean_mnemo_wani2, fr_story, Tags FROM Quezako WHERE key = "${element}" OR key LIKE "${element}[%"`
      );
      result = stmt.getAsObject({});
      var strDetails3 = result.chmn_mean ? result.chmn_mean : `<u>${element}</u>: ${result.mean}`;
      var strDetails4 = result.fr_chmn_mnemo ? `- Mnemo chmn:<br>${result.fr_chmn_mnemo}` : '';

      strDetails += `<details><summary>${strDetails3}</summary>`;
      strDetails += `${strDetails2}${strDetails4}`;
      strDetails += `<details><summary>more info</summary>`;

      for (var [key, val] of Object.entries(result)) {
        if (key != 'chmn_mean' && key != 'fr_chmn_mnemo') {
          strDetails += val ? `* ${key}: ${val}<br />` : "";
        }
      }

      stmt = db2.prepare(
        `SELECT meaning, mnemonics FROM \`chmn-full2\` WHERE hanzi = "${element}" OR hanzi2 = "${element}" OR alike = "${element}"`
      );
      result = stmt.getAsObject({});

      for (var [key, val] of Object.entries(result)) {
        strDetails += val ? `* chmn DB ${key}: ${val}<br />` : "";
      }

      strDetails += "</details></details><hr>";
    });

    strDetails += '</span">';


    if (!document.querySelector("#each_details")) {
      document.querySelector("#mnemo_personal").innerHTML += strDetails;
    }

  }

  /** JLPT **/
  var keyColorWord = '';
  var isCommon = 0;
  var arrResult = ['', '', [], ''];
  var arrColor = ['', 'FF0000', 'FF00FF', 'FFFF00', '00FFFF', '00FF00'];
  var arrColorBg = ['', '990000', '990099', '999900', '009999', '009900'];
  var arrKanji = [];

  if ($('#KanjiFront span').length) {
    arrKanji = $('#KanjiFront span').html().split('');
    $('#KanjiFront, #KanjiFront *').css('font-size', '3rem').css('line-height', '4rem');
  }

  if ($('.tags div').length) {
    strTagsElement = '.tags div';
  } else {
    strTagsElement = '.tags';
  }

  arrTags = $(strTagsElement).html().split(" ");

  var re = /([\u4e00-\u9faf\u3400-\u4dbf])/g;
  var str = $('#KanjiFront span').html();
  var matches = [];

  while ((match = re.exec(str)) != null) {
    matches.push(match.index);
  }

  $.each(arrTags, function (index) {
    if (arrTags[index] === 'Common') {
      arrResult[0] = '<span style="background: green;">Common</span>';
      isCommon = 1;
    } else if (/^JLPT::([0-9])$/.test(arrTags[index])) {
      keyColorWord = arrTags[index].replace(/^JLPT::([0-9])$/, "$1");
      arrResult[1] = '<span style="color: #' + arrColor[keyColorWord] + ';">' + arrTags[index] + '</span>';
    } else if (/^JLPT::K([0-9])::([0-9])$/.test(arrTags[index])) {
      keyColor = arrTags[index].replace(/^JLPT::K([0-9])::([0-9])$/, ["$1", "$2"]);
      arrResult[2][keyColor[0]] = '<span style="color: #' + arrColor[keyColor[2]] + ';">' + arrTags[index] + '</span>';
      arrKanji[matches[keyColor[0] - 1]] = '<span style="line-height: 110%;color: #' + arrColor[keyColor[2]] + ';">' + arrKanji[matches[keyColor[0] - 1]] + '</span>';
    } else {
      arrResult[3] += arrTags[index] + " ";
    }
  });

  strKanji = '<span style="line-height: 110%;text-decoration: underline #' + arrColorBg[keyColorWord] + ';' + (isCommon === 1 ? 'background: #004400;' : '') + '; text-underline-offset:.2em;text-decoration-thickness:.01em;">' + arrKanji.join('') + '</span>';

  if ($('#KanjiFront').length) {
    $("#KanjiFront").children('span').eq(0).html(strKanji);
    $("#KanjiFront").children('span').eq(1).html(strKanji);
    $("#KanjiFront").children('span').eq(2).html(strKanji);
  }

  arrResult[2] = arrResult[2].join(' ');
  $(strTagsElement).html(arrResult.join(' '));

  /** IMG **/
  $("img").bind("error", function (e) {
    $(this).parent().hide();
  });

  if ($('#KanjiBack').length) {
    $('#KanjiBack').html($('#KanjiFront span').html());
  }

  if ($('.mnemo').length) {
    document.getElementsByClassName('mnemo')[0].style.display = 'block';
  }

  if ($('.back').length && $('.kanjiHover').length == 0) {
    document.getElementsByClassName('back')[0].innerHTML = document.getElementsByClassName('back')[0].innerHTML.replace(/(\p{Script=Han})/gu, '<a class="kanjiHover" href="https://quezako.com/tools/Anki/anki.php?kanji=$1">$1</a>');
  }

  if ($('#kanji_key').length) {
    var kanji_key = $('#kanji_key').text();
    var kana_key = $('#kana_key').text();
    var kanji_only = $('#kanji_only').text();

    $('#external_links').html("Sound: <a href='https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=" + kanji_key + "&kana=" + kana_key + "'><img src='favicon-7bb26f7041394a1ad90ad97f53dda21671c5dffb.ico' width=16 style='vertical-align:middle'>Pod101</a>");
    $('#external_links').append("<a href='https://forvo.com/word/" + kanji_key + "/#ja'><img src='favicon-0c20667c2ac4a591da442c639c6b7367aa54fa13.ico' width=16 style='vertical-align:middle'>Forvo</a>");
    $('#external_links').append("<a href='https://jisho.org/search/" + kanji_key + " " + kana_key + " ?_x_tr_sl=en&_x_tr_tl=fr'><img src='favicon-062c4a0240e1e6d72c38aa524742c2d558ee6234497d91dd6b75a182ea823d65.ico' width=16 style='vertical-align:middle'>Jisho</a>");
    $('#external_links').append("<a href='https://jisho.org/search/" + kana_key + " ?_x_tr_sl=en&_x_tr_tl=fr'><img src='favicon-062c4a0240e1e6d72c38aa524742c2d558ee6234497d91dd6b75a182ea823d65.ico' width=16 style='vertical-align:middle'>Jisho kana</a>");
    $('#external_links').append("<a href='https://uchisen.com/functions?search_term=" + kanji_key + "'><img src='favicon-16x16-7f3ea5f15b8cac1e6fa1f9922c0185debfb72296.png' style='vertical-align:middle'>Uchisen</a>");
    $('#external_links').append("<a href='https://www.wanikani.com/vocabulary/" + kanji_key + "'><img src='favicon-36371d263f6e14d1cc3b9f9c97d19f7e84e7aa856560c5ebec1dd2e738690714.ico' width=16 style='vertical-align:middle'>WaniKani Voc</a>");
    $('#external_links').append("<a href='http://localhost:8080/js/kanji.html?kanji=" + kanji_key + "&lang=en'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Quezako Kanji JS</a>");
    $('#external_links').append("<a href='https://quezako.com/tools/Anki/vocabulary.php?kanji=" + kanji_key + "&lang=en'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Quezako Voc</a>");
    $('#external_links').append("<a href='https://quezako.com/tools/Anki/anki.php?kanji=" + kanji_key + "&lang=en'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Quezako Kanji</a>");
    $('#external_links').append("<a href='https://www.google.com/search?q=" + kanji_key + " イラスト&tbm=isch&hl=fr&sa=X'><img src='favicon-49263695f6b0cdd72f45cf1b775e660fdc36c606.ico' width=16 style='vertical-align:middle'>Google Img</a>");

    strKanjiLinks = "<br>$1 Kanji: <a href='http://localhost:8080/js/kanji.html?kanji=$1'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Quezako JS</a>";
    strKanjiLinks += "<br>$1 Kanji: <a href='https://quezako.com/tools/Anki/anki.php?kanji=$1'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Quezako</a>";
    strKanjiLinks += "<a href='https://rtega.be/chmn/?c=$1'><img src='favicon.png' width=16 style='vertical-align:middle'>Rtega</a>";
    strKanjiLinks += "<a href='https://kanji.koohii.com/study/kanji/$1?_x_tr_sl=en&_x_tr_tl=fr'><img src='favicon-16x16.png' width=16 style='vertical-align:middle'>Koohii</a>";
    strKanjiLinks += "<a href='https://www.wanikani.com/kanji/$1'><img src='favicon-36371d263f6e14d1cc3b9f9c97d19f7e84e7aa856560c5ebec1dd2e738690714.ico' width=16 style='vertical-align:middle'>WaniKani Kanji</a>";
    strKanjiLinks += "<a href='https://www.wanikani.com/vocabulary/$1'><img src='favicon-36371d263f6e14d1cc3b9f9c97d19f7e84e7aa856560c5ebec1dd2e738690714.ico' width=16 style='vertical-align:middle'>WaniKani Voc</a>";
    strKanjiLinks += "<a href='https://en.wiktionary.org/wiki/$1'><img src='en.ico' width=16 style='vertical-align:middle'>Wiktionary</a>";
    $('#external_links').append(kanji_only.replace(/(\p{Script=Han})/gu, strKanjiLinks));
  }
});
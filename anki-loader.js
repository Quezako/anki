/**
 * TODO:
 * freeze de 10 secondes sur anki pc.
 * double chargement des details.
 * kanji_mnemo_personal: n'afficher que la ligne concernée, avec regexp.
 * ajouter mnemo read pour chaque kanji.
 * détails des radicaux.
 * ne charger qu'au click, avec loader visible.
 */
$(function () {
    // Auto fetch kanji details + radical details.
    function dbSearch() {
        if (document.querySelector("#mnemo_personal")) {
            let strSearch = $('#KanjiFront span:first').text();
            let strKanjiOnly = strSearch.replace(/[^一-龯々ヶ]/gi, "");

            Array.from(strKanjiOnly).forEach((element, index) => {
                let isLastElement = index == strKanjiOnly.length - 1;
                let strDetails = '';
                let strDetails2 = '';
                let strDetails3 = '';
                let strDetails4 = '';
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: url + 'vocabulary.php?format=json&kanji_mnemo_personal=%' + element + '%',
                    success: function (data) {

                        strDetails2 = data[0] ? `- Menmo perso: ${data[0]['kanji_mnemo_personal']}<br>` : '';

                        $.ajax({
                            type: 'GET',
                            dataType: 'json',
                            url: url + 'vocabulary.php?format=json&chmn=' + element,
                            success: function (data) {
                                strDetails3 = data[0]['chmn_mean'] ? data[0]['chmn_mean'] : `<u>${element}</u>: ${data[0]['mean']}`;
                                strDetails4 = data[0]['fr_chmn_mnemo'] ? `- Mnemo chmn:<br>${data[0]['fr_chmn_mnemo']}` : '';

                                strDetails += `<details><summary>${strDetails3}</summary>`;
                                strDetails += `${strDetails2}${strDetails4}`;
                                strDetails += `<details><summary>more info</summary>`;

                                for (let [key, val] of Object.entries(data)) {
                                    if (key != 'chmn_mean' && key != 'fr_chmn_mnemo') {
                                        strDetails += val ? `* ${key}: ${val['mean']}<br />` : "";
                                    }
                                }

                                $.ajax({
                                    type: 'GET',
                                    dataType: 'json',
                                    url: url + 'chmn.php?format=json&hanzi=' + element,
                                    success: function (data) {
                                        for (let [key, val] of Object.entries(data)) {
                                            strDetails += val ? `* chmn DB ${key}:<br /> meaning: ${val['meaning']}<br /> mnemonics: ${val['mnemonics']}<br />` : "";
                                        }

                                        strDetails += "</details></details><hr>";
                                        strDetails = strDetails.replace(/(\p{Script=Han})/gu, '<a class="kanjiHover" href="https://quezako.com/tools/anki/anki.php?kanji=$1">$1</a>');
                                        document.querySelector("#mnemo_personal").innerHTML += strDetails;
                                        strDetails = '';
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    }

    main();

    function main() {
        // JLPT
        let keyColorWord = '';
        let isCommon = 0;
        let arrResult = ['', '', [], ''];
        let arrColor = ['', 'FF0000', 'FF00FF', 'FFFF00', '00FFFF', '00FF00'];
        let arrColorBg = ['', '990000', '990099', '999900', '009999', '009900'];
        let arrKanji = [];
        let strTagsElement = '';

        if ($('#KanjiFront span').length) {
            arrKanji = $('#KanjiFront span').html().split('');
            $('#KanjiFront, #KanjiFront *').css('font-size', '3rem').css('line-height', '4rem');
        }

        if ($('.tags div').length) {
            strTagsElement = '.tags div';
        } else {
            strTagsElement = '.tags';
        }

        let arrTags = $(strTagsElement).html().split(" ");

        let re = /([\u4e00-\u9faf\u3400-\u4dbf])/g;
        let str = $('#KanjiFront span').html();
        let matches = [];
        let match = null;

        while ((match = re.exec(str)) != null) {
            matches.push(match.index);
        }

        $.each(arrTags, function (index) {
            if (arrTags[index] === 'Common') {
                arrResult[0] = '<span style="background: green;">Common</span>';
                isCommon = 1;
            } else if (/^JLPT::(\d)$/.test(arrTags[index])) {
                keyColorWord = arrTags[index].replace(/^JLPT::(\d)$/, "$1");
                arrResult[1] = '<span style="color: #' + arrColor[keyColorWord] + ';">' + arrTags[index] + '</span>';
            } else if (/^JLPT::K(\d)::(\d)$/.test(arrTags[index])) {
                let keyColor = arrTags[index].replace(/^JLPT::K(\d)::(\d)$/, ["$1", "$2"]);
                arrResult[2][keyColor[0]] = '<span style="color: #' + arrColor[keyColor[2]] + ';">' + arrTags[index] + '</span>';
                arrKanji[matches[keyColor[0] - 1]] = '<span style="line-height: 110%;color: #' + arrColor[keyColor[2]] + ';">' + arrKanji[matches[keyColor[0] - 1]] + '</span>';
            } else {
                arrResult[3] += arrTags[index] + " ";
            }
        });

        let strKanji = '<span style="line-height: 110%;text-decoration: underline #' + arrColorBg[keyColorWord] + ';' + (isCommon === 1 ? 'background: #004400;' : '') + '; text-underline-offset:.2em;text-decoration-thickness:.01em;">' + arrKanji.join('') + '</span>';

        if ($('#KanjiFront').length) {
            $("#KanjiFront").children('span').eq(0).html(strKanji);
            $("#KanjiFront").children('span').eq(1).html(strKanji);
            $("#KanjiFront").children('span').eq(2).html(strKanji);
        }

        arrResult[2] = arrResult[2].join(' ');
        $(strTagsElement).html(arrResult.join(' '));

        // IMG
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
            document.getElementsByClassName('back')[0].innerHTML = document.getElementsByClassName('back')[0].innerHTML.replace(/(\p{Script=Han})/gu, '<a class="kanjiHover" href="https://quezako.com/tools/anki/anki.php?kanji=$1">$1</a>');
        }

        if ($('#kanji_key').length) {
            let kanji_key = $('#kanji_key').text();
            let kana_key = $('#kana_key').text();
            let dict_key = $('#dict_key').text();

            $('#external_links').html("<a href='https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji=" + kanji_key + "&kana=" + kana_key + "'><img src='favicon-7bb26f7041394a1ad90ad97f53dda21671c5dffb.ico' width=16 style='vertical-align:middle'>Pod101</a>");
            $('#external_links').append("<a href='https://forvo.com/word/" + kanji_key + "/#ja'><img src='favicon-0c20667c2ac4a591da442c639c6b7367aa54fa13.ico' width=16 style='vertical-align:middle'>Forvo</a>");
            $('#external_links').append("<a href='https://jisho.org/search/" + kanji_key + " " + kana_key + " ?_x_tr_sl=en&_x_tr_tl=fr'><img src='favicon-062c4a0240e1e6d72c38aa524742c2d558ee6234497d91dd6b75a182ea823d65.ico' width=16 style='vertical-align:middle'>Jisho</a>");
            $('#external_links').append("<a href='https://jisho.org/search/" + kana_key + " ?_x_tr_sl=en&_x_tr_tl=fr'><img src='favicon-062c4a0240e1e6d72c38aa524742c2d558ee6234497d91dd6b75a182ea823d65.ico' width=16 style='vertical-align:middle'>Jisho kana</a>");
            $('#external_links').append("<a href='https://uchisen.com/functions?search_term=" + kanji_key + "'><img src='favicon-16x16-7f3ea5f15b8cac1e6fa1f9922c0185debfb72296.png' style='vertical-align:middle'>Uchisen</a>");
            $('#external_links').append("<a href='https://quezako.com/tools/anki/vocabulary.php?kanji=" + kanji_key + "&kana=" + kana_key + "&lang=en'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Q Voc</a>");
            $('#external_links').append("<a href='https://quezako.com/tools/anki/anki.php?kanji=" + kanji_key + "&lang=en'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Q Kanji</a>");
            $('#external_links').append("<a href='https://www.google.com/search?q=" + kanji_key + " " + kana_key + " イラスト&tbm=isch&hl=fr&sa=X'><img src='favicon-49263695f6b0cdd72f45cf1b775e660fdc36c606.ico' width=16 style='vertical-align:middle'>G Img</a>");

            function addOffset(match, ...args) {
                let strKanjiLinks = `<br>${args[0]} : `;
                strKanjiLinks += `<a href='https://quezako.com/tools/anki/vocabulary.php?kanji=${args[0]}&kana=${arrDict[args[1]]}&lang=en'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Q Voc</a>`;
                strKanjiLinks += `<a href='https://quezako.com/tools/anki/anki.php?kanji=${args[0]}'><img src='favicon-f435b736ab8486b03527fbce945f3b765428a315.ico' width=16 style='vertical-align:middle'>Q Kanji</a>`;
                strKanjiLinks += `<a href='https://rtega.be/chmn/?c=${args[0]}'><img src='favicon.png' width=16 style='vertical-align:middle'>Rtega</a>`;
                strKanjiLinks += `<a href='https://kanji.koohii.com/study/kanji/${args[0]}?_x_tr_sl=en&_x_tr_tl=fr'><img src='favicon-16x16.png' width=16 style='vertical-align:middle'>Koohii</a>`;

                return strKanjiLinks;
            }

            let strNoFuri = kanji_key;
            let arrDictTmp = dict_key.split(';');
            let arrDict = [];

            arrDictTmp.forEach(function (value) {
                value = value.split(':');
                value[0].split('-').forEach(function (value2) {
                    arrDict[value2] = value[1];
                });
            });

            strNoFuri = strNoFuri.replace(/(\p{Script=Han})/gu, addOffset);
            strNoFuri = strNoFuri.replace(/(>[\p{Script=Hira}\p{Script=Kana}]+)/gu, '>');
            strNoFuri = strNoFuri.replace(/([\p{Script=Hira}\p{Script=Kana}]+<)/gu, '<');
            $('#external_links').append(strNoFuri);
        }
    }

    let url = 'http://localhost/anki/';

    $.ajax({
        type: 'GET',
        url: url + 'vocabulary.php',
        timeout: 300,
        success: function () {
            dbSearch();
        },
        error: function () {
            url = 'http://localhost:45267/anki/';

            $.ajax({
                type: 'GET',
                url: url + 'vocabulary.php',
                timeout: 1000,
                success: function () {
                    dbSearch();
                },
                error: function () {
                    url = 'https://quezako.com/tools/anki/';
                    dbSearch();
                }
            });
        }
    });
});
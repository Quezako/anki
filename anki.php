<!doctype html>
<html lang="en">
<meta charset="utf-8" />
<base href='img/'>
<link rel='stylesheet' href='../anki.css'>
<script src="../jquery-3.6.3.min.js"></script>

<body>
    <?php
    $html = <<<HTML
	<span style="display:none;">
<span class='mnemo'></span>
<div id='KanjiFront'>
	<span style='font-family:yumin;'>{{kanji_only}}</span><br>
	<span style='font-family:yugothb;'>{{kanji_only}}</span><br>
	<span style='font-family:hgrkk;'>{{kanji_only}}</span><br>
</div>
{{#fr_compo_wani_name}}{{fr_compo_wani_name}}<br>{{/fr_compo_wani_name}}
<br>
</span>




<span id="external_links">
Sound: <a href="https://assets.languagepod101.com/dictionary/japanese/audiomp3.php?kanji={{kanji_only}}&kana={{kanji_only}}"><img src="favicon-7bb26f7041394a1ad90ad97f53dda21671c5dffb.ico" width=16 style="vertical-align:middle">Pod101</a>
<a href="https://forvo.com/word/{{kanji_only}}/#ja"><img src="favicon-0c20667c2ac4a591da442c639c6b7367aa54fa13.ico" width=16 style="vertical-align:middle">Forvo</a>
<a href='https://jisho-org.translate.goog/search/{{kanji_only}} {{kanji_only}} ?_x_tr_sl=en&_x_tr_tl=fr'><img src="favicon-062c4a0240e1e6d72c38aa524742c2d558ee6234497d91dd6b75a182ea823d65.ico" width=16 style="vertical-align:middle">Jisho</a>
<a href='https://www.japandict.com/{{kanji_only}}?lang=fre&_x_tr_sl=en&_x_tr_tl=fr'><img src="favicon-32x32.png" width=16 style="vertical-align:middle">JapanDict</a>
<a href="https://uchisen.com/functions?search_term={{kanji_only}}"><img src="favicon-16x16-7f3ea5f15b8cac1e6fa1f9922c0185debfb72296.png" style="vertical-align:middle">Uchisen</a>
<a href='https://quezako-com.translate.goog/tools/kanji/details/{{kanji_only}}?_x_tr_sl=en&_x_tr_tl=fr'><img src="favicon-7798b8e0eb61d7375c245af78bbf5c916932bf13.png" width=16 style="vertical-align:middle">Chmn</a>
<a href='https://quezako.com/tools/Anki/vocabulary.php?kanji={{kanji_only}}&lang=en'><img src="favicon-f435b736ab8486b03527fbce945f3b765428a315.ico" width=16 style="vertical-align:middle">Quezako Voc</a>
<a href='https://quezako.com/tools/Anki/anki.php?kanji={{kanji_only}}&lang=en'><img src="favicon-f435b736ab8486b03527fbce945f3b765428a315.ico" width=16 style="vertical-align:middle">Quezako Kanji</a>
<a href="https://www.deepl.com/translator#ja/fr/{{kanji_only}}"><img src="favicon_16.png" style="vertical-align:middle">Deepl</a>
<a href="https://www.google.com/search?q={{kanji_only}} イラスト&tbm=isch&tbs=il:cl&hl=fr&sa=X"><img src="favicon-49263695f6b0cdd72f45cf1b775e660fdc36c606.ico" width=16 style="vertical-align:middle">Google Img</a>
</span>
<br><br>
Furigana : <span id="furigana">{{key}}</span><br>
<br>
<div class='tags'">{{Tags}}</div>
{{voc_image}}<br>
<br id="answer">
<span id='KanjiBack' style='font-family:hgrkk;'></span><br>

<div class='back'>
<br>
<span style="display:none">[sound:empty.ogg]</span><a class="replay-button soundLink" style="margin-top:-14px" href="#" onclick="pycmd('play:a:0'); return false;"><svg viewBox="0 0 64 64" version="1.1"><circle cx="32" cy="32" r="29"></circle><rect x="17" y="17" width="30" height="30" stroke="#333" fill="#333" stroke-width="5"/></svg></a> <span style="color:#FF99bb;font-size:2em">{{kanji_only}}</span><br>
<div id="mean">{{#mean}}{{mean}}<br>{{/mean}}{{#chmn_mean}}{{chmn_mean}}<br>{{/chmn_mean}}</div><br>
<div style="color:#dd99ff">
{{#fr_components2}}{{fr_components2}}<br>{{/fr_components2}}
{{#fr_components3}}{{fr_components3}}<br>{{/fr_components3}}
{{compo_wani}}
{{#fr_compo_wani_name}}{{fr_compo_wani_name}}<br>{{/fr_compo_wani_name}}
{{#chmn_simple}}Simple: {{chmn_simple}}<br>{{/chmn_simple}}
</div>
<div id="mnemo_personal">{{kanji_mnemo_personal}}<br></div><br>
<br>
<div id="read_mnemo_personal">{{read_mnemo_personal}}</div><br>
<br>

<chmn>{{#en_chmn_mnemo}}{{fr_chmn_mnemo}}{{/en_chmn_mnemo}}</chmn>
<div style="color:#ffff00">
{{#fr_mean_mnemo_wani}}{{fr_mean_mnemo_wani}}<br>{{/fr_mean_mnemo_wani}}
{{#fr_mean_mnemo_wani2}}{{fr_mean_mnemo_wani2}}<br>{{/fr_mean_mnemo_wani2}}
{{#fr_story_wani_mean}}{{fr_story_wani_mean}}<br>{{/fr_story_wani_mean}}
{{#fr_mean_mnemo_wani3}}{{fr_mean_mnemo_wani3}}<br>{{/fr_mean_mnemo_wani3}}
</div>
<br>
{{#fr_story}}{{fr_story}}<br>{{/fr_story}}
{{#fr_component}}{{fr_component}}<br>{{/fr_component}}
{{#fr_koohii_story_1}}{{fr_koohii_story_1}}<br>{{/fr_koohii_story_1}}
{{#fr_koohii_story_2}}{{fr_koohii_story_2}}<br>{{/fr_koohii_story_2}}
{{#fr_koohii_3}}{{fr_koohii_3}}<br>{{/fr_koohii_3}}
{{#fr_story_rtk}}{{fr_story_rtk}}<br>{{/fr_story_rtk}}
{{#fr_memrise_hint}}{{fr_memrise_hint}}<br>{{/fr_memrise_hint}}
{{#fr_story_rtk_comment}}{{fr_story_rtk_comment}}<br>{{/fr_story_rtk_comment}}

{{#fr_notes}}{{fr_notes}}<br>{{/fr_notes}}
{{#fr_voc_notes}}{{fr_voc_notes}}<br>{{/fr_voc_notes}}

{{#en_heisigcomment}}<br />English Mnemo:<br>{{en_heisigcomment}}{{/en_heisigcomment}}
{{#kd_used_in_kanjis}}Used in: {{kd_used_in_kanjis}}<br>{{/kd_used_in_kanjis}}
{{#primitive_of}}primitive of: {{primitive_of}}<br>{{/primitive_of}}
{{#chmn_ref}}Ref: {{chmn_ref}}<br>{{/chmn_ref}}
{{#chmn_lookalike}}Lookalike:{{chmn_lookalike}}<br>{{/chmn_lookalike}}

<div style="color:green">
{{#en_reading_info}}<br>Read:<br>{{en_reading_info}}<br>{{/en_reading_info}}
{{#en_reading_mnemonic}}{{en_reading_mnemonic}}<br>{{/en_reading_mnemonic}}
{{#en_reading_mnemonic2}}{{en_reading_mnemonic2}}<br>{{/en_reading_mnemonic2}}
</div>

</div>
<br>

{{#voc_mp3}}{{voc_mp3}}{{/voc_mp3}}
{{#voc_sentence_audio}} Sentence: {{voc_sentence_audio}}{{/voc_sentence_audio}}
<br>
{{voc_image}}<br>

{{#voc_sentence_ja}}<span id="furigana">{{voc_sentence_ja}}</span><br>{{/voc_sentence_ja}}
{{#voc_sentence_fr}}{{voc_sentence_fr}}<br>{{/voc_sentence_fr}}
{{#voc_sentence_img}}{{voc_sentence_img}}{{/voc_sentence_img}}

<script type='text/javascript'>
		var kanji_only = "{{kanji_only}}";
</script>
HTML;



    try {
        $pdo = new PDO('sqlite:' . dirname(__FILE__) . '/../assets/db/vocab.db');
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    } catch (Exception $e) {
        echo "Can't access SQLite DB: " . $e->getMessage();
        die();
    }

    if (!isset($_GET['kanji'])) {
        die();
    }

    $kanji = $_GET['kanji'];
    $stm = $pdo->query("SELECT * FROM Quezako WHERE kanji_only = '$kanji' AND (key LIKE '{$kanji}[%' OR key = '$kanji')");
    $res = $stm->fetch(PDO::FETCH_NUM);
    preg_match_all('/./u', $kanji, $matches);
    $kanji = htmlspecialchars(($_GET['kanji']));

    echo "<title>$kanji - Anki</title>";

    if (!isset($res[0])) {

        if (preg_match_all("/{{(.*?)}}/", $html, $m)) {
            foreach ($m[1] as $i => $varname) {
                $html = str_replace($m[0][$i], sprintf('%s', $_GET['kanji']), $html);
            }
        }

        echo $html;
        die;
    }

    for ($i = 0; $i < $stm->columnCount(); $i++) {
        $column = $stm->getColumnMeta($i);
        $col[$column['name']] = $i;
    }

    if (preg_match_all("/(\[sound:.*\])/", $html, $m)) {
        foreach ($m[1] as $i => $varname) {
            $html = str_replace($m[0][$i], "", $html);
        }
    }

    if (preg_match_all("/{{[\/|#](.*?)}}/", $html, $m)) {
        foreach ($m[1] as $i => $varname) {
            $html = str_replace($m[0][$i], "", $html);
        }
    }

    if (preg_match_all("/{{(.*?)}}/", $html, $m)) {
        foreach ($m[1] as $i => $varname) {
            $html = str_replace($m[0][$i], sprintf('%s', $res[$col[$varname]]), $html);
        }
    }

    echo $html;
    ?>




    <script type='text/javascript' src="../quezako.js"></script>
    <script src="../sql-wasm.js"></script>
    <script src="../dict2.js"></script>
    <script type='text/javascript'>
        $('#KanjiBack').html($('#KanjiFront span').html());
        document.getElementsByClassName('mnemo')[0].style.display = 'block';
        document.getElementsByClassName('back')[0].innerHTML = document.getElementsByClassName('back')[0].innerHTML.replace(/(\p{Script=Han})/gu, '<a class="kanjiHover" href="https://quezako.com/tools/Anki/anki.php?kanji=$1">$1</a>');

        $('#external_links').append(kanji_only.replace(/(\p{Script=Han})/gu, '<br>$1  <a href="https://quezako.com/tools/Anki/anki.php?kanji=$1"><img src="favicon-f435b736ab8486b03527fbce945f3b765428a315.ico" width=16 style="vertical-align:middle">Quezako</a> <a href="https://quezako.com/tools/kanji/details/$1"><img src="favicon-7798b8e0eb61d7375c245af78bbf5c916932bf13.png" width=16 style="vertical-align:middle">ChMn</a> <a href="https://rtega.be/chmn/?c=$1"><img src="favicon.png" width=16 style="vertical-align:middle">Rtega</a> <a href="https://kanji.koohii.com/study/kanji/$1?_x_tr_sl=en&_x_tr_tl=fr"><img src="favicon-16x16.png" width=16 style="vertical-align:middle">Koohii</a> <a href="https://www.wanikani.com/kanji/$1"><img src="favicon-36371d263f6e14d1cc3b9f9c97d19f7e84e7aa856560c5ebec1dd2e738690714.ico" width=16 style="vertical-align:middle">WaniKani Kanji</a> <a href="https://www.wanikani.com/vocabulary/$1"><img src="favicon-36371d263f6e14d1cc3b9f9c97d19f7e84e7aa856560c5ebec1dd2e738690714.ico" width=16 style="vertical-align:middle">WaniKani Voc</a> <a href="https://en.wiktionary.org/wiki/$1"><img src="en.ico" width=16 style="vertical-align:middle">Wiktionary</a>'));
    </script>

    <style>
        body {
            background: #333333 !important;
            color: #ffffff;
        }

        #flyout {
            position: absolute;
            width: 100%;
            min-height: 300px;
            background: black;
            /* overflow: hidden; */
            display: none;
            z-index: 10000;
        }

        .kanjiHover {
            font-size: 30px;
            color: #aaaaff;
            font-family: hgrkk;
        }

        a {
            color: #00ddff;
        }

        .replay-button {
            display: none;
        }
    </style>

</html>
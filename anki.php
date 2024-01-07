<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
$html = <<<HTML
<span id="external_links">
  <span id="kanji_key" style="display:none">{{kanji:key}}</span>
  <span id="kana_key" style="display:none">{{kana:key}}</span>
  <span id="kanji_only" style="display:none">{{kanji_only}}{{^kanji_only}}{{kanji:key}}{{/kanji_only}}</span>
  <span id="dict_key" style="display:none">{{dict_key}}</span>
</span>

<br>

<a class="replay-button soundLink" href="#" onclick="pycmd('play:a:0'); return false;"><svg viewBox="0 0 64 64" version="1.1"><circle cx="32" cy="32" r="29"></circle><rect x="17" y="17" width="30" height="30" stroke="#333" fill="#333" stroke-width="5"/></svg></a>
<span style="margin-left:-50px;z-index:10000;opacity:0;display:">[sound:empty.ogg]</span>{{#voc_mp3}}{{edit:voc_mp3}}<br>{{/voc_mp3}}

<details>
<summary>kana hint</summary>
<span style='font-size: 2em;'>{{kana:kun_pre}}<span class="furi" style='font-size: 1em;'>{{kana:voc_furi}}{{^voc_furi}}{{kana:key}}{{/voc_furi}}</span>{{kana:kun_post}}</span><br>

</details>

<details>
<summary>kanji hint</summary>
<div style=' font-size: 3em;'>
<span id="KanjiFront" style='font-size: 2em;line-height: 2em;font-family:hgrkk;'>{{kanji:kun_pre}}<span>{{kanji:voc_furi}}{{^voc_furi}}{{kanji:key}}{{/voc_furi}}</span>{{kanji:kun_post}}</span>
</div>
</details>

{{#voc_sentence_ja}}<span id="furigana">{{edit:hint:furigana:voc_sentence_ja}}</span><br>{{/voc_sentence_ja}}

{{#voc_notes_personal}}
<br>
<details>
<summary>voc notes</summary><span style="color:pink">{{edit:furigana:voc_notes_personal}}</span>
</details>
{{/voc_notes_personal}}

<br>
<div class='tags'>{{edit:Tags}}</div>

<span id="source"></span>

<style>
#back {
  display: block;
}
</style>

<hr id=answer>
{{edit:voc_image}}
{{^voc_image}}{{edit:voc_sentence_img}}{{/voc_image}}

<div id="back">
<hr>
<span style='font-size: 2em;'>{{kana:kun_pre}}<span class="furi" style='font-size: 1em;'>{{kana:voc_furi}}{{^voc_furi}}{{kana:key}}{{/voc_furi}}</span>{{kana:kun_post}}</span><br>
<span id="KanjiBack" style='font-size: 2em;line-height: 2em;font-family:hgrkk;'></span>

<div id="back" class='back'>
<span class="furigana">{{edit:furigana:voc_alts}}<br></span>
<div id="mean">{{edit:mean}}</div><br>
{{edit:fr_components2}}<br>
<span id="read_mnemo_personal">{{edit:furigana:read_mnemo_personal}}</span><br>
<span id="mnemo_personal" class="furigana">{{edit:furigana:kanji_mnemo_personal}}</span>
<div style="color:#dd99ff">
{{edit:compo_wani}}
{{#fr_compo_wani_name}}{{edit:fr_compo_wani_name}}<br>{{/fr_compo_wani_name}}
</div>
<hr>
{{edit:hint:en_reading_mnemonic}}<br>
</div>
{{edit:voc_sentence_audio}}<br>
{{#voc_sentence_ja}}<span id="furigana">{{edit:furigana:voc_sentence_ja}}</span><br>{{/voc_sentence_ja}}
{{edit:voc_sentence_fr}}<br>
{{#voc_image}}{{edit:voc_sentence_img}}{{/voc_image}}
<br>
</div>

<script type='text/javascript'>
    var kanji_only = "{{kanji_only}}";
</script>
HTML;


$html = str_replace('edit:', '', $html);
$html = str_replace('kana:', '', $html);
$html = str_replace('kanji:', '', $html);
$html = str_replace('furigana:', '', $html);
$html = str_replace('hint:', '', $html);
$html = preg_replace('/\{\{\^[a-z_]+\}\}/', '', $html);

try {
    $pdo = new PDO('sqlite:' . dirname(__FILE__) . '/../assets/db/vocab.sqlite');
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

if (!isset($col['Tags'])) {
    $col['Tags'] = $col['tags'];
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
?>

<!doctype html>
<html lang="en">

<head>
    <title>
        <?= $kanji; ?> - Anki
    </title>
    <meta charset="utf-8" />
    <link rel='stylesheet' href='anki.css'>
    <script src="../assets/js/jquery-3.6.3.min.js"></script>
</head>

<body>
    <script type='text/javascript' src="anki-loader.js"></script>
    <script type='text/javascript'>
        $('#KanjiBack').html($('#KanjiFront span').html());
        document.getElementsByClassName('mnemo')[0].style.display = 'block';
        document.getElementsByClassName('back')[0].innerHTML = document.getElementsByClassName('back')[0].innerHTML.replace(/(\p{Script=Han})/gu, '<a class="kanjiHover" href="https://quezako.com/tools/anki/anki.php?kanji=$1">$1</a>');

        $('#external_links').append(kanji_only.replace(/(\p{Script=Han})/gu, '<br>$1  <a href="https://quezako.com/tools/anki/anki.php?kanji=$1"><img src="favicon-f435b736ab8486b03527fbce945f3b765428a315.ico" width=16 style="vertical-align:middle">Quezako</a> <a href="https://quezako.com/tools/kanji/details/$1"><img src="favicon-7798b8e0eb61d7375c245af78bbf5c916932bf13.png" width=16 style="vertical-align:middle">ChMn</a> <a href="https://rtega.be/chmn/?c=$1"><img src="favicon.png" width=16 style="vertical-align:middle">Rtega</a> <a href="https://kanji.koohii.com/study/kanji/$1?_x_tr_sl=en&_x_tr_tl=fr"><img src="favicon-16x16.png" width=16 style="vertical-align:middle">Koohii</a> <a href="https://www.wanikani.com/kanji/$1"><img src="favicon-36371d263f6e14d1cc3b9f9c97d19f7e84e7aa856560c5ebec1dd2e738690714.ico" width=16 style="vertical-align:middle">WaniKani Kanji</a> <a href="https://www.wanikani.com/vocabulary/$1"><img src="favicon-36371d263f6e14d1cc3b9f9c97d19f7e84e7aa856560c5ebec1dd2e738690714.ico" width=16 style="vertical-align:middle">WaniKani Voc</a> <a href="https://en.wiktionary.org/wiki/$1"><img src="en.ico" width=16 style="vertical-align:middle">Wiktionary</a>'));
    </script>

    <style>
        body {
            background: #333333 !important;
            color: #ffffff;
            text-align: center;
        }

        #flyout {
            position: absolute;
            width: 100%;
            min-height: 300px;
            background: black;
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

    <?= $html; ?>


</html>
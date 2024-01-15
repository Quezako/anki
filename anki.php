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
<div id="mean">{{edit:mean}}</div><br>
<span id="read_mnemo_personal" class="furigana"><span style="text-decoration: underline;">Read mnemonics:</span><br>{{edit:furigana:read_mnemo_personal}}</span><br>

<span id="KanjiBack" style='font-size: 2em;line-height: 2em;font-family:hgrkk;'></span>

<div id="back" class='back'>
<span class="furigana">{{edit:furigana:voc_alts}}<br></span>
{{edit:fr_components2}}<br>
<span id="kanji_mnemo_personal" class="furigana"><span style="text-decoration: underline;">Kanji mnemonics:</span><br>{{edit:furigana:kanji_mnemo_personal}}</span>
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
    $pdo = new PDO("mysql:host=quezako.mysql.db;dbname=quezako;charset=utf8mb4", 'quezako', 'TWPnsHsA2CStP2Xt3aUCw8YKngpiPW');
    $pdo->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, 'SET NAMES utf8');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
} catch (Exception $e) {
    $pdo = new PDO('sqlite:' . dirname(__FILE__) . '/../assets/db/vocab.sqlite');
}

if (isset($_GET['kanji'])) {
    $kanji = $_GET['kanji'];
    $stm = $pdo->query("SELECT * FROM quezako WHERE kanji_only = '$kanji' AND (`key` LIKE '{$kanji}[%' OR `key` = '$kanji')");
} else {
    $key = $_GET['key'];
    $kanji = $key;
    $stm = $pdo->query("SELECT * FROM quezako WHERE `key` LIKE '%$key%'");
}


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
        $(function () {
            $('#KanjiBack').html($('#KanjiFront span').html());
            setTimeout(
                function () {
                    $('body').show();
                    $('#back').show();
                }, 500);
        });
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
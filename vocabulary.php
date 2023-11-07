<?php
function varDump($val)
{
    echo '<pre>';
    var_dump($val);
    echo '</pre>';
}

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

if (!isset($_GET['kana'])) {
    $_GET['kana'] = $_GET['kanji'];
}

$kanji = $_GET['kanji'];
$kana = $_GET['kana'];
$query = "SELECT * FROM Quezako LIMIT 1";
$stm = $pdo->query($query);

for ($i = 0; $i < $stm->columnCount(); $i++) {
    $column = $stm->getColumnMeta($i);
    $col[$column['name']] = $i;
}

$query = "
SELECT * FROM (SELECT * FROM Quezako where key LIKE '%$kanji%' AND key LIKE '%$kana%' AND Tags LIKE '%JLPT::5%' ORDER BY `Order`) UNION ALL
SELECT * FROM (SELECT * FROM Quezako where key LIKE '%$kanji%' AND key LIKE '%$kana%' AND Tags LIKE '%JLPT::4%' ORDER BY `Order`) UNION ALL
SELECT * FROM (SELECT * FROM Quezako where key LIKE '%$kanji%' AND key LIKE '%$kana%' AND Tags LIKE '%JLPT::3%' ORDER BY `Order`) UNION ALL
SELECT * FROM (SELECT * FROM Quezako where key LIKE '%$kanji%' AND key LIKE '%$kana%' AND Tags LIKE '%JLPT::2%' ORDER BY `Order`) UNION ALL
SELECT * FROM (SELECT * FROM Quezako where key LIKE '%$kanji%' AND key LIKE '%$kana%' AND Tags LIKE '%JLPT::1%' ORDER BY `Order`) UNION ALL
SELECT * FROM (SELECT * FROM Quezako where key LIKE '%$kanji%' AND key LIKE '%$kana%' AND Tags LIKE '%JLPT::0%' AND Tags LIKE '%Common%' ORDER BY `Order`) UNION ALL
SELECT * FROM (SELECT * FROM Quezako where key LIKE '%$kanji%' AND key LIKE '%$kana%' AND Tags LIKE '%JLPT::0%' AND Tags NOT LIKE '%Common%' ORDER BY `Order`) UNION ALL
SELECT * FROM (SELECT * FROM Quezako where key LIKE '%$kanji%' AND key LIKE '%$kana%'
AND Tags NOT LIKE '%JLPT::0%' AND Tags NOT LIKE '%JLPT::1%' AND Tags NOT LIKE '%JLPT::2%' AND Tags NOT LIKE '%JLPT::3%'
AND Tags NOT LIKE '%JLPT::4%' AND Tags NOT LIKE '%JLPT::5%' AND Tags NOT LIKE '%Common%' ORDER BY `Order`)
";

$stm = $pdo->query($query);
$res = $stm->fetchAll(PDO::FETCH_NUM);
$intJLPT = 0;
$intJLPTKFull = 0;
$intJouYouFull = 0;
$strHTML = '';


foreach ($res as $row) {
    $arrKanji = [];
    $arrFuri = [];
    $arrIsKanji = [];
    $strKanjiColored = '';

    $strJLPT = '';
    $strJLPTK = '';
    $intJLPTK = 0;
    $strJouYou = '';
    $intJouYou = 0;
    $strCommon = '';
    $strMnN = '';
    $strMisc = '';
    $strVocFuri = '';

    if ($row[$col['voc_furi']] === null) {
        $strVocFuri = $row[$col['key']];
    } else {
        $strVocFuri = $row[$col['voc_furi']];
    }


    preg_match_all('/([\p{Han}\p{Katakana}\p{Hiragana}]+)(?: [[]([\p{Hiragana}]+)[]] )?/ux', $strVocFuri, $matchChar, PREG_SET_ORDER);

    foreach ($matchChar as $char) {
        if (isset($char[2])) {
            foreach (mb_str_split($char[1]) as $subchar) {
                $arrKanji[] = $subchar;
                $arrIsKanji[] = 1;
            }

            $arrFuri[] = $char[2];
        } else {
            $arrKanji[] = $char[1];
            $arrFuri[] = $char[1];
            $arrIsKanji[] = 0;
        }
    }

    $arrTags = explode(' ', $row[$col['Tags']]);

    foreach ($arrTags as $tag) {
        if (preg_match('/JLPT::(\d)/', $tag, $matchJLPT, PREG_OFFSET_CAPTURE)) {
            $tmpJLPT = $matchJLPT[1][0];
            $strJLPT .= "<n$tmpJLPT>{$matchJLPT[0][0]}</n$tmpJLPT>";
            $intJLPT += $tmpJLPT;
        } elseif (preg_match('/JLPT::K.::(.)/', $tag, $matchJLPTK, PREG_OFFSET_CAPTURE)) {
            $tmpJLPTK = $matchJLPTK[1][0];
            $strJLPTK .= " / <n$tmpJLPTK>{$matchJLPTK[0][0]}</n$tmpJLPTK>";
            $intJLPTK += $tmpJLPTK;
        } elseif (preg_match('/JouYou::K.::(.)/', $tag, $matchJouYou, PREG_OFFSET_CAPTURE)) {
            $tmpJouYou = round((10 - $matchJouYou[1][0]) / 2);
            $strJouYou .= " / <n$tmpJouYou>{$matchJouYou[0][0]}</n$tmpJouYou>";
            $intJouYou += $matchJouYou[1][0];
        } elseif ($tag === 'MnN::2-2::99') {
            $strMnN .= " / <n0>{$tag}</n0>";
        } elseif (preg_match('/MnN::(\d-\d)(::(\d+))?/', $tag, $matchMnN, PREG_OFFSET_CAPTURE)) {
            $arrMnN = [
                '1-1' => 5,
                '1-2' => 4,
                '2-1' => 3,
                '2-2' => 2
            ];
            $tmpMnN = $arrMnN[$matchMnN[1][0]];

            $strMnN .= " / <n$tmpMnN>{$matchMnN[0][0]}</n$tmpMnN>";
        } elseif ($tag === 'Common') {
            $strCommon = " / <n0><u>$tag</u></n0> /";
        } else {
            $strMisc .= " <n0>$tag</n0>";
        }
    }

    preg_match_all('/JLPT::K(.)::(.)/ux', $row[$col['Tags']], $matchJLPTK2, PREG_OFFSET_CAPTURE);
    $iKanji = 0;

    foreach ($arrKanji as $keyKanji => $valKanji) {
        if ($arrIsKanji[$keyKanji] === 1) {
            $iKanji++;
            $tmpJLPTK = 0;

            foreach ($matchJLPTK2[1] as $keyJLPTK2 => $valJLPTK2) {
                if ($valJLPTK2[0] == $iKanji) {
                    $tmpJLPTK = $matchJLPTK2[2][$keyJLPTK2][0];
                } elseif ($tmpJLPTK === -1) {
                    $tmpJLPTK = 0;
                }
            }

            $strKanjiColored .= "<a href='../anki.php?kanji=$valKanji'><nk$tmpJLPTK>$valKanji</nk$tmpJLPTK></a>";
        } else {
            $strKanjiColored .= "<kana>$valKanji</kana>";
        }
    }

    if ($iKanji === 0) {
        $iKanji = 1;
    }

    if ($strJLPTK === '') {
        $strJLPTK = ' / <n0>JLPT::K1::0</n0>';
    }

    $intJLPTKFull += ($intJLPTK / $iKanji);
    $intJouYouFull += ($intJouYou / $iKanji);

    $strHTML .= "<span class='furigana2'>{$row[$col['kun_pre']]}</span>{$strKanjiColored}<span class='furigana2'>{$row[$col['kun_post']]}</span>";
    $strHTML .= "<br/><span>$strJLPT$strJLPTK$strJouYou$strMnN$strCommon$strMisc</span><br/><br/>";

    $strHTML .= "<span class='hover'>Furi<span class='furigana'>: ";
    if ($row[$col['kun_pre']] != '') {
        $strHTML .= "<span class='furigana2'>{$row[$col['kun_pre']]}</span>";
    }

    $strHTML .= implode('', $arrFuri);
    if ($row[$col['kun_post']] != '') {
        $strHTML .= "<span class='furigana2'>{$row[$col['kun_post']]}</span>";
    }

    if ($row[$col['voc_alts']] != '') {
        $strHTML .= " / Alts: {$row[$col['voc_alts']]}<br/>";
    }

    $strHTML .= "</span></span>";

    $strHTML .= "<span class='hover'>FR<span class='french'>: {$row[$col['mean']]}</span></span>";
    if ($row[$col['fr_notes']] != '') {
        $strHTML .= "<span class='hover'>Notes<span class='french'>: {$row[$col['fr_notes']]}</span></span><br/>";
    }

    $strHTML .= "<hr/>";
}

if (count($res) === 0) {
    $strHTML = "No Jukugo found with this kanji.<br>$strHTML";
    $count = 0;
    $intJLPT = 0;
    $intJLPTKFull = 0;
    $intJouYouFull = 0;
    $intJLPTPercent = 0;
    $intJLPTKPercent = 0;
    $intJouYouPercent = 0;
} else {
    $count = count($res);
    $intJLPT = round($intJLPT / $count, 2);
    $intJLPTKFull = round($intJLPTKFull / $count, 2);
    $intJouYouFull = round($intJouYouFull / $count, 2);
    $intJLPTPercent = 100 / 5 * $intJLPT;
    $intJLPTKPercent = 100 / 5 * $intJLPTKFull;
    $intJouYouPercent = 100 / 9 * $intJouYouFull;
}
$int100Count = (100 - ($count));
$int100JLPT = (100 - $intJLPTPercent);
$int100JLPTK = (100 - $intJLPTKPercent);
$int100JouYou = (100 - $intJouYouPercent);

$strHTML = "
<br />
<form class='example' action='../vocabulary.php'>
  <input type='text' placeholder='Search..' name='kanji' value='$kanji'>
  <input type='text' placeholder='Search..' name='kana' value='$kana'>
  <button type='submit'>Search</button>
</form>
Number of entries:<span style='color:rgb($int100Count%,$count%, 0%);'>$count</span> /
Avg. JLPT:<span style='color:rgb($int100JLPT%,$intJLPTPercent%, 0%);'>$intJLPT</span>  /
Avg. JLPTK:<span style='color:rgb($int100JLPTK%,$intJLPTKPercent%, 0%);'>$intJLPTKFull</span>  /
Avg. JouYou:<span style='color:rgb($intJouYouPercent%,$int100JouYou%, 0%);'>$intJouYouFull</span> <hr/>$strHTML";
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Vocabulary</title>
    <base href='img/'>
    <link rel='stylesheet' href='../anki.css'>
    <script src="../jquery-3.6.0.slim.min.js"></script>
</head>

<body>
    <div>
        <?= $strHTML; ?>
    </div>
</body>
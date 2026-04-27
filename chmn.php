<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
try {
    $pdo = new PDO('sqlite:' . dirname(__FILE__) . '/../assets/db/chmn-full.sqlite');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
} catch (Exception $e) {
    echo "Can't access SQLite DB: " . $e->getMessage();
    die();
}

$element = trim((string)($_GET['hanzi'] ?? ''));

if ($element === '') {
    if (isset($_GET['format']) && $_GET['format'] === 'json') {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([], JSON_UNESCAPED_UNICODE);
    } else {
        echo "Paramètre manquant: hanzi";
    }
    die();
}

$sql = "SELECT hanzi, hanzi2, alike, meaning, mnemonics
        FROM 'chmn-full'
        WHERE hanzi = :element OR hanzi2 = :element OR alike = :element";
$stm = $pdo->prepare($sql);
$stm->bindValue(':element', $element, PDO::PARAM_STR);
$stm->execute();
$res = $stm->fetchAll();

if (isset($_GET['format']) && $_GET['format'] == 'json') {
    header('Content-Type: application/json; charset=utf-8');

    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 0;

    if ($limit > 0) {
        $res = array_slice($res, $offset, $limit);
    }

    $strReturn = json_encode($res, JSON_UNESCAPED_UNICODE);
    echo $strReturn;
} else {
    ?>
    hanzi alike meaning mnemonics<br>
    <base target="_blank" href="../assets/img/">
    <?php

    if (count($res) === 0) {
        echo "Aucun résultat pour: " . htmlspecialchars($element, ENT_QUOTES, 'UTF-8');
        die();
    }

    $old = $res[0]['hanzi'] ?? '';
    $hanzi = [];
    $alike = [];
    $meaning = [];
    $mnemonics = [];

    foreach ($res as $row) {
        $rowHanzi = $row['hanzi'] ?? '';
        $rowHanzi2 = $row['hanzi2'] ?? '';
        $rowAlike = $row['alike'] ?? '';
        $rowMeaning = $row['meaning'] ?? '';
        $rowMnemonics = $row['mnemonics'] ?? '';

        if ($old !== $rowHanzi && count($hanzi) > 0) {
            echo $hanzi[0] . "\t" . implode('<br/>', $alike) . "\t" . implode('<br/>', $meaning) . "\t" . implode('<br/>', $mnemonics) . "\n";
            $hanzi = [];
            $alike = [];
            $meaning = [];
            $mnemonics = [];
        }

        $hanzi[] = $rowHanzi;
        $alike[] = $rowAlike;
        $meaning[] = "<u>{$rowHanzi2}</u>: {$rowMeaning}";
        $mnemonics[] = "<u>{$rowHanzi2}</u>: {$rowMnemonics}";

        $old = $rowHanzi;
    }

    if (count($hanzi) > 0) {
        echo $hanzi[0] . "\t" . implode('<br/>', $alike) . "\t" . implode('<br/>', $meaning) . "\t" . implode('<br/>', $mnemonics) . "\n";
    }
}
?>
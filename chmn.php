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

$element = $_GET['hanzi'];
$sql = "SELECT meaning, mnemonics FROM 'chmn-full' WHERE hanzi = \"$element\" OR hanzi2 = \"$element\" OR alike = \"$element\"";
$stm = $pdo->query($sql );
$res = $stm->fetchAll();

if (isset($_GET['format']) && $_GET['format'] == 'json') {
    header('Content-Type: application/json; charset=utf-8');

    if (isset($_GET['offset'])) {
        $offset = $_GET['offset'];
    }

    if (isset($_GET['limit'])) {
        $limit = $_GET['limit'];
        $res = array_slice($res, $offset, $limit);
    }

    $strReturn = json_encode($res);
    echo $strReturn;
} else {
    for ($i = 0; $i < $stm->columnCount(); $i++) {
        $column = $stm->getColumnMeta($i);
        $col[$column['name']] = $i;
    }
    ?>
    hanzi alike meaning mnemonics<br>
    <base target="_blank" href="../assets/img/">
    <?php
    $old = $res[0][$col['hanzi']];
    $hanzi = [];
    $alike = [];
    $meaning = [];
    $mnemonics = [];

    foreach ($res as $row) {
        if ($old !== $row[$col['hanzi']]) {
            echo $hanzi[0] . "\t" . implode('<br/>', $alike) . "\t" . implode('<br/>', $meaning) . "\t" . implode('<br/>', $mnemonics) . "\n";
            $hanzi = [];
            $alike = [];
            $meaning = [];
            $mnemonics = [];
        }

        $hanzi[] = "{$row[$col['hanzi']]}";
        $alike[] = "{$row[$col['alike']]}";
        $meaning[] = "<u>{$row[$col['hanzi2']]}</u>: {$row[$col['meaning']]}";
        $mnemonics[] = "<u>{$row[$col['hanzi2']]}</u>: {$row[$col['mnemonics']]}";

        $old = $row[$col['hanzi']];
    }

    echo $hanzi[0] . "\t" . implode('<br/>', $alike) . "\t" . implode('<br/>', $meaning) . "\t" . implode('<br/>', $mnemonics) . "\n";
}
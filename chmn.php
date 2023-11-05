<?php
try {
    $pdo = new PDO('sqlite:' . dirname(__FILE__) . '/../assets/db/chmn-full.sqlite');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
} catch (Exception $e) {
    echo "Can't access SQLite DB: " . $e->getMessage();
    die();
}

$stm = $pdo->query("SELECT * FROM 'chmn-full' LIMIT 5");
$res = $stm->fetchAll(PDO::FETCH_NUM);

for ($i = 0; $i < $stm->columnCount(); $i++) {
    $column = $stm->getColumnMeta($i);
    $col[$column['name']] = $i;
}
?>
hanzi alike meaning mnemonics
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

<?php
try {
    $pdo = new PDO('sqlite:' . dirname(__FILE__) . '/chmn-full2.db');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
} catch (Exception $e) {
    echo "Can't access SQLite DB: " . $e->getMessage();
    die();
}

// $stm = $pdo->query("SELECT * FROM 'chmn-full2' where hanzi='⺌' or hanzi='労'");
$stm = $pdo->query("SELECT * FROM 'chmn-full2'");
$res = $stm->fetchAll(PDO::FETCH_NUM);
// preg_match_all('/./u', $kanji, $matches);

for ($i = 0; $i < $stm->columnCount(); $i++) {
    $column = $stm->getColumnMeta($i);
    $col[$column['name']] = $i;
}

// echo '<pre>';
// var_dump($col);
// var_dump($res);

// <table>
// <tr><th>hanzi</th><th>alike</th><th>meaning</th><th>mnemonics</th></tr>
?>
hanzi	alike	meaning	mnemonics
<?php
$old = $res[0][$col['hanzi']];
$hanzi = [];
$alike = [];
$meaning = [];
$mnemonics = [];

foreach ($res as $row) {
    if ($old === $row[$col['hanzi']]) {
    } else {
        // echo "<tr><td>".implode('<br/>',$hanzi)."</td><td>".implode('<br/>',$alike)."</td><td>".implode('<br/>',$meaning)."</td><td>".implode('<br/>',$mnemonics)."</td></tr>";
        echo $hanzi[0]."\t".implode('<br/>',$alike)."\t".implode('<br/>',$meaning)."\t".implode('<br/>',$mnemonics)."\n";
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

echo $hanzi[0]."\t".implode('<br/>',$alike)."\t".implode('<br/>',$meaning)."\t".implode('<br/>',$mnemonics)."\n";
// </table>
?>


<?php
$data = include('extract.php');

// Initialisiere eine leere Liste, um die transformierten Daten zu speichern
$transformedData = [];

// Füge die aktuellen Daten hinzu (Ort, Temperatur, Fluss, etc.)
$currentData = [
    'Location' => $data['aare']['location'],
    'weatherTemperature' => $data['weather']['current']['tt'],
    'Temperature' => $data['aare']['temperature'],
    'Flow' => $data['aare']['flow'],
];

// Speichere diese Daten in der transformierten Liste
$transformedData[] = $currentData;

// Bereite eine Tabelle vor, um die Daten anzuzeigen
//echo "<table border='1'>";
//echo "<tr><th>Location</th><th>weatherTemperature</th><th>Temperature</th><th>Flow</th><th>Timestamp</th></tr>";

// Füge die transformierten Daten in die Tabelle ein
/*foreach ($transformedData as $row) {
    echo "<tr>";
    foreach ($row as $cell) {
        echo "<td>{$cell}</td>";
    }
    echo "</tr>";
}*/

//echo "</table>";

print_r($transformedData);

return $transformedData
?>

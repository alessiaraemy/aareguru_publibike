<?php
$data = include('extract.php');

// Initialisiere eine leere Liste, um die transformierten Daten zu speichern
$transformedData = [];

// Füge die aktuellen Daten hinzu (Ort, Temperatur, Fluss, etc.)
$currentData = [
    'Location' => $data['aare']['location'],
    'Coordinates' => 'Lat: ' . $data['aare']['coordinates']['lat'] . ', Lon: ' . $data['aare']['coordinates']['lon'],
    'Temperature' => $data['aare']['temperature'] . ' °C',
    'Flow' => $data['aare']['flow'] . ' m³/s',
    'Height' => $data['aare']['height'] . ' m'
];

// Speichere diese Daten in der transformierten Liste
$transformedData[] = $currentData;

// Bereite eine Tabelle vor, um die Daten anzuzeigen
echo "<table border='1'>";
echo "<tr><th>Location</th><th>Coordinates</th><th>Temperature</th><th>Temperature Text</th><th>Flow</th><th>Flow Text</th><th>Height</th></tr>";

// Füge die transformierten Daten in die Tabelle ein
foreach ($transformedData as $row) {
    echo "<tr>";
    foreach ($row as $cell) {
        echo "<td>{$cell}</td>";
    }
    echo "</tr>";
}

echo "</table>";
?>

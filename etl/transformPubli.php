<?php
// Daten von der API abrufen
$data = include('extractPubli.php');

// Initialisiere eine leere Liste, um die transformierten Daten zu speichern
$transformedData = [];

// Prüfen, ob Stationen-Daten vorhanden sind
if (isset($data['stations']) && is_array($data['stations'])) {
    // Durchlaufe jede Station und sammle die relevanten Informationen
    foreach ($data['stations'] as $station) {
        $currentData = [
            'Location' => $station['name'] . ', ' . $station['city'],  // Kombiniere Name und Stadt der Station
            'Latitude' => $station['latitude'],  // Latitude der Station
            'Longitude' => $station['longitude'], // Longitude der Station
            'Capacity' => $station['capacity'],   // Kapazität der Station
            'Vehicles' => count($station['vehicles']) // Anzahl verfügbarer Fahrzeuge
        ];

        // Speichere diese Daten in der transformierten Liste
        $transformedData[] = $currentData;
    }
}

// Bereite eine Tabelle vor, um die Daten anzuzeigen
echo "<table border='1'>";
echo "<tr><th>Location</th><th>Latitude</th><th>Longitude</th><th>Capacity</th><th>Vehicles</th></tr>";

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


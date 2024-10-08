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
            'Name' => $station['name'] ,  // Name der Station
            'Adresse' => $station['adress'], // Name der Station
            'Postleitzahl' => $station['zip'], // Postleitzahl der Station
            'Stadt' => $station['city'], // Stadt der Station
            'Status' => $station['state']['name'], // Status der Station
            'Vehicles' => count($station['vehicles']) // Anzahl verfügbarer Fahrzeuge
        ];

        // Speichere diese Daten in der transformierten Liste
        $transformedData[] = $currentData;
    }
}

// Bereite eine Tabelle vor, um die Daten anzuzeigen
echo "<table border='1'>";
echo "<tr><th>Name</th><th>Adresse</th><th>Postleitzahl</th><th>Stadt</th><th>Status</th><th>Vehicles</th></tr>";

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


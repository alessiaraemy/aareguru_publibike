<?php
// Daten von der API abrufen
$data = include('extractPubli.php');

// Liste der IDs, die wir anzeigen wollen
$selectedIDs = [423, 323, 312, 321, 478, 315, 316, 326, 254, 898, 251, 663, 195, 114, 119]; // Ersetzt diese IDs durch die IDs, die ihr anzeigen wollt


// Initialisiere eine leere Liste, um die transformierten Daten zu speichern
$transformedData = [];

// Prüfen, ob Stationen-Daten vorhanden sind
if (isset($data['stations']) && is_array($data['stations'])) {
    // Durchlaufe jede Station und sammle die relevanten Informationen
    foreach ($data['stations'] as $station) {
        // Prüfe, ob die Station-ID im richtigen Schlüssel 'id' liegt
        if (isset($station['id']) && in_array($station['id'], $selectedIDs)) {
            $currentData = [
                'Name' => $station['name'] ,  // Name der Station
                'Batterie E-Bike' => $station['vehicles']['ebike_battery_level'], // Name der Station
                'Typ' => $station['vehicles']['type']['name'], 
        ];

        // Speichere diese Daten in der transformierten Liste
        $transformedData[] = $currentData;
        }
    }
}


// hier in tabelle m
// Bereite eine Tabelle vor, um die Daten anzuzeigen
echo "<table border='1'>";
echo "<tr><th>Name</th><th>Batterie E-Bike</th><th>Typ</th></tr>";

// Füge die transformierten Daten in die Tabelle ein
foreach ($transformedData as $row) {
    echo "<tr>";
    foreach ($row as $cell) {
        echo "<td>{$cell}</td>";
    }
    echo "</tr>";
}


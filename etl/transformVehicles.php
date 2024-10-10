<?php
// Daten von der API abrufen
$data = include('extractVehicles.php');

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
                'ID' => $station['id'] ,  // ID der Station
                'Station' => $station['name'] ,  // Name der Station
                'E-Bikes' => $ebikeCount > 0 ? implode(', ', $ebikeBatteries) : 'Keine E-Bikes vorhanden',  // Liste der Batterielevel oder keine E-Bikes
                'Gesamtzahl E-Bikes' => $ebikeCount  // Anzahl der E-Bikes                
        ];

        // Speichere diese Daten in der transformierten Liste
        $transformedData[] = $currentData;
        }
    }
}


// hier in tabelle m
// Bereite eine Tabelle vor, um die Daten anzuzeigen
echo "<table border='1'>";
echo "<tr><th>ID</th><th>Station</th><th>Batterie E-Bike</th><th>Typ</th></tr>";

// Füge die transformierten Daten in die Tabelle ein
foreach ($transformedData as $row) {
    echo "<tr>";
    foreach ($row as $cell) {
        echo "<td>{$cell}</td>";
    }
    echo "</tr>";
}


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
        // Prüfe, ob die Station-ID im richtigen Schlüssel 'location_id' liegt
        if (isset($station['location_id']) && in_array($station['location_id'], $selectedIDs)) {
            $ebikeCount = 0;
            $veloCount = 0;

            if (isset($station['vehicles']) && is_array($station['vehicles'])) {
                foreach ($station['vehicles'] as $vehicle) {
                    // Prüfen, ob das Fahrzeug ein E-Bike ist
                    if (isset($vehicle['type']['name']) && $vehicle['type']['name'] === 'E-Bike') {
                        $ebikeCount++;                        
                    }

                    // Prüfen, ob das Fahrzeug ein Velo ist
                    if (isset($vehicle['type']['name']) && $vehicle['type']['name'] === 'Bike') {
                        $veloCount++;
                    }
                }
            }

            $currentData = [
                'location_id' => $station['location_id'],  // ID der Station
                'Station' => $station['name'],  // Name der Station
                'Gesamtzahl E-Bikes' => $ebikeCount,  // Anzahl der E-Bikes
                'Gesamtzahl Velos' => $veloCount,  // Anzahl der Velos
            ];

            // Speichere diese Daten in der transformierten Liste
            $transformedData[] = $currentData;
        }
    }
}

// hier in tabelle m
// Bereite eine Tabelle vor, um die Daten anzuzeigen
/*echo "<table border='1'>";
echo "<tr><th>Location ID</th><th>Station</th><th>Gesamtzahl E-Bikes</th><th>Gesamtzahl Velos</th></tr>";

// Füge die transformierten Daten in die Tabelle ein
foreach ($transformedData as $row) {
    echo "<tr>";
    foreach ($row as $cell) {
        echo "<td>{$cell}</td>";
    }
    echo "</tr>";
}*/

print_r($transformedData);

return $transformedData;
?>

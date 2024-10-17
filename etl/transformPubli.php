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
                'ID' => $station['id'] ,  // ID der Station
                'Station' => $station['name'] ,  // Name der Station
                'Adresse' => $station['address'], // Name der Station
                'Postleitzahl' => $station['zip'], // Postleitzahl der Station
                'Stadt' => $station['city'], // Stadt der Station
                'Status' => $station['state']['name'], // Status der Station
        ];

        // Speichere diese Daten in der transformierten Liste
        $transformedData[] = $currentData;
        }
    }
}


return $transformedData
?>


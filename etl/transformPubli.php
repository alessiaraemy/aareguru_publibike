<?php
$data = include('extractPubli.php');

// Bereite ein Array für die transformierten Daten vor
$transformedData = [];

// Überprüfe, ob Daten vorhanden sind
if (isset($data['stations']) && is_array($data['stations'])) {
    foreach ($data['stations'] as $station) {
        // Bereite die Daten für jede Station vor
        $stationRow = [
            'Station ID' => $station['id'],
            'Name' => $station['name'],
            'Adresse' => $station['address'] . ', ' . $station['zip'] . ' ' . $station['city'],
            'Fahrzeuge' => count($station['vehicles']), // Anzahl Fahrzeuge
            'Kapazität' => $station['capacity'],
        ];

        // Optional: Fahrzeuge mit Batteriestand hinzufügen (falls verfügbar)
        if (!empty($station['vehicles'])) {
            $vehicleInfo = [];
            foreach ($station['vehicles'] as $vehicle) {
                $vehicleInfo[] = $vehicle['name'] . ' (Batterie: ' . ($vehicle['ebike_battery_level'] ?? 'n/a') . '%)';
            }
            $stationRow['Fahrzeugdetails'] = implode(', ', $vehicleInfo);
        } else {
            $stationRow['Fahrzeugdetails'] = 'Keine Fahrzeuge verfügbar';
        }

        // Füge die transformierten Daten der Tabelle hinzu
        $transformedData[] = $stationRow;
    }
}

?>

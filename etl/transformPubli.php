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
    }
}

// Speichere diese Daten in der transformierten Liste
$transformedData[] = $currentData;

// Bereite eine Tabelle vor, um die Daten anzuzeigen
echo "<table border='1'>";
echo "<tr><th>Station ID</th><th>Name</th><th>Adresse</th><th>Fahrzeuge</th><th>Kapazität</th></tr>";

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

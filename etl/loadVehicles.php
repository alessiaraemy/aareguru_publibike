<?php

// Transformations-Skript als '230_transform.php' einbinden
$dataArray = include('transformVehicles.php');

print_r($dataArray); // For debugging purposes, ensure the structure is correct

require_once 'config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO vehicles (location_id, name, Gesamtzahl_EBikes, Gesamtzahl_Velos) VALUES (?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Variable to track success
    $allInserted = true;

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        // Ensure the 'location_id' field exists and is not null
        if (isset($item['location_id']) && !empty($item['location_id'])) {
            // Execute the prepared statement with the correct keys from your data array
            $result = $stmt->execute([
                $item['location_id'], // Using 'location_id' instead of 'Id'
                $item['Station'], // Assuming 'Station' corresponds to 'name'
                $item['Gesamtzahl E-Bikes'], // Ensure it matches the key 'Gesamtzahl_EBikes'
                $item['Gesamtzahl Velos'], // Ensure it matches the key 'Gesamtzahl_Velos'
            ]);

            // Check if the insertion failed
            if (!$result) {
                $allInserted = false;
                echo "Fehler beim Einfügen der Daten für location_id: " . $item['location_id'] . "<br>";
            }
        } else {
            // Skip records where 'location_id' is missing or null
            echo "Fehler: location_id fehlt oder ist null für diesen Eintrag: ";
            print_r($item);
            $allInserted = false;
        }
    }

    // Zeigt eine Erfolgsnachricht nur an, wenn alle Daten eingefügt wurden
    if ($allInserted) {
        echo "Alle Daten erfolgreich eingefügt.";
    } else {
        echo "Einige Daten konnten nicht eingefügt werden.";
    }

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
?>
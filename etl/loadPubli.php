<?php

// Transformations-Skript  als '230_transform.php' einbinden
$dataArray = include('transformPubli.php');

print_r($dataArray); // For debugging purposes, ensure the structure is correct

require_once 'config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO locations (station_id, id, name, address, zip, city, state_name) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Variable to track success
    $allInserted = true;

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        // Check that required fields are not null and exist
        if (isset($item['ID']) && isset($item['Station']) && isset($item['Adresse']) && isset($item['Postleitzahl']) && isset($item['Stadt']) && isset($item['Status'])) {
            
            // Execute the prepared statement with the correct keys from your data array
            $result = $stmt->execute([
                $item['ID'], // 'station_id' should be mapped to 'ID' in your array
                $item['ID'], // Assuming 'id' is also 'ID', you may adjust if it's different
                $item['Station'], // 'name' should map to 'Station'
                $item['Adresse'], // 'address' should map to 'Adresse'
                $item['Postleitzahl'], // 'zip' should map to 'Postleitzahl'
                $item['Stadt'], // 'city' should map to 'Stadt'
                $item['Status'], // 'state_name' should map to 'Status'
            ]);

            // Check if the insertion failed
            if (!$result) {
                $allInserted = false;
                echo "Fehler beim Einfügen der Daten für Station ID: " . $item['ID'] . "<br>";
            }

        } else {
            // If required fields are missing, log the issue
            echo "Daten für Station ID fehlt oder unvollständig: ";
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

<?php

// Transformations-Skript als '230_transform.php' einbinden
$dataArray = include('transformVehicles.php');

print_r($dataArray); // For debugging purposes, ensure the structure is correct

require_once 'config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO vehicles (id, name, Gesamtzahl_EBikes, Gesamtzahl_Velos, location_id) VALUES (?, ?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Variable to track success
    $allInserted = true;

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        // Ensure the 'Id' field exists and is not null
        if (isset($item['Id']) && !empty($item['Id'])) {
            // Execute the prepared statement with the correct keys from your data array
            $result = $stmt->execute([
                $item['id'], // Changed 'ID' to 'Id' to match your array key
                $item['Station'], // Assuming 'Station' corresponds to 'name'
                $item['Gesamtzahl E-Bikes'], // Ensure it matches the key 'Gesamtzahl_EBikes'
                $item['Gesamtzahl Velos'], // Ensure it matches the key 'Gesamtzahl_Velos'
                $item['location_id'] // Assuming 'location_id' corresponds to 'location_id' in your array
            ]);

            // Check if the insertion failed
            if (!$result) {
                $allInserted = false;
                echo "Fehler beim Einfügen der Daten für ID: " . $item['id'] . "<br>";
            }
        } /*else {
            // Skip records where 'Id' is missing or null
            echo "Fehler: Id fehlt oder ist null für diesen Eintrag: ";
            print_r($item);
            $allInserted = false;
        }*/
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
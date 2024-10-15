<?php

// Transformations-Skript als '230_transform.php' einbinden
$dataArray = include('transformVehicles.php');

//print_r($dataArray); // For debugging purposes, ensure the structure is correct

require_once 'config.php'; // Bindet die Datenbankkonfiguration e

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO vehicles (name, Gesamtzahl_EBikes, Gesamtzahl_Velos, station_id) VALUES (?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Variable to track success
    $allInserted = true;
    $errors = []; // To track specific insert errors

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        // Ensure the 'station_id' field exists and is not null
        if (isset($item['station_id']) && !empty($item['station_id'])) {
            // Execute the prepared statement with the correct keys from your data array
            $result = $stmt->execute([
                $item['Station'], // Assuming 'Station' corresponds to 'name'
                $item['Gesamtzahl E-Bikes'], // Matches the key 'Gesamtzahl E-Bikes'
                $item['Gesamtzahl Velos'], // Matches the key 'Gesamtzahl Velos'
                $item['station_id'] // Matches 'station_id' in your array
            ]);

            // Check if the insertion failed
            if (!$result) {
                $allInserted = false;
                // Log error with specific details
                $errors[] = "Fehler beim Einfügen der Daten für station_id: " . $item['station_id'] . " - " . implode(", ", $stmt->errorInfo());
            }
        } else {
            // Skip records where 'station_id' is missing or null
            $errors[] = "Fehler: station_id fehlt oder ist null für diesen Eintrag: " . print_r($item, true);
            $allInserted = false;
        }
    }

    // Display success or error messages based on the result
    if ($allInserted) {
        echo "Alle Daten erfolgreich eingefügt.";
    } else {
        // Show all errors encountered during the insertion
        echo "Einige Daten konnten nicht eingefügt werden.<br>";
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }

} catch (PDOException $e) {
    // General database connection error message
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}

?>

<?php

// Transformations-Skript  als '230_transform.php' einbinden
$dataArray = include('transform.php');

print_r($dataArray);

require_once 'config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO aare_data (id, location, temperature, flow, weather_temperature) VALUES (?, ?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Variable to track success
    $allInserted = true;

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        // Make sure to use the correct case for the array keys
        $result = $stmt->execute([
            $item['id'], // Make sure 'id' exists in your data
            $item['Location'], // Changed to 'Location'
            //$item['Timestamp'], // Changed to 'Timestamp'
            $item['Temperature'], // Changed to 'Temperature'
            $item['Flow'], // Changed to 'Flow'
            $item['weatherTemperature'], // Changed to 'weatherTemperature'
        ]);

        // Überprüft, ob ein Fehler aufgetreten ist
        if (!$result) {
            $allInserted = false;
            echo "Fehler beim Einfügen der Daten für ID: " . $item['id'] . "<br>";
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
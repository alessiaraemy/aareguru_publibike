<?php

// Transformations-Skript  als '230_transform.php' einbinden
$jsonData = include('transform.php');

// Dekodiert die JSON-Daten zu einem Array
$dataArray = json_decode($jsonData, true);

require_once 'config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO aare_data (id, location, timestamp, temperature, flow, weather_temperature) VALUES (?, ?, ?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Variable to track success
    $allInserted = true;

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        // Verifiziert den Erfolgsstatus des Einfügens
        $result = $stmt->execute([
            $item['id'],
            $item['location'],
            $item['timestamp'],
            $item['temperature'], // Fixed typo from 'temerature' to 'temperature'
            $item['flow'],
            $item['weather_temperature'],
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


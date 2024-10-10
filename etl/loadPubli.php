<?php

// Transformations-Skript  als '230_transform.php' einbinden
$jsonData = include('transformPubli.php');

// Dekodiert die JSON-Daten zu einem Array
$dataArray = json_decode($jsonData, true);

require_once 'config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO locations (station_id, id, name, address, zip, city, state_name) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        $stmt->execute([
            $item['station_id'],
            $item['id'],
            $item['name'],
            $item['address'],
            $item['zip'],
            $item['city'],
            $item['state_name'],
        ]);
    }

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
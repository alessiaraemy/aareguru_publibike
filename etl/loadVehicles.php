<?php

// Transformations-Skript  als '230_transform.php' einbinden
$dataArray = include('transformVehicles.php');

print_r($dataArray);

require_once 'config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO vehicles (id, name, Gesamtzahl_EBikes, Gesamtzahl_Velos, location_id) VALUES (?, ?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        $stmt->execute([
            $item['id'],
            $item['name'],
            $item['Gesamtzahl_EBikes'],
            $item['Gesamtzahl_Velos'],
            $item['location_id'],
        ]);
    }

    /*echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}*/


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
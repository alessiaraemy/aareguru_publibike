<?php

// Transformations-Skript einbinden
$dataArray = include('transformPubli.php');

//print_r($dataArray); // Debugging-Zwecke, um sicherzustellen, dass die Struktur korrekt ist

require_once 'config.php'; // Bindet die Datenbankkonfiguration ein

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten oder Aktualisieren, wenn bereits vorhanden
    $sqlInsert = "INSERT INTO locations (station_id, id, name, address, zip, city, state_name) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    // SQL-Query zum Aktualisieren vorhandener Daten
    $sqlUpdate = "UPDATE locations SET name = ?, address = ?, zip = ?, city = ?, state_name = ? WHERE station_id = ?";

    // Bereitet die SQL-Anweisungen vor
    $stmtInsert = $pdo->prepare($sqlInsert);
    $stmtUpdate = $pdo->prepare($sqlUpdate);

    // Variable to track success
    $allProcessed = true;

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($dataArray as $item) {
        // Check that required fields are not null and exist
        if (isset($item['ID']) && isset($item['Station']) && isset($item['Adresse']) && isset($item['Postleitzahl']) && isset($item['Stadt']) && isset($item['Status'])) {
            
            // Prüfen, ob die Station mit dieser ID bereits existiert
            $checkQuery = "SELECT COUNT(*) FROM locations WHERE station_id = ?";
            $stmtCheck = $pdo->prepare($checkQuery);
            $stmtCheck->execute([$item['ID']]);
            $count = $stmtCheck->fetchColumn();
            
            if ($count == 0) {
                // Insert new data if station_id does not exist
                $result = $stmtInsert->execute([
                    $item['ID'], // 'station_id' wird zu 'ID' im Array gemappt
                    $item['ID'], // 'id' wird auch zu 'ID' gemappt (hier könnte eine andere Quelle für 'id' kommen, wenn es abweicht)
                    $item['Station'], // 'name' wird zu 'Station' gemappt
                    $item['Adresse'], // 'address' wird zu 'Adresse' gemappt
                    $item['Postleitzahl'], // 'zip' wird zu 'Postleitzahl' gemappt
                    $item['Stadt'], // 'city' wird zu 'Stadt' gemappt
                    $item['Status'], // 'state_name' wird zu 'Status' gemappt
                ]);
            } else {
                // Update existing data if station_id already exists
                $result = $stmtUpdate->execute([
                    $item['Station'], // 'name' wird zu 'Station' gemappt
                    $item['Adresse'], // 'address' wird zu 'Adresse' gemappt
                    $item['Postleitzahl'], // 'zip' wird zu 'Postleitzahl' gemappt
                    $item['Stadt'], // 'city' wird zu 'Stadt' gemappt
                    $item['Status'], // 'state_name' wird zu 'Status' gemappt
                    $item['ID'] // 'station_id' bleibt gleich
                ]);
            }

            // Check if the operation (insert or update) failed
            if (!$result) {
                $allProcessed = false;
                echo "Fehler beim Verarbeiten der Daten für Station ID: " . $item['ID'] . "<br>";
            }

        } else {
            // If required fields are missing, log the issue
            echo "Daten für Station ID fehlt oder unvollständig: ";
            print_r($item);
            $allProcessed = false;
        }
    }

    // Zeigt eine Erfolgsnachricht nur an, wenn alle Daten erfolgreich verarbeitet wurden
    if ($allProcessed) {
        echo "Alle Daten erfolgreich verarbeitet.";
    } else {
        echo "Einige Daten konnten nicht verarbeitet werden.";
    }

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
?>

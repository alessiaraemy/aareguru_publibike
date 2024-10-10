<?php

// Import the database configuration
require 'config.php';

try {
    // Create a new PDO instance using the configuration parameters
    $pdo = new PDO($dsn, $username, $password, $options);

    // Define the SQL query to retrieve the desired data
    $sql = "SELECT temperature, flow, weather_temperature FROM stations";

    // Prepare and execute the query
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch all results as an associative array
    $data = $stmt->fetchAll();

    // Set the appropriate header for JSON response
    header('Content-Type: application/json');


    // Gibt die Ergebnisse im JSON-Format zurück
    echo json_encode($results); 
    } catch (PDOException $e) {
    // Gibt eine Fehlermeldung zurück, wenn etwas schiefgeht
    echo json_encode(['error' => $e->getMessage()]);
    }
    
    
    /*// Output the data as a JSON-encoded string
    echo json_encode($data);

} catch (PDOException $e) {
    // Handle any PDO errors
    http_response_code(500); // Set HTTP status code to 500 (Internal Server Error)
    echo json_encode(['error' => $e->getMessage()]);
}*/

?>

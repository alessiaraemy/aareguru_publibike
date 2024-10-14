<?php

// Import the database configuration
require 'config.php';

try {
    // Create a new PDO instance using the configuration parameters
    $pdo = new PDO($dsn, $username, $password, $options);

    // Define the SQL query to retrieve the desired data
    $sql = "SELECT temperature, flow, weather_temperature FROM location";

    // Prepare and execute the query
    $stmt = $pdo->prepare($sql); // Hier hat die prepare-Anweisung gefehlt
    $stmt->execute();

    // Fetch all results as an associative array
    $data = $stmt->fetchAll();

    // Set the appropriate header for JSON response
    header('Content-Type: application/json');

    // Output the data as JSON
    echo json_encode($data);

} catch (PDOException $e) {
    // Handle the error
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>

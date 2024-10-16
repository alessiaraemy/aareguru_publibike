<?php
// Include the database configuration
require 'config.php';

try {
    // Create a new PDO instance using the configuration from config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // Prepare and execute the SQL query
    $stmt = $pdo->prepare("SELECT name, Gesamtzahl_EBikes, Gesamtzahl_Velos, station_id FROM vehicles");
    $stmt->execute();

    // Fetch all the results as an associative array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);  // Ensure associative array

    // Set the header to inform that the output is JSON
    header('Content-Type: application/json');

    // Output the results in JSON format
    echo json_encode($results);

} catch (PDOException $e) {
    // In case of an error, return a JSON error message
    echo json_encode(['error' => $e->getMessage()]);
}
?>
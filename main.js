/*async function fetchStationData() {
    try {
        // Abrufen der Daten von unload.php
        const response = await fetch('unload.php');

        // Überprüfen, ob die Anfrage erfolgreich war
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Daten');
        }

        // Die Daten als JSON parsen
        const data = await response.json();

        // Die Daten in der Konsole anzeigen
        console.log(data);
        
    } catch (error) {
        // Fehler in der Konsole anzeigen
        console.error('Fehler:', error);
    }
}*/

 // AJAX Anfrage mit Fetch API
 fetch('etl/unload.php')
 .then(response => {
     if (!response.ok) {
         throw new Error('Netzwerk-Antwort war nicht ok');
     }
     return response.json();  // Antwort in JSON umwandeln
 })
 .then(data => {
     console.log(data);  // Daten in der Konsole anzeigen
 })
 .catch(error => {
     console.error('Es gab ein Problem mit der Fetch-Operation:', error);
 });
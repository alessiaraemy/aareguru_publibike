async function fetchStationData() {
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
}
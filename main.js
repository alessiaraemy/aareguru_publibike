document.addEventListener('DOMContentLoaded', function () {
    // Step 1: Station Elemente erstellen, dazu werden die positionData verwendet
    createStations();

    // Step 2: Zuerst die temperature Daten fetchen, danach die Stationen und Vehicles Daten fetchen
    fetchTemperatureData().then(() => {
        // After temperature data is loaded, fetch station and vehicle data
        Promise.all([fetchStationData(), fetchVehicleData()]).then(() => {
            console.log("All data fetched and stations updated.");
        });
    });
});

// Positionen für die einzelnen Stationen fixieren (IDs must match the database station IDs)
const positionData = [
    { id: 119, position: { top: "8%", left: "6%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Postauto Engehalde
    { id: 114, position: { top: "12%", left: "6%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Engehalde
    { id: 195, position: { top: "15%", left: "40%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Lorrainebrücke
    { id: 663, position: { top: "25%", left: "15%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Kleeplatz/ Bollwerk
    { id: 251, position: { top: "27%", left: "40%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Kornhausplatz
    { id: 898, position: { top: "17%", left: "65%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Altenbergstrasse
    { id: 254, position: { top: "30%", left: "65%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Nydegg
    { id: 316, position: { top: "35%", left: "15%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Marzilibahn
    { id: 315, position: { top: "45%", left: "15%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Marzilibad
    { id: 478, position: { top: "50%", left: "25%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Dampfzentrale
    { id: 321, position: { top: "55%", left: "12%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Monbijoubrücke
    { id: 312, position: { top: "50%", left: "70%" }, infoBoxPosition: { top: "-40%", left: "80%" }}, //Ka-We-De
    { id: 323, position: { top: "52%", left: "80%" }, infoBoxPosition: { top: "-40%", left: "-280%" }}, //Restaurant Dählhölzli
    { id: 423, position: { top: "65%", left: "75%" }, infoBoxPosition: { top: "-40%", left: "-250%" }}, //Camping Eichholz
    { id: 326, position: { top: "30%", left: "92%" }, infoBoxPosition: { top: "-40%", left: "-230%" }} //Bärenpark
];

// Stationen erstellen
function createStations() {
    const mapContainer = document.querySelector('.map-container');
    positionData.forEach(pos => {
        // Create a station element for each position
        const stationElement = document.createElement('div');
        stationElement.classList.add('station');
        stationElement.setAttribute('data-id', pos.id);  // Assign the unique station ID
        stationElement.style.position = 'absolute';  // Ensure proper positioning
        stationElement.style.top = pos.position.top;
        stationElement.style.left = pos.position.left;

        // Create a bubble with a bike symbol
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.textContent = '🚲';  // Bike icon🚴
        stationElement.appendChild(bubble);

        // Create an empty info box for station details
        const infoBox = document.createElement('div');
        infoBox.classList.add('info-box');
        infoBox.innerHTML = `
            <div class="info-header">
                <h3 class="name"></h3> <!-- Placeholder for station name -->
                <span class="close-btn">&times;</span> <!-- Close button (X) -->
            </div>
            <div class="info-content">
                <p class="address">Adresse: </p> <!-- Placeholder for address -->
                <p class="ebikes">E-Bikes: </p> <!-- Placeholder for e-bike count -->
                <p class="bikes">Velos: </p> <!-- Placeholder for regular bike count -->
                <p class="quote"></p> <!-- Placeholder for the small saying -->
            </div>
        `;

        // Setze die individuelle Position der Infobox
        infoBox.style.position = 'absolute';
        infoBox.style.top = pos.infoBoxPosition.top;
        infoBox.style.left = pos.infoBoxPosition.left;
        
        stationElement.appendChild(infoBox);

        mapContainer.appendChild(stationElement);

        // INFOBOX ÖFFNEN/SCHLIESSEN
        // Event listener um Infobox zu öffnen und schliessen
        stationElement.addEventListener('click', function () {
            closeAllInfoBoxes();  // Close other info boxes
            infoBox.style.display = 'block';  // Show this info box
        });

        // Event listener der die Infobox schliesst sobald man ausserhalb der box klickt
        document.addEventListener('click', function (event) {
            const isClickInsideStation = event.target.closest('.station');

            if (!isClickInsideStation) {
                closeAllInfoBoxes();  
            }
        });

        // Kreuz zum schliessen ergänzen
        infoBox.querySelector('.close-btn').addEventListener('click', function (event) {
            event.stopPropagation();  // Verhindert, dass der Klick auf den Container auch ausgelöst wird
            infoBox.style.display = 'none';  // Hide this info box
        });
    });
}

// Function to close all open info boxes
function closeAllInfoBoxes() {
    document.querySelectorAll('.info-box').forEach(infoBox => {
        infoBox.style.display = 'none';  // Hide all info boxes
    });
}

// Funktion um die Adressen zu fetchen
function fetchStationData() {
    return fetch('etl/unloadPubli.php')  // Request station data from the server
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            console.log("Station data fetched:", data);  // Log for debugging
            updateStationsWithLocationData(data);  // Pass the data to the update function
        })
        .catch(error => console.error('Error fetching station data:', error));
}

// Funktion um die Anzahl E-Bikes und Velos zu fetchen
function fetchVehicleData() {
    return fetch('etl/unloadVehicles.php')  // Request vehicle data from the server
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            console.log("Vehicle data fetched:", data);  // Log for debugging
            updateStationsWithVehicleData(data);  // Pass the data to the update function
        })
        .catch(error => console.error('Error fetching vehicle data:', error));
}

// Function to update the stations with location data (addresses)
function updateStationsWithLocationData(locations) {
    locations.forEach(location => {
        // Find the station element by its station ID
        const stationElement = document.querySelector(`.station[data-id='${location.station_id}']`);
        if (stationElement) {
            // Update the address field in the info box
            stationElement.querySelector('.address').textContent = `Adresse: ${location.address}`;
        }
    });
}

// Funktion, um die Temperaturdaten von der API zu laden
function fetchTemperatureData() {
    return fetch('etl/unload.php') // Anfrage an deine API
        .then(response => response.json())
        .then(data => {
            console.log('Rohe Daten von der API:', data); // Zeigt die rohen Daten an
            if (data && data.length > 0) {
                // Hole die aktuellsten Daten (letzter Eintrag im Array)
                const latestData = data[data.length - 1];
                
                globalAareTemp = parseFloat(latestData.temperature) || 0;
                globalWeatherTemp = parseFloat(latestData.weather_temperature) || 0;

                // Setze die Werte in die Infobox
                document.getElementById('aare-temp').textContent = globalAareTemp.toFixed(1) + ' °C'; // Rundet auf eine Dezimalstelle
                document.getElementById('weather-temp').textContent = globalWeatherTemp.toFixed(1) + ' °C'; // Rundet auf eine Dezimalstelle

                console.log('Temperaturdaten erfolgreich geladen:', { globalAareTemp, globalWeatherTemp });
            } else {
                console.error('Keine Temperaturdaten vorhanden');
            }
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Temperaturdaten:', error);
        });
}



// Funktion zum Erstellen der dynamischen Sätze
function generateQuote(stationId, numBikes, numEBikes) {
    let sentence = '';
    const isUpperStation = [423, 323, 312, 326, 254].includes(stationId);
    const isLowerStation = [321, 478, 315, 316, 898, 251, 663, 195, 114, 119].includes(stationId);

    // Logik für die Badetemperaturen
    if (globalWeatherTemp < 23 || globalAareTemp < 16) {
        // Zu kalt zum Baden
        if (numBikes > 0) {
            sentence = 'Bade wottsch gloub eher nid, aber hie fingsch es Velo für dini Velotour.';
        } else {
            sentence = 'Bade wottsch gloub eher nid, aber hie fingsch ou kes Velo für neh Velotour.';
        }
    } else {
        // Warm genug zum Baden
        if (isUpperStation) {
            if (numBikes > getUpperStationThreshold(stationId)) {
                sentence = 'Hie hets mega viu velos, wöu viu ad Aare si.';
            } else {
                sentence = 'Hie hets kes Velo, gump eifach id Aare und schwümm zu dim Ziu.';
            }
        } else if (isLowerStation) {
            if (numBikes > getLowerStationThreshold(stationId)) {
                sentence = 'Hie chasch dis Velo hole für ad Aare.';
            } else {
                sentence = 'Es isch mega warm, drum hei hie scho viu es velo gno.';
            }
        }
    }

    return sentence;
}

// Hilfsfunktionen, um den Schwellenwert für "viel/wenig" Velos für obere und untere Stationen zu bekommen
function getUpperStationThreshold(stationId) {
    const thresholds = {
        423: 8,
        323: 3,
        312: 2,
        326: 3,
        254: 2
    };
    return thresholds[stationId] || 0;
}

function getLowerStationThreshold(stationId) {
    const thresholds = {
        321: 2,
        478: 5,
        315: 8,
        316: 3,
        898: 8,
        251: 3,
        663: 5,
        195: 3,
        114: 8,
        119: 8
    };
    return thresholds[stationId] || 0;
}



function updateStationsWithVehicleData(vehicles) {
    vehicles.forEach(vehicle => {
        // Find the station element by its location ID
        const stationElement = document.querySelector(`.station[data-id='${vehicle.station_id}']`);
        if (stationElement) {
            // Update the name field in the info box
            stationElement.querySelector('.name').textContent = vehicle.name;

            // Update the ebikes and bikes fields in the info box
            const numBikes = vehicle.Gesamtzahl_Velos;
            const numEBikes = vehicle.Gesamtzahl_EBikes;

            // Berechnung der Gesamtanzahl (Velos + E-Bikes)
            const totalVehicles = numBikes + numEBikes;

            // Update the E-Bikes and Velos fields in the info box
            stationElement.querySelector('.ebikes').textContent = `E-Bikes: ${numEBikes}`;
            stationElement.querySelector('.bikes').textContent = `Velos: ${numBikes}`;

            // Dynamischen Satz generieren
            const quote = generateQuote(vehicle.station_id, numBikes, numEBikes);
            stationElement.querySelector('.quote').textContent = quote;

            // Anpassung der Größe der Bubble basierend auf der Gesamtanzahl der Velos und E-Bikes
            const bubble = stationElement.querySelector('.bubble');
            bubble.innerHTML = `🚲`; // Icon

            // Berechnung der Bubble-Größe basierend auf der Gesamtanzahl
            const bubbleSize = getBubbleSize(totalVehicles);
            bubble.style.width = `${bubbleSize}px`;
            bubble.style.height = `${bubbleSize}px`;
        }
    });
}

// Funktion zur Bestimmung der Bubble-Größe basierend auf der Gesamtanzahl von Velos und der Bildschirmbreite
function getBubbleSize(totalVehicles) {
    // Bildschirmbreite abfragen
    const screenWidth = window.innerWidth;

    let baseSize;

    if (screenWidth > 1024) {
        // Desktop
        baseSize = 150; // Maximale Größe für Desktops
    } else if (screenWidth > 768) {
        // Tablets
        baseSize = 100; // Reduzierte Größe für Tablets
    } else {
        // Smartphones
        baseSize = 70; // Noch kleinere Bubbles für Smartphones
    }

    // Passe die Größe basierend auf der Anzahl der Fahrzeuge an
    if (totalVehicles > 30) {
        return baseSize; // Viele Fahrzeuge -> Größere Bubble
    } else if (totalVehicles > 20) {
        return baseSize * 0.9; // Leicht kleinere Bubble
    } else if (totalVehicles > 10) {
        return baseSize * 0.8; // Mittlere Bubble
    } else if (totalVehicles > 0) {
        return baseSize * 0.7; // Kleine Bubble
    } else {
        return baseSize * 0.5; // Keine Fahrzeuge -> Kleinste Bubble
    }
}


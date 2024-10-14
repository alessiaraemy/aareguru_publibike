document.addEventListener('DOMContentLoaded', function () {
    // Create the station elements first, using static position data
    createStations();

    // Fetch data from the backend to dynamically fill station details
    fetchStationData();
    fetchVehicleData();
});

// Hardcoded positions for the stations (IDs must match the database station IDs)
const positionData = [
    { id: 1, position: { top: "8%", left: "6%" } },
    { id: 2, position: { top: "12%", left: "6%" } },
    { id: 3, position: { top: "15%", left: "40%" } },
    { id: 4, position: { top: "25%", left: "15%" } },
    { id: 5, position: { top: "27%", left: "40%" } },
    { id: 6, position: { top: "17%", left: "65%" } },
    { id: 7, position: { top: "30%", left: "65%" } },
    { id: 8, position: { top: "35%", left: "15%" } },
    { id: 9, position: { top: "45%", left: "15%" } },
    { id: 10, position: { top: "50%", left: "25%" } },
    { id: 11, position: { top: "55%", left: "12%" } },
    { id: 12, position: { top: "50%", left: "70%" } },
    { id: 13, position: { top: "52%", left: "80%" } },
    { id: 14, position: { top: "65%", left: "75%" } },
    { id: 15, position: { top: "30%", left: "95%" } }
];

// Function to create the station elements with hardcoded positions
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
        bubble.textContent = '🚴';  // Bike icon
        stationElement.appendChild(bubble);

        // Create an empty info box for station details
        const infoBox = document.createElement('div');
        infoBox.classList.add('info-box');
        infoBox.innerHTML = `
            <div class="info-header">
                <span class="close-btn">&times;</span>
            </div>
            <div class="info-content">
                <p class="address">Adresse: </p>
                <p class="ebikes">E-Bikes: </p>
                <p class="bikes">Velos: </p>
                <p class="quote"></p>
            </div>
        `;
        stationElement.appendChild(infoBox);

        mapContainer.appendChild(stationElement);

        // Add event listener to open/close the info box
        stationElement.addEventListener('click', function () {
            closeAllInfoBoxes();  // Close other info boxes
            infoBox.style.display = 'block';  // Show this info box
        });

        // Add close button event listener
        infoBox.querySelector('.close-btn').addEventListener('click', function () {
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

// Function to fetch station addresses and locations
function fetchStationData() {
    fetch('unloadPubli.php')
        .then(response => response.json())
        .then(data => {
            updateStationsWithLocationData(data);  // Update station addresses
        })
        .catch(error => console.error('Error fetching station data:', error));
}

// Function to fetch vehicle counts (ebikes and bikes)
function fetchVehicleData() {
    fetch('unloadVehicles.php')
        .then(response => response.json())
        .then(data => {
            updateStationsWithVehicleData(data);  // Update ebikes and bikes count
        })
        .catch(error => console.error('Error fetching vehicle data:', error));
}

// Update stations with location data (addresses)
function updateStationsWithLocationData(locations) {
    locations.forEach(location => {
        // Find the station element based on station_id
        const stationElement = document.querySelector(`.station[data-id='${location.station_id}']`);
        if (stationElement) {
            // Update the address field in the info box
            stationElement.querySelector('.address').textContent = `Adresse: ${location.address}`;
        }
    });
}

// Update stations with vehicle data (ebikes and bikes)
function updateStationsWithVehicleData(vehicles) {
    vehicles.forEach(vehicle => {
        // Find the station element based on location_id
        const stationElement = document.querySelector(`.station[data-id='${vehicle.location_id}']`);
        if (stationElement) {
            // Update the ebikes and bikes fields in the info box
            stationElement.querySelector('.ebikes').textContent = `E-Bikes: ${vehicle.Gesamtzahl_EBikes}`;
            stationElement.querySelector('.bikes').textContent = `Velos: ${vehicle.Gesamtzahl_Velos}`;
        }
    });
}

// Close info boxes when clicking outside a station
document.addEventListener('click', function (event) {
    if (!event.target.closest('.station')) {
        closeAllInfoBoxes();  // Close all info boxes if clicked outside
    }
});

 
 
 
 /* CODE WONI VORHÄR BRUCHT HA¨
 // Daten für mehrere Velostationen
 const stationsData = [
    {
        id: 1,
        address: "PostAuto Engehalde",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "8%", left: "6%" }
    },
    {
        id: 2,
        address: "Engehalde",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "12%", left: "6%" }
    },
    {
        id: 3,
        address: "Lorrainebrücke",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "15%", left: "40%" }
    },
    {
        id: 4,
        address: "Kleeplatz/ Bollwerk",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "25%", left: "15%" }
    },
    {
        id: 5,
        address: "Kornhausplatz",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "27%", left: "40%" }
    },
    {
        id: 6,
        address: "Altenbergstrasse",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "17%", left: "65%" }
    },
    {
        id: 7,
        address: "Nydegg",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "30%", left: "65%" }
    },
    {
        id: 8,
        address: "Marzilibahn",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "35%", left: "15%" }
    },
    {
        id: 9,
        address: "Marzilibad",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "45%", left: "15%" }
    },
    {
        id: 10,
        address: "Dampfzentrale",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "50%", left: "25%" }
    },
    {
        id: 11,
        address: "Monbijoubrücke",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "55%", left: "12%" }
    },
    {
        id: 12,
        address: "Ka-We-De",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "50%", left: "70%" }
    },
    {
        id: 13,
        address: "Restaurant Dälhölzli",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "52%", left: "80%" }
    },
    {
        id: 14,
        address: "Eichholz",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "65%", left: "75%" }
    },
    {
        id: 15,
        address: "Bäregrabe",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "30%", left: "95%" }
    },


];

// Füge alle Velostationen dynamisch hinzu
const mapContainer = document.querySelector('.map-container'); // Hole das Container-Element aus dem DOM, in dem alle Velostationen eingefügt werden sollen

// Durchlaufe alle Stationen in stationsData
stationsData.forEach(station => {
    // Erstelle ein neues div-Element für jede Station
    const stationElement = document.createElement('div');
    stationElement.classList.add('station'); // Füge die Klasse 'station' hinzu
    stationElement.setAttribute('data-id', station.id); // Setze ein Datenattribut mit der ID der Station
    stationElement.style.top = station.position.top; // Positioniere die Station entsprechend ihrer 'top'-Koordinate
    stationElement.style.left = station.position.left; // Positioniere die Station entsprechend ihrer 'left'-Koordinate

    // Erstelle eine "Blase", die das Velosymbol enthält
    const bubble = document.createElement('div');
    bubble.classList.add('bubble'); // Füge die Klasse 'bubble' hinzu
    bubble.textContent = '🚴'; // Setze das Fahrradsymbol in die Blase ein
    stationElement.appendChild(bubble); // Hänge die Blase an das stationElement an

    // Erstelle eine Info-Box, die Details über die Station enthält
    const infoBox = document.createElement('div');
    infoBox.classList.add('info-box'); // Füge die Klasse 'info-box' hinzu
    infoBox.innerHTML = `
        <div class="info-header">
            <span class="close-btn">&times;</span> <!-- Schaltfläche zum Schließen der Info-Box -->
        </div>
        <div class="info-content">
            <p class="address">Adresse: ${station.address}</p> <!-- Zeigt die Adresse der Station an -->
            <p class="ebikes">E-Bikes: ${station.ebikes}</p> <!-- Zeigt die Anzahl der E-Bikes an -->
            <p class="bikes">Velos: ${station.bikes}</p> <!-- Zeigt die Anzahl der normalen Fahrräder an -->
            <p class="quote">"${station.quote}"</p> <!-- Zeigt ein Zitat zur Station an -->
        </div>
    `; // Setze den Inhalt der Info-Box
    stationElement.appendChild(infoBox); // Hänge die Info-Box an das stationElement an

    // Füge das stationElement in den Container (mapContainer) ein
    mapContainer.appendChild(stationElement); 

    // Event-Listener für die Station: Beim Klick auf die Station, öffne die Info-Box
    stationElement.addEventListener('click', function () {
        closeAllInfoBoxes(); // Schließe zuerst alle anderen offenen Info-Boxen
        infoBox.style.display = 'block'; // Zeige die Info-Box dieser Station an
    });

    // Event-Listener für das Schließen der Info-Box: Beim Klick auf das Schließen-Symbol
    infoBox.querySelector('.close-btn').addEventListener('click', function () {
        infoBox.style.display = 'none'; // Verstecke die Info-Box
    });
});

// Funktion, um alle Info-Boxen zu schließen
function closeAllInfoBoxes() {
    document.querySelectorAll('.info-box').forEach(infoBox => {
        infoBox.style.display = 'none'; // Setze das Display jeder Info-Box auf 'none' (unsichtbar)
    });
}

// Funktion, um Info-Boxen zu schließen, wenn man außerhalb klickt
document.addEventListener('click', function (event) {
    const target = event.target; // Das Element, auf das geklickt wurde
    if (!target.closest('.station')) { // Wenn nicht auf eine Station geklickt wurde...
        closeAllInfoBoxes(); // Schließe alle Info-Boxen
    }
});*/







 /* DINGE IN KONSOLE ANZEIGEN LASSEN
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


  // AJAX Anfrage mit Fetch API
  fetch('etl/unloadPubli.php')
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


   // AJAX Anfrage mit Fetch API
 fetch('etl/unloadVehicles.php')
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
*/

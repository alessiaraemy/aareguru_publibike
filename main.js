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
        position: { top: "30%", left: "97%" }
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
});


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

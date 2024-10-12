// Daten für mehrere Velostationen
const stationsData = [
    {
        id: 1,
        address: "Hauptstraße 123",
        ebikes: 5,
        bikes: 10,
        quote: "Frisch in die Pedale!",
        position: { top: "20%", left: "40%" }
    },
    {
        id: 2,
        address: "Marktplatz 456",
        ebikes: 3,
        bikes: 7,
        quote: "Immer mobil!",
        position: { top: "50%", left: "30%" }
    },
    {
        id: 3,
        address: "Bahnhofstraße 789",
        ebikes: 8,
        bikes: 15,
        quote: "Freiheit auf zwei Rädern!",
        position: { top: "70%", left: "60%" }
    }
];

// Füge alle Velostationen dynamisch hinzu
const mapContainer = document.querySelector('.map-container');

stationsData.forEach(station => {
    const stationElement = document.createElement('div');
    stationElement.classList.add('station');
    stationElement.setAttribute('data-id', station.id);
    stationElement.style.top = station.position.top;
    stationElement.style.left = station.position.left;

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = '🚴'; // Das Symbol für die Velostation
    stationElement.appendChild(bubble);

    const infoBox = document.createElement('div');
    infoBox.classList.add('info-box');
    infoBox.innerHTML = `
        <div class="info-header">
            <span class="close-btn">&times;</span>
        </div>
        <div class="info-content">
            <p class="address">Adresse: ${station.address}</p>
            <p class="ebikes">E-Bikes: ${station.ebikes}</p>
            <p class="bikes">Velos: ${station.bikes}</p>
            <p class="quote">"${station.quote}"</p>
        </div>
    `;
    stationElement.appendChild(infoBox);

    mapContainer.appendChild(stationElement); // Append to map container

    // Event-Listener für die Station
    stationElement.addEventListener('click', function () {
        closeAllInfoBoxes();
        infoBox.style.display = 'block';
    });

    // Event-Listener für das Schließen der Info-Box
    infoBox.querySelector('.close-btn').addEventListener('click', function () {
        infoBox.style.display = 'none';
    });
});

// Funktion, um alle Info-Boxen zu schließen
function closeAllInfoBoxes() {
    document.querySelectorAll('.info-box').forEach(infoBox => {
        infoBox.style.display = 'none';
    });
}

// Funktion, um Info-Box zu schließen, wenn man außerhalb klickt
document.addEventListener('click', function (event) {
    const target = event.target;
    if (!target.closest('.station')) {
        closeAllInfoBoxes();
    }
});

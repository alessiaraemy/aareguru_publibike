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

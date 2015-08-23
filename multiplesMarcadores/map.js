var marcadores = [
    {
        name:"León", 
         lat: 42.603,
         lng: -5.577,
         address: "Algo 534543",
         postalCode: "1940"
    },
    {
        name:"Salamanca", 
         lat: 40.963,
         lng: -5.669,
         address: "Some 534543",
         postalCode: "1942"
    },
    {
        name:"Zamora", 
        lat: 41.503,
        lng: -5.744,
        address: "Calle 534543",
        postalCode: "1944"
    },
    {
        name:"Algo", 
        lat: 42.000,
        lng: -6.000,
        address: "Low 534543",
        postalCode: "1945"
    }
];

function initialize() {
    
    
   var mapOptions = {
      center: new google.maps.LatLng(41.503, -5.744),
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

   // Nueva infowindow, el tooltip que aparece al hacer click
   infoWindow = new google.maps.InfoWindow();

   // Evento que cierra infowindow con un click en el mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Se llama para comenzar con la creacion de los marcadores
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);

        
    function displayMarkers(){

   // Esta variable setea los limites y el zoom de acuerdo
// a la posicion de los marcadores
   var bounds = new google.maps.LatLngBounds();

   // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
   for (var i = 0; i < marcadores.length; i++){

      var latlng = new google.maps.LatLng(marcadores[i].lat, marcadores[i].lng);
      var name = marcadores[i].name;
      var address = marcadores[i].address;
      var postalCode = marcadores[i].postalCode;
       
      //La creacion del marcador
      createMarker(latlng, name, address, postalCode);

      // Cada lat y lng de los marcadores se agrefa a bounds
      bounds.extend(latlng); 
   }

   // La variables es usada para setear los limites
   // con API’s fitBounds() function
   map.fitBounds(bounds);
}

// Crea un marcador con los parametros que recibe
function createMarker(latlng, name, address, postalCode){
   
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name
   });

   // Evento click en marcador
   // Cuando se dispara el evento se crea infowindow
   // y se abre
   google.maps.event.addListener(marker, 'click', function() {
      
      // Variable para definir el html del tooltip infowindow
      var iwContent = '<div id="iw_container">' +
      '<div class="iw_title">' + name + '</div>' +
      '<div class="iw_content">' + address + '<br />' +
      postalCode + '</div></div>';
      
      // Seteandole el contenido
      infoWindow.setContent(iwContent);

      // Abrriendo
      infoWindow.open(map, marker);
   });
}
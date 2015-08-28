//declara una variable Geolocalizacion que será la que contendrá todo el espacio de variables de la página. 
//Si esa variable ya fue declarada anteriormente ahora la vuelve a referenciar. En otro caso le asigna un objeto vacío

var Geolocalizacion = Geolocalizacion || {};

//Lo asignado a self sera es publico, es decir se puede acceder utilizando Geolocalizacion.
//lo definido solo como var sera privado
//Envolvemos el módulo dentro de una función auto-ejecutable
//Este script es para las funciones comunes de nuestro sitio por eso se encuentra en el namespace principal y no en un subnamespace
(function (self){
    

    self.displayMarkers =  function displayMarkers(map, marcadores, infoWindow){

       // Esta variable setea los limites y el zoom de acuerdo
    // a la posicion de los marcadores
       var bounds = new google.maps.LatLngBounds();

       for (var i = 0; i < marcadores.length; i++){

          var latlng = new google.maps.LatLng(marcadores[i].lat, marcadores[i].lng);
          var nombre = marcadores[i].nombre;
          var dire = marcadores[i].direccion;
          var codPostal = marcadores[i].codPostal;
            
          //La creacion del marcador
          createMarker(map, latlng, nombre, dire, codPostal, infoWindow);

          // Cada lat y lng de los marcadores se agrefa a bounds
          bounds.extend(latlng); 
       }

       // La variables es usada para setear los limites
       // con API’s fitBounds() function
       map.fitBounds(bounds);
    }

    // Crea un marcador con los parametros que recibe, funcion privada que se llama desde la funcion publica displayMarkers
    var createMarker =  function createMarker(map, latlng, nombre, direccion, codPostal, infowin){

        var marker = new google.maps.Marker({
          map: map,
          position: latlng,
          title: nombre,
          //,animation: google.maps.Animation.DROP
       });

       // Evento click en marcador
       // Cuando se dispara el evento se crea infowindow
       // y se abre
       
       google.maps.event.addListener(marker, 'click', function() {

          // Variable para definir el html del tooltip infowindow
          var iwContent = '<div id="iw_container">' +
          '<div class="iw_title">' + nombre + '</div>' +
          '<div class="iw_content">' + direccion + '<br />' +
          codPostal + '</div></div>';

          // Seteandole el contenido
          infowin.setContent(iwContent);

          // Abriendo
          infowin.open(map, marker);
       });
       
        // Evento que cierra infowindow con un click en el mapa
       google.maps.event.addListener(map, 'click', function() {
          infowin.close();
       });
    }
    
    
})(Geolocalizacion);
//De este closure solo sera visible Geolocalizacion.displayMarkers
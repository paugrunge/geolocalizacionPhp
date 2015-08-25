//Este patrón de diseño JavaScript, que se basa en el expuesto en la publicación de Addy Osmani Namespacing Patterns, 
//declara una variable geolocalizacion que será la que contendrá todo el espacio de variables de la página. 
//Si esa variable ya fue declarada anteriormente ahora la vuelve a referenciar. En otro caso le asigna un objeto vacío

//Asignación inicial a un objeto literal vacío o a si mismo
//si ya fue creado previamente.
var Geolocalizacion = Geolocalizacion || {};
Geolocalizacion.MultMarcadores = Geolocalizacion.MultMarcadores || {};

//Lo asignado a self sera es publico, es decir se puede acceder utilizando geolocalizacion.
//lo definido solo como var sera privado
//Envolvemos el módulo dentro de una función auto-ejecutable
(function (self){
    var marcadores = [
        {
            nombre:"León", 
             lat: 42.603,
             lng: -5.577,
             direccion: "Algo 534543",
             codPostal: "1940"
        },
        {
            nombre:"Salamanca", 
             lat: 40.963,
             lng: -5.669,
             direccion: "Some 534543",
             codPostal: "1942"
        },
        {
            nombre:"Zamora", 
            lat: 41.503,
            lng: -5.744,
            direccion: "Calle 534543",
            codPostal: "1944"
        },
        {
            nombre:"Algo", 
            lat: 42.000,
            lng: -6.000,
            direccion: "Low 534543",
            codPostal: "1945"
        }
    ];
    
    
    var initialize = function initialize() {


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
       self.displayMarkers(marcadores, infoWindow);
    }
    
    google.maps.event.addDomListener(window, 'load', initialize);


    self.displayMarkers =  function displayMarkers(marcadores, infoWindow){

       // Esta variable setea los limites y el zoom de acuerdo
    // a la posicion de los marcadores
       var bounds = new google.maps.LatLngBounds();

       // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
       for (var i = 0; i < marcadores.length; i++){

          var latlng = new google.maps.LatLng(marcadores[i].lat, marcadores[i].lng);
          var nombre = marcadores[i].nombre;
          var dire = marcadores[i].direccion;
          var codPostal = marcadores[i].codPostal;

          //La creacion del marcador
          createMarker(latlng, nombre, dire, codPostal, infoWindow);

          // Cada lat y lng de los marcadores se agrefa a bounds
          bounds.extend(latlng); 
       }

       // La variables es usada para setear los limites
       // con API’s fitBounds() function
       map.fitBounds(bounds);
    }

    // Crea un marcador con los parametros que recibe, funcion privada que se llama desde la funcion publica displayMarkers
    var createMarker =  function createMarker(latlng, nombre, direccion, codPostal, infowin){

        var marker = new google.maps.Marker({
          map: map,
          position: latlng,
          title: nombre
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

          // Abrriendo
          infowin.open(map, marker);
       });
    }
    
     self.cargar = function cargar(){


        var promise = $.ajax
                        ({
                        type: "POST",
                        url: "nexoAjax.php",
                        data: ({"accion" : "cargar"}),
                        cache: false,
                        dataType: "text"
                      });// fin del ajax

        promise.done(function (dato){
            alert(dato);
        });
    }
    
})(Geolocalizacion.MultMarcadores);
//De este closure solo sera visible Geolocalizacion.MultMarcadores.displayMarkers
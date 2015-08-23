function mostrarGoogleMaps() {
    //Creamos el punto a partir de las coordenadas:
    var punto = new google.maps.LatLng(-34.603657,-58.381794);

    //Configuramos las opciones indicando Zoom, punto(el que hemos creado) y tipo de mapa
    var myOptions = {
    zoom: 14, center: punto, mapTypeId: google.maps.MapTypeId.ROADMAP //G_MAP_TYPE o ROADMAP
    };


    map = new google.maps.Map(document.getElementById("mostrarMapa"), myOptions);

    bounds = new google.maps.LatLngBounds();
    
    countMarker = 0;
    
    puntos = [];

  };

function verMarcador(){
    
    countMarker++;
    $("#divError").hide();
    
    var lat = $("#lat").val();
    var lng = $("#lng").val();
    var nombre = $("#nombre").val();
   
    
    if(validar(lat,lng)){

        var punto = new google.maps.LatLng(lat,lng);
        
        var marker=new google.maps.Marker({
          position:punto,
          map : map,
          title: nombre
          });

        // la variable bounds utiza el marcador
         bounds.extend(punto); 

        //Adecuo los limites del mapa de acuerdo a variable bounds
          map.fitBounds(bounds);

        //Para volver a acomodar el zoom luego de adecuar los
        // limites del mapa al marcador
        if(countMarker == 1)
        {
            var listener = google.maps.event.addListener(map, "idle",               function () {
                map.setZoom(14);
               google.maps.event.removeListener(listener);
            });
        }
        
        //agrego al array de marcadores por si elijen guardar
        var p = {
            "lat" : lat,
            "lng": lng,
            "nombre": nombre 
        }

        puntos.push(p);

        console.log(puntos);

    }
    else{
        $("#divError").html("Debe ingresar latitud y longitud numericas validas");
         $("#divError").show();
                            
    }
    
    
}

function validar(lat,lng){
    console.log(isNaN(lat));
    console.log(isNaN(lng));
    if(lat == "" || lng == "")
    {
        console.log("retorno falso");
        return false;
    }
    else 
    {
        console.log("retorno true");
        return true;
    }
}

function guardar(){
    var parametros = {
                "valorCaja1" : "fjfj"
        };
    
    var promise = $.ajax
	                ({
	                type: "POST",
	                url: "nexoAjax.php",
	                data: ({"marcadores" : puntos}),
	                cache: false,
	                dataType: "text"
	              });// fin del ajax
    
    promise.done(function (dato){
        alert(dato);
    });
}

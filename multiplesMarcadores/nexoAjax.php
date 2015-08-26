<?php

 // array de respuesta
$jsondata = array();
// Mensaje de exito o error
$jsondata["message"] = "ok";

if(isset($_FILES['fichero']))
	{
		if(!$_FILES['fichero']['error'])
		{
			//echo "cargó";
			//echo "<br>";
			$NOMEXT=explode(".", $_FILES['fichero']['name']);
			$EXT=end($NOMEXT);
			$arrayDeExtValida = array("txt", "xls", "xlsx");  //defino antes las extensiones que seran validas

			if(!in_array($EXT, $arrayDeExtValida))
			{
				$jsondata["message"] =  "Error: archivo de extension inválida";
				echo json_encode($jsondata);
			}
			else
			{
    			$tamanio=$_FILES['fichero']['size'];
    			if($tamanio>10024000)
    			{
    				$jsondata["message"] = "Error: archivo muy grande!";
    				echo json_encode($jsondata);
    			}
    			else
    			{
    				
    				if($EXT == "txt")
    				{
	        			//Leo el archivo para obtener un array de los marcadores
	        			
	        			$file = fopen($_FILES['fichero']['tmp_name'], "r");
	                    
	                    
	                    $jsondata["puntos"] = array();
	                    
	                    while(!feof($file))
	                    {
	                        $linea = explode(">", fgets($file));
	                        $objeto = new stdClass();
	                        $objeto->lat = $linea[0];
	                        $objeto->lng = $linea[1];
	                        $objeto->nombre = $linea[2];
	                        $objeto->direccion = "";
	                        $objeto->codPostal = "";
	                        
	                        array_push($jsondata["puntos"], $objeto);
	                    }
	                        fclose($file);
    				}
    				else 
    				{
   						//Es un .xls o .xlsx
   						$jsondata["message"] = "Implementar lectura de Excel";
   						
    				}
    				//envio como espuesta el array conteniendo array de marcadores
					echo json_encode($jsondata);
    			}
			}
		}
		else
		{
			$jsondata["message"] =  "Error: ".$_FILES['fichero']['error'];
			echo json_encode($jsondata);
		}
	}
	else
	{
		$jsondata["message"] = "Error: No cargo archivo";
		echo json_encode($jsondata);
	}

?>
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
                    require_once '../clases/Marcador.php';
                    
    				if($EXT == "txt")
    				{
                        $jsondata["puntos"] = Marcador::leerMarcadoresTxt($_FILES['fichero']['tmp_name']);
                        
    				}
    				else 
    				{
   						//Es un .xls o .xlsx
   						//$jsondata["message"] = "Implementar lectura de Excel";
                        require_once '../Excel/reader.php';
                        
                        $jsondata["puntos"] = Marcador::leerMarcadoresExcel($_FILES['fichero']['tmp_name']);
						 						
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
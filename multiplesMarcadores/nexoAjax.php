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
    				$jsondata["puntos"] = array();
    				if($EXT == "txt")
    				{
	        			//Leo el archivo para obtener un array de los marcadores
	        			
	        			$file = fopen($_FILES['fichero']['tmp_name'], "r");

	                    while(!feof($file))
	                    {
	                    	$linea = trim(fgets($file));
        					if(!empty($linea))
        					{
		                        $linea = explode(">", $linea);
		                        $objeto = new stdClass();
		                        $objeto->lat = $linea[0];
		                        $objeto->lng = $linea[1];
		                        $objeto->nombre = $linea[2];
		                        $objeto->direccion = "";
		                        $objeto->codPostal = "";
		                        
		                        array_push($jsondata["puntos"], $objeto);
        					}
	                    }
	                        fclose($file);
    				}
    				else 
    				{
   						//Es un .xls o .xlsx
   						//$jsondata["message"] = "Implementar lectura de Excel";
   						
   						require_once '../Excel/reader.php';

						$data = new Spreadsheet_Excel_Reader();
						$data->setOutputEncoding('CP1251');
						$data->read($_FILES['fichero']['tmp_name']);

						//Se comienza de indice 2 para un excel donde la primera row sea los titulos de las columnas
						for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) 
						{
						    $objeto = new stdClass();
	                        $objeto->lat = $data->sheets[0]['cells'][$i][1];
	                        $objeto->lng = $data->sheets[0]['cells'][$i][2];
	                        $objeto->nombre = $data->sheets[0]['cells'][$i][3];
	                        $objeto->direccion = $data->sheets[0]['cells'][$i][4];
	                        $objeto->codPostal = $data->sheets[0]['cells'][$i][5];
							
						 	array_push($jsondata["puntos"], $objeto);
						 }

   						
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
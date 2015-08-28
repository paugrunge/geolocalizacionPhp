<?php

class Marcador
{
    
    public $lat;
    public $lng;
    public $nombre;
    public $direccion;
    public $codPostal;
    
    public function __construct()
    {
        $this->lat = 0;
        $this->lng = 0;
        $this->nombre = "";
        $this->direccion= "";
        $this->codPostal = "";    
    }
    
    public static function leerMarcadoresTxt($fichero)
    {
        //Leo el archivo para obtener un array de los marcadores
        $leidos = array();
        $file = fopen($fichero, "r");

        while(!feof($file))
        {
            $linea = trim(fgets($file));
            if(!empty($linea))
            {
                $objeto = new Marcador();
                $linea = explode(">", $linea);
                $objeto->lat = $linea[0];
                $objeto->lng = $linea[1];
                $objeto->nombre = $linea[2];
                $objeto->direccion = "";
                $objeto->codPostal = "";

                array_push($leidos, $objeto);
            }
        }
        fclose($file);
        return $leidos;
    }
    
    public static function leerMarcadoresExcel($fichero)
    {
        $leidos = array();
        
        $data = new Spreadsheet_Excel_Reader();
        $data->setOutputEncoding('CP1251');
        $data->read($fichero);

        //Se comienza de indice 2 para un excel donde la primera row sea los titulos de las columnas
        for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) 
        {
            $objeto = new Marcador();
            $objeto->lat = $data->sheets[0]['cells'][$i][1];
            $objeto->lng = $data->sheets[0]['cells'][$i][2];
            $objeto->nombre = $data->sheets[0]['cells'][$i][3];
            $objeto->direccion = $data->sheets[0]['cells'][$i][4];
            $objeto->codPostal = $data->sheets[0]['cells'][$i][5];

            array_push($leidos, $objeto);
         }
        return $leidos;
    }
    
    public static function descargarTxt($fichero)
    {
        $basefichero = basename($fichero);
          
          header("Content-Type: application/octet-stream");
          header("Content-Length: ".filesize($fichero));
          header("Content-Disposition: attachment; filename=".$basefichero."");
          readfile($fichero);
    }
}
?>
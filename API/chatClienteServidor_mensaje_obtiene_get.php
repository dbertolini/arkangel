<?php
	header('Access-Control-Allow-Origin: *');
	header("Content-type: application/json");
	
	include("config.php");	

	$enlace = mysqli_connect($dbServer, $dbUser, $dbPass, $dbName, $dbPort);
	if (!$enlace)
		exit;
	
	$consulta = "SELECT idMensaje, mensaje, nickname FROM mensaje;";		
	
	$result = mysqli_query($enlace, $consulta);

	while($row = mysqli_fetch_array($result)) 
	{ 
		$idMensaje=$row['idMensaje'];
		$mensaje=$row['mensaje'];
		$nickname=$row['nickname'];

		$arrMensaje[] = array('idMensaje'=> $idMensaje,
							'mensaje'=> $mensaje,
							'nickname'=> $nickname);
	}
		
	mysqli_close($enlace);
	if(!(isset($arrMensaje)) || is_null($arrMensaje))
	{
		echo json_encode(array('retorno' => 'NULL'));
	}
	else
	{
		$json_string = json_encode($arrMensaje);
		echo $json_string;
	}	



?>
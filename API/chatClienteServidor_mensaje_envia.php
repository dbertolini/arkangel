<?php
	header('Access-Control-Allow-Origin: *');
	header("Content-type: application/json");
	
	include("config.php");	
							
	if(isset($_POST["paramNickname"]) 
    && isset($_POST["paramMensaje"])
    && isset($_POST["paramSis"])
&& $_POST["paramSis"]=="dab")
	{	
		$enlace = mysqli_connect($dbServer, $dbUser, $dbPass, $dbName, $dbPort);
		if (!$enlace)
			exit;
		
		$consulta = "INSERT INTO mensaje (mensaje, nickname) VALUES ('".$_POST["paramMensaje"]."','".$_POST["paramNickname"]."');";		


        
		if($result = mysqli_query($enlace, $consulta))
		{			
			echo json_encode(array('retorno' => 'OK'));
		}
		else
		{
			echo json_encode(array('retorno' => 'ERROR'));
		}

		mysqli_close($enlace);	
	}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Jezzy</title>
    <!--charset-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!--tipo de dispositivo para wiew-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--icone-->
    <link rel="shortcut icon" href="img/icons/favicon.ico">
    <!--jquery-->
    <script src="lib/jquery/jquery-2.1.4.min.js"></script>
    <!--bootstrap-->
    <script src="lib/bootstrap/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css">
    <!--jasny-bootstrap-->
    <script src="lib/jasny-bootstrap/js/jasny-bootstrap.min.js"></script>
    <link rel="stylesheet" href="lib/jasny-bootstrap/css/jasny-bootstrap.min.css">
    <!--jquery storage-->
    <script src="lib/jquery/jquery.base64.js"></script>
    <script src="js/page/base.js"></script>
    <script src="lib/jquery-storage/jquery.cookie.js"></script>
    <script src="lib/jquery-storage/jquery.storageapi.min.js"></script>
    <!--jquery confirm-->
    <script src="lib/jquery-confirm/js/jquery-confirm.min.js"></script>
    <link rel="stylesheet" href="lib/jquery-confirm/css/jquery-confirm.min.css">
    <!--biblioteca json-->
    <script src="lib/jquery-storage/json2.js"></script>
    <!--base-->
    <link rel="stylesheet" href="css/page/base.css">

    <!--momentjs-->
    <script src="lib/momentjs/moment.js"></script>

    <script src="js/page/contactcompany.js"></script>
    <link rel="stylesheet" href="css/page/contactcompany.css">
</head>
<body  class="fadeIn">
<?php
	$cookie = json_decode($_COOKIE['User'], true);
	$user = $cookie['name']; 
	$page = 'home';
	include  'php/Menu/Menu.php';	
?>
<div class="container">
   <?php
	$title = 'CONVIDE O MEU SALÃO';
	include 'php/Menu/Title.php';
   ?>

    <div id="conteudo">
        <div class='bottomLine1'></div>
            <div class="row rowinput " id="rowPageCompanys">
                <div class="col-xs-12 newAddressInfo marginTop5 marginBottom5 bottomLineBottom" id="companyListNames2">
                    <input class="form-control transparent-input" type='text' name='name' placeholder="NOME DO CONTATO*" value = "" id="nameinput"  required>
                </div>
            </div>
            <div class="row rowinput" id="rowPageCompanys11">
                <div class="col-xs-12 newAddressInfo marginTop5 marginBottom5 bottomLineBottom" id="tel">
                    <input class="form-control transparent-input  telefone" type='text' name='tel' placeholder="TELEFONE*" value = "" id="tel2" required/>

                </div>
            </div>
			<div class="row rowinput" id="rowPageCompanys11">
                <div class="col-xs-12 newAddressInfo marginTop5 marginBottom5 bottomLineBottom" id="telce1">
                    <input class="form-control transparent-input  telefone" type='text' name='telcel' placeholder="TELEFONE CELULAR" value = "" id="telcel"/>

                </div>
            </div>

            <div class="row rowinput" id="rowPageCompanys9">
                <div class="col-xs-12 newAddressInfo marginTop5 marginBottom5 bottomLineBottom" id="companyListNames9">
                    <input class="form-control transparent-input " type='email' name='email' placeholder="EMAIL DO SALÃO" autocomplete="off"  value = "" id="email">
                </div>
            </div>
            <div class="row rowinput" id="rowPageCompanys4">
                <div class="col-xs-12 newAddressInfo marginTop5 marginBottom5 bottomLineBottom" id="companyListNames4">
                    <input class="form-control transparent-input " type="text" name='text' placeholder="NOME DO SALÃO" autocomplete="off" value = "" id="password" >
                </div>
            </div>
            </br>
            <span class="pull-right" style="margin-right: 4px; color: grey">* Campos de preenchimento obrigatório</span>
            </br>
            </br>
            <button class="btn btn-info btn-block btnbottom" id="IndicationConfirm" name="Submit" >
                ENVIAR
            </button>

    </div>


</div>

</body>
</html>

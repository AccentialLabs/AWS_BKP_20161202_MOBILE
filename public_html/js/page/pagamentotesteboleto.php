
<?php

header('Content-Type: text/html; charset=utf-8');

require("../../lib/phpmailer/PHPMailerAutoload.php");
require '../../vendor/moip/vendor/autoload.php';
require("../../php/configuracao.php"); //pega as configurações globais de endereços


use Moip\Moip;
use Moip\MoipBasicAuth;


$token =  $token_moip;
$key = $key_moip;
$cookie = json_decode($_COOKIE['User'], true); //cookie usuario completo
$cookieoffer = json_decode($_COOKIE['Offer'], true);//cookie oferta completo
$title = $cookieoffer['title'];
$user_id = $cookie['id'];


$secondary_user_id = ($_POST['ComissionedSecondaryUser']);


if(!empty($secondary_user_id)){
$ComissionedSecondaryUser = $secondary_user_id;
}else{
$ComissionedSecondaryUser = 0;
}
setCPF($_POST['taxdocumentboleto'], $user_id, $api);

function setCPF($CPF, $user_id, $api){
	
	$params = array(
    'User' => array(
            'query' => 'UPDATE users SET cpf = "'.$CPF.'" WHERE id = '.$user_id.';', //
        )
    );


$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

curl_close($curl);

}

function setErro($txterro, $user_id, $date, $line, $page, $api){
	$params = array(
		'User' => array(
            'query' => 'INSERT INTO errors_log (descricao, user_id, date,cod_line) VALUES ("'.$txterro.'", '.$user_id.', "'.$date.'", '.$line.', '.$page.')'
             )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

curl_close($curl);
											
header('Location: https://secure.jezzy.com.br/jezzy-mobile/public_html/erro.html');
}



$moip = new Moip(new MoipBasicAuth($token, $key), Moip::ENDPOINT_PRODUCTION);

if($cookieoffer['company_id']!=99999){ //se a companhia for diferente de 99999 IF 1
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM companies Company WHERE Company.id = '.$cookieoffer['company_id'], //pesquisar companhia da oferta
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

$json = base64_decode($data);

$array = json_decode($json, true);

$split = 100;
$moip_id = ($array[0]['Company']['moip_id']); //adiciona moip_id da companhia dona da oferta
$salao = ($array[0]['Company']['fancy_name']); //adiciona nome da companhia dona da oferta
$salaoaddress = ($array[0]['Company']['address']);
$salaonumber = ($array[0]['Company']['number']);
$salaocomplement = ($array[0]['Company']['complement']);
$salaocity =($array[0]['Company']['city']);
$salaodistrict = ($array[0]['Company']['district']);
$salaostate = ($array[0]['Company']['state']);
$salaozip_code = ($array[0]['Company']['zip_code']);
$workdays = ($array[0]['Company']['work_days']);
$open_hour = ($array[0]['Company']['open_hour']);
$end_hour = ($array[0]['Company']['close_hour']);

curl_close($curl);

}else{ //se a companhia for igual a 99999 IF 1

$params = array(
    'User' => array(
            'query' => 'SELECT * FROM companies_users WHERE user_id = '.$cookie['id'].' and status = "ACTIVE"', // pesquisa companhia favorita do usuario
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

if(!empty($data)){ // IF 0
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM favorites_companies WHERE user_id = '.$cookie['id'], // pesquisa companhia favorita do usuario
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

if(!empty($data)){ //IF 2 se o usuario tiver uma companhia favorita

  $json = base64_decode($data);
  $array = json_decode($json, true);

  $company = $array[(count($array)/1)-1]['favorites_companies']['company_id'];

  $params = array(
      'User' => array(
              'query' => 'SELECT * FROM companies Company WHERE Company.id = '.$company,
          )
      );

  $postData = json_encode($params);
  $postData = array(
      'params' => $postData
  );

  ///START GENERATE TOKEN
  $timestamp = time();
  $array = array(
      'secureNumbers' => $timestamp
  );
  $json = json_encode($array);
  $token = base64_encode($json);
  ///END GENERATE TOKEN

  $url_api = "https://".$api."/users/get/query/" . $token;

  $curl = curl_init($url_api);

  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

  $data = curl_exec($curl);
  $json = base64_decode($data);
  $array = json_decode($json, true);
  $split = ($array[0]['Company']['percentage_split']);
  $commid = ($array[0]['Company']['id']);
  $moip_id = ($array[0]['Company']['moip_id']);
   $salao = ($array[0]['Company']['fancy_name']);
$salaoaddress = ($array[0]['Company']['address']);
$salaonumber = ($array[0]['Company']['number']);
$salaocomplement = ($array[0]['Company']['complement']);
$salaocity =($array[0]['Company']['city']);
$salaodistrict = ($array[0]['Company']['district']);
$salaostate = ($array[0]['Company']['state']);
$salaozip_code = ($array[0]['Company']['zip_code']);

$workdays = ($array[0]['Company']['work_days']);
$open_hour = ($array[0]['Company']['open_hour']);
$end_hour = ($array[0]['Company']['close_hour']);

  if($cookieoffer['parcels']!='INACTIVE'){ //IF 3 se a oferta puder ser parcelada
  if($_POST['parcels'] == ''){ // IF 4 se as parcelas não estiverem preenchidas
  $parcels = 1;
  }else{ //IF 4
  $parcels = $_POST['parcels'];
  }
  }else{//IF 3


  $parcels = 1;
  }
  curl_close($curl);




$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_extra_infos WHERE offer_id = '.$cookieoffer['id'],
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);
$offer_type = $array[0]['offers_extra_infos']['offer_type'];

if($split == NULL){
$split = ($array[0]['offers_extra_infos']['percentage_split']);
}
curl_close($curl);


}else{// IF 2
     $split = 0;
 }
curl_close($curl);
}else{
     $split = 0;
     $commid = 0;
}
}

if($split == NULL){
$split = 0;
}


$offerprice = $cookieoffer['value'];

$result = str_replace(".", "", $offerprice);
$percentage = $cookieoffer['percentage_discount']/1;

$desconto = ($offerprice / 100) * (100 - $percentage);
$offerfrete = $_COOKIE['shipping_value'];
$resultfrete = str_replace("R$", "", $offerfrete);
$resultfrete3 = str_replace(",", "", $resultfrete);
$resultoffertotal  = str_replace("R$", "", $_COOKIE['total_value']);
$total_value = str_replace(",", ".", $resultoffertotal);
$offerunit = $desconto;

$resultunit = str_replace(".", "", $offerunit);

$desconto =  number_format($desconto, 2);

$desconto = str_replace(".", "",$desconto);


$uniqid = uniqid();


if(empty($commid)){
$commid = 0;
}
if($cookieoffer['company_id'] == 99999){
$postData = array(
        'offerId' =>$cookieoffer['id'],
        'shippingValue'=>$resultfrete3,
        'companyId'=>$commid,
        'partes'=>3,
        'qtdprodutos'=>$_COOKIE['quantidade'],
        'comissioned_secondary_user'=> $ComissionedSecondaryUser
    );



$url_api = "https://secure.jezzy.com.br/jezzy-master/portal/MasterSale/calculateFinancialsResult";

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

$data = json_decode($data);

curl_close($curl);
$tot_distrib = str_replace(".","",$data[1]);
$moip_id2=$data[2];
$idfinancialparameterresults = $data[0];
$json =  '{"ownId": "'.$uniqid.'","amount": {"currency": "BRL","subtotals": {"shipping": '.$resultfrete3.'}},"items": [{"product": "'.$cookieoffer["title"].'","quantity": '.$_COOKIE["quantidade"].',"detail": "'.substr(strip_tags($cookieoffer["resume"]), 0, 249).'","price": '.$desconto.'}],"receivers":[{"moipAccount": {"id": "'.$moip_id.'"},"type": "SECONDARY","amount": {"percentual": '.$split.'}},{"moipAccount": {"id": "'.$moip_id2.'"},"type": "SECONDARY","amount": {"fixed": '.$tot_distrib.'}}],"customer": {"ownId": "'.uniqid().'","fullname": "'.$cookie["name"].'","email": "'.$cookie["email"].'","birthDate": "'.$cookie["birthday"].'","taxDocument": {"type": "CPF","number": "'.$_POST["taxdocumentboleto"].'"},"phone": {"countryCode": "55","areaCode": "11","number": "66778899"},"shippingAddress": {"street":  "'.$_COOKIE["address"].'",  "streetNumber": '.$_COOKIE["number"].',"complement": "'.$_COOKIE["complement"].'","district": "'.$_COOKIE["district"].'","city":  "'.$_COOKIE["city"].'","state":  "'.$_COOKIE["state"].'",   "country": "BRA","zipCode": "'.$_COOKIE["zip_code"].'"}    }   }';
}else{
$json =  '{"ownId": "'.$uniqid.'","amount": {"currency": "BRL","subtotals": {"shipping": '.$resultfrete3.'}},"items": [{"product": "'.$cookieoffer["title"].'","quantity": '.$_COOKIE["quantidade"].',"detail": "'.substr(strip_tags($cookieoffer["resume"]), 0, 249).'","price": '.$desconto.'}],"receivers":[{"moipAccount": {"id": "'.$moip_id.'"},"type": "SECONDARY","amount": {"percentual": '.$split.'}}],"customer": {"ownId": "'.uniqid().'","fullname": "'.$cookie["name"].'","email": "'.$cookie["email"].'","birthDate": "'.$cookie["birthday"].'","taxDocument": {"type": "CPF","number": "'.$_POST["taxdocumentboleto"].'"},"phone": {"countryCode": "55","areaCode": "11","number": "66778899"},"shippingAddress": {"street":  "'.$_COOKIE["address"].'",  "streetNumber": '.$_COOKIE["number"].',"complement": "'.$_COOKIE["complement"].'","district": "'.$_COOKIE["district"].'","city":  "'.$_COOKIE["city"].'","state":  "'.$_COOKIE["state"].'",   "country": "BRA","zipCode": "'.$_COOKIE["zip_code"].'"}    }   }';
}


                                        $header = array();
										$header[] = 'Content-type: application/json';
										$header [] = "Authorization: Basic Sks3NVY2VUdLWVlVWlIySUNWSEpTU0xENjg3VUVKOUg6MTFQQjRGUE42OE0xRkU4TUFQV1VESU1FSEZJR004UDZETVNCTlhaWg==";
										$auth = 'Sks3NVY2VUdLWVlVWlIySUNWSEpTU0xENjg3VUVKOUg6MTFQQjRGUE42OE0xRkU4TUFQV1VESU1FSEZJR004UDZETVNCTlhaWg==';
                                        // URL do SandBox - Nosso ambiente de testes
                                        // $url = "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/PreCadastramento";
                                        $url = "https://api.moip.com.br/v2/orders";

                                        $curl = curl_init();
                                        curl_setopt($curl, CURLOPT_URL, $url);

                                        // header que diz que queremos autenticar utilizando o HTTP Basic Auth
                                        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

                                        // informa nossas credenciais
                                        curl_setopt($curl, CURLOPT_USERPWD, $auth);
                                        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                                        curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/4.0");
                                        curl_setopt($curl, CURLOPT_POST, true);

                                        // Informa nosso XML de instru��o
                                        curl_setopt($curl, CURLOPT_POSTFIELDS, $json);

                                        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                                        // efetua a requisi��o e coloca a resposta do servidor do MoIP em $ret
                                        $ret = curl_exec($curl);
										
                                        $err = curl_error($curl);
                                        $err = curl_error($curl);
										$data = new DateTime();
										$dn = $data -> format("Y-m-d");
                                        curl_close($curl);
										if($err){
											$textoerro = ("erro ao criar pedido do moip");	
											setErro($textoerro, $cookie['id'], $dn, 415, "pagamentotesteboleto", $api);
										}


                        $jObj = json_decode($ret);
                        $expiration = $data -> add(new DateInterval('P3D')) -> format("Y-m-d");

        $json = '{
            "installmentCount": 1,
            "fundingInstrument": {
              "method": "BOLETO",
              "boleto": {
                  "expirationDate": "'.$expiration.'",
                  "logoUri": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xtl1/v/t1.0-9/12742330_214925868856852_2120169749048167775_n.png?oh=564e1ca91b7a2c0b024163ddca8249b9&oe=5754342C&__gda__=1465729169_01ccb691f907085f85c442f605615fb3"
              }
            }
          }';

										$header = array();
										$header[] = 'Content-type: application/json';
										$header [] = "Authorization: Basic Sks3NVY2VUdLWVlVWlIySUNWSEpTU0xENjg3VUVKOUg6MTFQQjRGUE42OE0xRkU4TUFQV1VESU1FSEZJR004UDZETVNCTlhaWg==";
										$auth = 'Sks3NVY2VUdLWVlVWlIySUNWSEpTU0xENjg3VUVKOUg6MTFQQjRGUE42OE0xRkU4TUFQV1VESU1FSEZJR004UDZETVNCTlhaWg==';
                                        // URL do SandBox - Nosso ambiente de testes
                                        // $url = "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/PreCadastramento";
                                        $url = "https://api.moip.com.br/v2/orders/".$jObj->id."/payments";

                                        $curl = curl_init();
                                        curl_setopt($curl, CURLOPT_URL, $url);

                                        // header que diz que queremos autenticar utilizando o HTTP Basic Auth
                                        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

                                        // informa nossas credenciais
                                        curl_setopt($curl, CURLOPT_USERPWD, $auth);
                                        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                                        curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/4.0");
                                        curl_setopt($curl, CURLOPT_POST, true);

                                        // Informa nosso XML de instru��o
                                        curl_setopt($curl, CURLOPT_POSTFIELDS, $json);

                                        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                                        // efetua a requisi��o e coloca a resposta do servidor do MoIP em $ret
                                        $ret = curl_exec($curl);
										
                                        $err = curl_error($curl);
                                        $err = curl_error($curl);
										$data = new DateTime();
										$dn = $data -> format("Y-m-d");
                                        curl_close($curl);
										if($err){
											$textoerro = ("erro ao criar pagamento do moip");	
											setErro($textoerro, $cookie['id'], $dn, 502, "pagamentotesteboleto", $api);
										}

										$objeto  = json_decode($ret);
										$link = $objeto->_links->payBoleto->redirectHref;
										$resultfrete2 = str_replace(",", ".", $resultfrete);
										$secondary_receiver_pay = ($total_value/100)*$split;



    $params = array(
    'User' => array(
            'query' => 'INSERT INTO checkouts (user_id, company_id, payment_method_id,offer_id,payment_state_id, unit_value,total_value,amount, shipping_value, shipping_type,delivery_time,metrics,address, city, zip_code, state, district, number, complement,date,  transaction_moip_code, installment, boleto_link, secondary_receiver_pay, commissioned_company_id, comissioned_secondary_user_id, order_id) VALUES ('.$cookie['id'].','.$cookieoffer['company_id'].', 73,'.$cookieoffer['id'].',2,"'.$offerunit.'","'.$total_value.'", '.$_COOKIE['quantidade'].' ,"'.$resultfrete2.'", '.$_COOKIE['shipping_type'].' , '.$_COOKIE['shipping_days'].', "'.$_COOKIE['metrics'].'", "'.$_COOKIE['address'].'", "'.$_COOKIE['city'].'",'.$_COOKIE['zip_code'].' ,"'.$_COOKIE['state'].'" , "'.$_COOKIE['district'].'", '.$_COOKIE['number'].', "'.$_COOKIE['complement'].'","'.$dn.' 00:00:00","'.$uniqid.'", 1, "'.$link.'", "'.$secondary_receiver_pay.'", '.$commid.', '.$ComissionedSecondaryUser.', "'.$jObj->id.'")'
             )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

curl_close($curl);
$newquantity = ($cookieoffer['amount_allowed']/1)-($_COOKIE['quantidade']/1);
$date = getdate(strtotime("+7 day"));
$d = $date[mday];
$m = $date[mon];
$y = $date[year];
$date = $y."-".$m."-".$d;
if($newquantity == 0){
	
$params = array(
    'User' => array(
            'query' => 'UPDATE offers SET amount_allowed = '.$newquantity.' WHERE id =  '.$cookieoffer['id'],
             )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

curl_close($curl);
}else{
	
$params = array(
    'User' => array(
            'query' => 'UPDATE offers SET amount_allowed = '.$newquantity.', ends_at = "'.$date.'" WHERE id =  '.$cookieoffer['id'],
             )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

curl_close($curl);
}



$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_extra_infos WHERE offer_id = '.$cookieoffer['id'],
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);
$offer_type = $array[0]['offers_extra_infos']['offer_type'];




$params = array(
    'User' => array(
                'query' =>'SELECT * FROM checkouts WHERE transaction_moip_code = "'.$uniqid.'";'
        )
    );


$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl2 = curl_init($url_api);
curl_setopt($curl2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl2, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl2, CURLOPT_POST, 1);
curl_setopt($curl2, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl2);

$jsonCheck = base64_decode($data);
$arrayCheck = json_decode($jsonCheck, true);
$checkout_id = $arrayCheck[0]['checkouts']['id'];

$payment_method_id =  $arrayCheck[0]['checkouts']['payment_method_id'];
curl_close($curl2);


$params = array(
    'User' => array(
            'query' => 'UPDATE financial_parameters_results SET checkout_id = '.$checkout_id. ' WHERE id = '.$idfinancialparameterresults
             )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

curl_close($curl);


if($offer_type == 'PRODUCT'){

    $order2 = $jObj->id;
    //$order2 = ($moip->orders()->get($jObj->id)); //LAST MODIFICATION
  $email =  $jObj->customer->email;

  $expirationdate = $objeto->fundingInstrument->boleto->expirationDate;

  $link = $objeto->_links->payBoleto->redirectHref;

  $time =  strtotime($expirationdate);
  $newformat = date('d/m/Y',$time);

}else{
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_services WHERE offer_id = "'.$cookieoffer['id'].'";'
        )
    );

$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);
$json = base64_decode($data);
$array = json_decode($json, true);

$service_id =$array[0]['offers_services']['service_id'];

curl_close($curl);

$params = array(
    'User' => array(
                'query' =>'SELECT * FROM checkouts WHERE transaction_moip_code = "'.$uniqid.'";'
        )
    );


$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl2 = curl_init($url_api);
curl_setopt($curl2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl2, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl2, CURLOPT_POST, 1);
curl_setopt($curl2, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl2);

$jsonCheck = base64_decode($data);
$arrayCheck = json_decode($jsonCheck, true);
$checkout_id = $arrayCheck[0]['checkouts']['id'];

curl_close($curl2);


$params = array(
    'User' => array(
     'query' => 'INSERT INTO services_vouchers(company_id, offer_id, service_id, user_id, pre_scheduled_date, pre_scheduled_hour, acquisition_date, status, checkout_id) VALUES('.$cookieoffer['company_id'].', '.$cookieoffer['id'].', '.$service_id.', '.$cookie['id'].', "", "", "'.$dn.'", "CREATED", '.$checkout_id.')'
        )
    );


$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

curl_close($curl);

$params = array(
    'User' => array(
     'query' => 'INSERT INTO checkouts_services(checkout_id, service_id) VALUES('.$checkout_id.', '.$service_id.');'
        )
    );


$postData = json_encode($params);
$postData = array(
    'params' => $postData
);

///START GENERATE TOKEN
$timestamp = time();
$array = array(
    'secureNumbers' => $timestamp
);
$json = json_encode($array);
$token = base64_encode($json);
///END GENERATE TOKEN

$url_api = "https://".$api."/users/get/query/" . $token;

$curl = curl_init($url_api);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

$data = curl_exec($curl);

curl_close($curl);

  $order2 = $moip->orders()->get($jObj->id);
  $email = $jObj->customer->email;
  $expirationdate = $objeto->fundingInstrument->boleto->expirationDate;
  $link = $objeto->_links->payBoleto->redirectHref;

$time =  strtotime($expirationdate);
$newformat = date('d/m/Y',$time);
}
if(empty($salaocomplement)){
	$salaocomplement = " ";
}

if(!empty($_COOKIE['complement'])){
 $array = array(
    'uniqid' => $uniqid,
    'productype' => $offer_type,
    "transaction" => $transaction,
    "title" => $title,
	"email" => $email,
	"payment_method_id" => $payment_method_id,
	"total_value" => $total_value,
	"dn" => $dn,
	"new_format" => $newformat,
	"boletoemail" => $email,
	"boletoresultfrete2" => $resultfrete2,
	"boletodesconto" => $desconto,
	"boletooffertype" => $offer_type,
	"boletototalvalue" => $total_value,
	"boletosalao" => $salao,
	"boletotitle" => $title,
	"boletodistrict" => $_COOKIE['district'],
	"boletozipcode" => $_COOKIE['zip_code'],
	"boletocity" => $_COOKIE['city'],
	"boletocomplement" => $_COOKIE['complement'],
	"boletoaddress" => $_COOKIE['address'],
	"boletostate" => $_COOKIE['state'],
	"boletonumber" => $_COOKIE['number'],
	"boletoofferid" => $cookieoffer['id'],
	"boletolink" => $link,
	"salaoaddress" => $salaoaddress,
	"salaonumber" => $salaonumber,
	"salaocomplement" => $salaocomplement,
	"salaocity" => $salaocity,
	"salaodistrict" => $salaodistrict,
	"salaostate" => $salaostate,
	"salaozip_code" => $salaozip_code,
	  "workdays" => $workdays,
	  "open_hour" => $open_hour,
	  "end_hour" => $end_hour
);
}else{
 $array = array(
    'uniqid' => $uniqid,
    'productype' => $offer_type,
    "transaction" => $transaction,
    "title" => $title,
	"email" => $email,
	"payment_method_id" => $payment_method_id,
	"total_value" => $total_value,
	"dn" => $dn,
     "new_format" => $newformat,
      "boletoemail" => $email,
      "boletoresultfrete2" => $resultfrete2,
      "boletodesconto" => $desconto,
      "boletooffertype" => $offer_type,
      "boletototalvalue" => $total_value,
      "boletosalao" => $salao,
      "boletotitle" => $title,
      "boletodistrict" => $_COOKIE['district'],
      "boletozipcode" => $_COOKIE['zip_code'],
      "boletocity" => $_COOKIE['city'],
      "boletocomplement" => " ",
      "boletoaddress" => $_COOKIE['address'],
      "boletostate" => $_COOKIE['state'],
      "boletonumber" => $_COOKIE['number'],
      "boletoofferid" => $checkout_id,
      "boletolink" => $link,
	  "salaoaddress" => $salaoaddress,
	  "salaonumber" => $salaonumber,
	  "salaocomplement" => $salaocomplement,
	  "salaocity" => $salaocity,
	  "salaodistrict" => $salaodistrict,
	  "salaostate" => $salaostate,
	  "salaozip_code" => $salaozip_code,
	  "workdays" => $workdays,
	  "open_hour" => $open_hour,
	  "end_hour" => $end_hour
    );
}


echo json_encode($array);

?>







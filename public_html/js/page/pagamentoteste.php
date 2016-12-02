<?php
header('Content-Type: text/html; charset=utf-8');
require("../../lib/phpmailer/PHPMailerAutoload.php");
require '../../vendor/moip/vendor/autoload.php';
require '../../lib/moip-php-master/autoload.inc.php';
require("../../php/configuracao.php");

$cookie = json_decode($_COOKIE['User'], true);
$mail = new PHPMailer(true);
$email = $cookie['email'];
use Moip\Moip;
use Moip\MoipBasicAuth;

$token =  $token_moip;
$key = $key_moip;
$commid = 0;
$cookieoffer = json_decode($_COOKIE['Offer'], true);
$moip = new Moip(new MoipBasicAuth($token, $key), Moip::ENDPOINT_PRODUCTION);
if(!empty($_POST['ComissionedSecondaryUser'])){

$ComissionedSecondaryUser = $_POST['ComissionedSecondaryUser'];
}else{
$ComissionedSecondaryUser = 0;
}

$taxdocument = $_POST['taxdocument'];



$params = array(
    'User' => array(
            'query' => 'UPDATE users SET cpf = "'.$taxdocument.'" WHERE id = '.$cookie['id'], //pesquisar companhia da oferta
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


if($cookieoffer['parcels']!='INACTIVE'){
if($_POST['parcels'] == ''){
$parcels = 1;
}else{
$parcels = $_POST['parcels'];
}
}else{
$parcels = 1;
}
$customer = $moip->customers()->setOwnId(uniqid())
                           ->setFullname($cookie['name'])
                            ->setEmail($cookie['email'])
                            ->setBirthDate($cookie['birthday'])
                            ->setTaxDocument($_POST['taxdocument'])
                            ->setPhone(11, 66778899)
                             ->addAddress('BILLING',
                                           $_COOKIE['address'], $_COOKIE['number'],
                                            $_COOKIE['district'], $_COOKIE['city'], $_COOKIE['state'],
                                            $_COOKIE['zip_code'], $_COOKIE['complement']);

if($cookieoffer['company_id']!=99999){
$params = array(
    'User' => array(
            'query' => 'SELECT * FROM companies Company WHERE Company.id = '.$cookieoffer['company_id'],
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
curl_close($curl);

}else{

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
            'query' => 'SELECT * FROM favorites_companies WHERE user_id = '.$cookie['id'],
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

if(!empty($data)){
   //ULTIMA VEZ QUE MECHI NO CÓDIGO
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
  $moip_id = ($array[0]['Company']['moip_id']);
  $commid = ($array[0]['Company']['id']);
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
  $split = ($array[0]['Company']['percentage_split']);
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
    if($split ==  NULL){
        $split = ($array[0]['offers_extra_infos']['percentage_split']);
    }
        curl_close($curl);



}else{
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
$offerunit = $desconto;
$resultoffertotal  = str_replace("R$", "", $_COOKIE['total_value']);
$total_value = str_replace(",", ".", $resultoffertotal);
$resultunit = str_replace(".", "", $offerunit);
$card = $_COOKIE['instituicao'];
$hash = $_COOKIE['codigo'];
$desconto =  number_format($desconto, 2);
$desconto = str_replace(".", "",$desconto);
$resultfrete3 =str_replace(".","",  round($resultfrete3));
$uniqid = uniqid();



if($cookieoffer['company_id']== 99999){

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
if(empty($moip_id2)){
$moip_id2 = $moip_id;
}
$idfinancialparameterresults = $data[0];
$json =  '{"ownId": "'.$uniqid.'","amount": {"currency": "BRL","subtotals": {"shipping": '.$resultfrete3.'}},"items": [{"product": "'.$cookieoffer["title"].'","quantity": '.$_COOKIE["quantidade"].',"detail": "'.substr(strip_tags($cookieoffer["resume"]), 0, 249).'","price": '.$desconto.'}],"receivers":[{"moipAccount": {"id": "'.$moip_id.'"},"type": "SECONDARY","amount": {"percentual": '.$split.'}},{"moipAccount": {"id": "'.$moip_id2.'"},"type": "SECONDARY","amount": {"fixed": '.$tot_distrib.'}}],"customer": {"ownId": "'.uniqid().'","fullname": "'.$cookie["name"].'","email": "'.$cookie["email"].'","birthDate": "'.$cookie["birthday"].'","taxDocument": {"type": "CPF","number": "'.$_POST["taxdocument"].'"},"phone": {"countryCode": "55","areaCode": "11","number": "66778899"},"shippingAddress": {"street":  "'.$_COOKIE["address"].'",  "streetNumber": '.$_COOKIE["number"].',"complement": "'.$_COOKIE["complement"].'","district": "'.$_COOKIE["district"].'","city":  "'.$_COOKIE["city"].'","state":  "'.$_COOKIE["state"].'",   "country": "BRA","zipCode": "'.$_COOKIE["zip_code"].'"}    }   }';
}else{
$json =  '{"ownId": "'.$uniqid.'","amount": {"currency": "BRL","subtotals": {"shipping": '.$resultfrete3.'}},"items": [{"product": "'.$cookieoffer["title"].'","quantity": '.$_COOKIE["quantidade"].',"detail": "'.substr(strip_tags($cookieoffer["resume"]), 0, 249).'","price": '.$desconto.'}],"receivers":[{"moipAccount": {"id": "'.$moip_id.'"},"type": "SECONDARY","amount": {"percentual": '.$split.'}}],"customer": {"ownId": "'.uniqid().'","fullname": "'.$cookie["name"].'","email": "'.$cookie["email"].'","birthDate": "'.$cookie["birthday"].'","taxDocument": {"type": "CPF","number": "'.$_POST["taxdocument"].'"},"phone": {"countryCode": "55","areaCode": "11","number": "66778899"},"shippingAddress": {"street":  "'.$_COOKIE["address"].'",  "streetNumber": '.$_COOKIE["number"].',"complement": "'.$_COOKIE["complement"].'","district": "'.$_COOKIE["district"].'","city":  "'.$_COOKIE["city"].'","state":  "'.$_COOKIE["state"].'",   "country": "BRA","zipCode": "'.$_COOKIE["zip_code"].'"}    }   }';
}





                                        $header = array();
										$header[] = 'Content-type: application/json';
										$header [] = "Authorization: Basic Sks3NVY2VUdLWVlVWlIySUNWSEpTU0xENjg3VUVKOUg6MTFQQjRGUE42OE0xRkU4TUFQV1VESU1FSEZJR004UDZETVNCTlhaWg==";
										$auth = 'Sks3NVY2VUdLWVlVWlIySUNWSEpTU0xENjg3VUVKOUg6MTFQQjRGUE42OE0xRkU4TUFQV1VESU1FSEZJR004UDZETVNCTlhaWg==';
                                        // URL do SandBox - Nosso ambiente de testes
                                        // $url = "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/PreCadastramento";
                                        $url = "https://api.moip.com.br/v2/orders";

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
										if($err){
											$textoerro = ("erro ao criar pedido do moip");	
										$data = new DateTime();
										$dn = $data -> format("Y-m-d");
$params = array(
		'User' => array(
            'query' => 'INSERT INTO errors_log (descricao, user_id, date,cod_line) VALUES ("'.$textoerro.'", '.$cookie['id'].', "'.$dn.'", 403)'
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
                                        curl_close($curl);


                        $jObj = json_decode($ret);


                        $data = new DateTime();
                        $dn = $data -> format("Y-m-d");



                        $data = new DateTime();
                        $dn = $data -> format("Y-m-d");
                        $expiration = $data -> add(new DateInterval('P2D')) -> format("Y-m-d");


                        if($card=='MASTERCARD'){
							$card = 5;
                       } else if($card=='VISA'){
						$card = 3;
                       }else if($card=='AMEX'){
						$card = 7;
                       }else if($card=='DINERS'){
                     $card = 8;
                       }else if($card=='ELO'){
                      $card = 10;
                       }else if($card=='HIPERCARD'){
                      $card = 15;
                       }






 $json = '{
            "installmentCount": '.$parcels.',
            "fundingInstrument": {
            "method": "CREDIT_CARD",
                "creditCard": {
                    "number":  "'.$_POST["cardnumber"].'",
                    "expirationMonth":"'.$_POST["month"].'",
                   "expirationYear":"'.$_POST["year"].'",
                   "cvc":"'.$_POST["cvc"].'",

                 "holder": {
                   "fullname": "'.$_POST["holder"].'",
                   "birthdate": "'.explode("T", $jObj->customer->birthDate)[0].'",
                   "taxDocument": {
                     "type": "CPF",
                     "number": "'.$_POST["taxdocument"].'"
                   },
                   "phone": {
                     "countryCode": "55",
                     "areaCode": "11",
                     "number": "66778899"
                   }
                 }
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
                                        curl_close($curl);
										if($err){
											$textoerro = ("erro ao criar pagamento do moip");	
										$data = new DateTime();
										$dn = $data -> format("Y-m-d");
$params = array(
		'User' => array(
            'query' => 'INSERT INTO errors_log (descricao, user_id, date,cod_line) VALUES ("'.$textoerro.'", '.$cookie['id'].', "'.$dn.'", 532)'
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
                                        $objeto = json_decode($ret);

$resultfrete2 = str_replace(",", ".", $resultfrete);
$total = $total_value;
$descontos = round(($offerprice/100)*(100- $cookieoffer['percentage_discount']), 2);

$secondary_receiver_pay = ($descontos/100)*$split;
if(empty($commid)){
$commid = 0;
}
 if(strtoupper($card)=='MASTERCARD'){
							$card = 5;
                       } else if($strtoupper($card)=='VISA'){
						$card = 3;
                       }else if($strtoupper($card)=='AMEX'){
						$card = 7;
                       }else if($strtoupper($card)=='DINERS'){
                     $card = 8;
                       }else if($strtoupper($card)=='ELO'){
                      $card = 10;
                       }else if($strtoupper($card)=='HIPERCARD'){
                      $card = 15;
                       }
if($cookieoffer['parcels']!='INACTIVE'){
   $params = array(
       'User' => array(
               'query' => 'INSERT INTO checkouts (user_id, company_id, payment_method_id,offer_id,payment_state_id, unit_value,total_value,amount, shipping_value, shipping_type,delivery_time,metrics,address, city, zip_code, state, district, number, complement,date,  transaction_moip_code, installment, boleto_link, secondary_receiver_pay, commissioned_company_id, comissioned_secondary_user_id, order_id) VALUES ('.$cookie['id'].','.$cookieoffer['company_id'].', '.$card.','.$cookieoffer['id'].',2,"'.$descontos.'","'.$total.'", '.$_COOKIE['quantidade'].' ,"'.$resultfrete2.'", '.$_COOKIE['shipping_type'].' , '.$_COOKIE['shipping_days'].', "'.$_COOKIE['metrics'].'", "'.$_COOKIE['address'].'", "'.$_COOKIE['city'].'",'.$_COOKIE['zip_code'].' ,"'.$_COOKIE['state'].'" , "'.$_COOKIE['district'].'", '.$_COOKIE['number'].', "'.$_COOKIE['complement'].'","'.$dn.' 00:00:00","'.$uniqid.'", '.$_POST['parcels'].', "" , "'.$secondary_receiver_pay.'", '.$commid.', '.$ComissionedSecondaryUser.', "'.$jObj->id.'")'
                )
       );

}else{
$params = array(
    'User' => array(
            'query' => 'INSERT INTO checkouts (user_id, company_id, payment_method_id,offer_id,payment_state_id, unit_value,total_value,amount, shipping_value, shipping_type,delivery_time,metrics,address, city, zip_code, state, district, number, complement,date,  transaction_moip_code, installment, boleto_link, secondary_receiver_pay, commissioned_company_id, comissioned_secondary_user_id , order_id) VALUES ('.$cookie['id'].','.$cookieoffer['company_id'].', '.$card.','.$cookieoffer['id'].',2,"'.$descontos.'","'.$total.'", '.$_COOKIE['quantidade'].' ,"'.$resultfrete2.'", '.$_COOKIE['shipping_type'].' , '.$_COOKIE['shipping_days'].', "'.$_COOKIE['metrics'].'", "'.$_COOKIE['address'].'", "'.$_COOKIE['city'].'",'.$_COOKIE['zip_code'].' ,"'.$_COOKIE['state'].'" , "'.$_COOKIE['district'].'", '.$_COOKIE['number'].', "'.$_COOKIE['complement'].'","'.$dn.' 00:00:00","'.$uniqid.'", 1, "", "'.$secondary_receiver_pay.'", '.$commid.', '.$ComissionedSecondaryUser.', "'.$jObj->id.'")'
             )
    );
}


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
$transaction =  $arrayCheck[0]['checkouts']['transaction_moip_code'];
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
 $order2 = $moip->orders()->get($jObj->id);



}else{

$params = array(
    'User' => array(
            'query' => 'SELECT * FROM offers_services WHERE offer_id =  "'.$cookieoffer['id'].'";'
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
                        $data = new DateTime();
                        $dn = $data -> format("Y-m-d");
                        $expiration = $data -> add(new DateInterval('P2D')) -> format("Y-m-d");
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

/* CRIAR CHECKOUTS SERVICES
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

*/

}


 $mail->IsSMTP(); // Define que a mensagem será SMTP
 $mail->Host = $host_mailer; // Endereço do servidor SMTP
 $mail->SMTPAuth = true; // Usa autenticação SMTP? (opcional)
 $mail->Username = $host_username; // Usuário do servidor SMTP
 $mail->Password = $host_Password; // Senha do servidor SMTP

 // Define o remetente
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->From = $host_username; // Seu e-mail
 $mail->FromName = $host_from; // Seu nome

 // Define os destinatário(s)
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//$email = 'ariany_f@hotmail.com';
 $mail->AddAddress($email);
 //$mail->AddAddress('ciclano@site.net');
 //$mail->AddCC('ciclano@site.net', 'Ciclano'); // Copia
 //$mail->AddBCC('fulano@dominio.com.br', 'Fulano da Silva'); // Cópia Oculta

// Define os dados técnicos da Mensagem
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 $mail->IsHTML(true); // Define que o e-mail será enviado como HTML
 $mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)
 $quantidade = $_COOKIE["quantidade"];

if($salaocomplement != "" && $salaocomplement != " "){
		 $complementsalao  = " - ".$salaocomplement;
		}
 if($quantidade != "1"){

 $quantidade = '';
 $quantidade = $_COOKIE["quantidade"] . " unidades";
 }else{
  $quantidade = '';
 $quantidade = $_COOKIE["quantidade"] . " unidade";
 }

$diasdasemana = array();
$workdaysf = explode(",", $workdays);
foreach($workdaysf as $workday){
switch($workday){
case 'seg': 
array_push($diasdasemana, ('Segunda'));
break;	
case 'ter': 
array_push($diasdasemana, ('Terça'));
break;case 'qua': 
array_push($diasdasemana, ('Quarta'));
break;case 'qui': 
array_push($diasdasemana, ('Quinta'));
break;case 'sex': 
array_push($diasdasemana, ('Sexta'));
break;case 'sab': 
array_push($diasdasemana, ('Sábado'));
break;case 'dom': 
array_push($diasdasemana, ('Domingo'));
break;
}
}
$diasdasemana = (implode(",", $diasdasemana));

$title = $cookieoffer['title'];
$desconto = number_format($desconto / 100, 2, ',', '.');
if($offer_type == 'PRODUCT'){
    if($resultfrete2 != 0){
 if($_POST["complement"]!= " " && !empty($_POST["complement"]) && $_POST["complement"]!= "" && $_POST["complement"]!= null){
            $_POST["complement"] =  $_POST["complement"] . " - ";
            }else{
            }
$html = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$checkout_id." foi recebido!<br/>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><br/></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/products.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'>".$quantidade."<br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'><br><strong>Frete</strong></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$resultfrete2."</b></td></tr><br><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ><td colspan='4'><img src='http://www.schabla.com.br/jezzy_images/pagamento-aprovado/02.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'><span>O endereço de entrega informado/selecionado por você foi:<br/><br/><b>".($_COOKIE["address"]).", ".$_COOKIE["number"]." - ".($_COOKIE["complement"]).($_COOKIE["district"])."<br/>CEP ".$_COOKIE["zip_code"]." - ".($_COOKIE["city"])." - ".($_COOKIE["state"])."</b></span></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-recebemos-pedido/06.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
 }else{
$html = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/statuscomimagensalteradas/produto-salao-pedido_03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$checkout_id." foi recebido!<br/>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><br/></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/products.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'>".$quantidade."<br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/statuscomimagensalteradas/produto-salao-retirar_05.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'>O(s) produto(s) deve(m) ser retirado(s) no próprio salão: <b>".$salao."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'><br><b>".$salaoaddress.", ".$salaonumber." ".$complementsalao." - ".$salaodistrict." </b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'><b>CEP ".$salaozip_code." - ".$salaocity." - ".$salaostate."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'><br>Dias e Horários de funcionamento</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'>".$diasdasemana.", das ".$open_hour." as ".$end_hour."</td></tr><tr></tr><tr></tr><tr></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
 }
 }
else{
  $html = "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'><table border='0' cellpadding='0' cellspacing='0'  ><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/01.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/status-aguardando-pagamento/02.jpg'  style='vertical-align: bottom;'/></td></tr><tr><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/statuscomimagensalteradas/servicos-salao-pedido_03.jpg'  style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 14px;  color: #9B9B9B;  background: #f2f2f2; text-align: center;'><td colspan='4'><br/><br/>Seu pedido ".$checkout_id." foi recebido!<br/>Esperamos que esteja satisfeito com nossos serviços e que aproveite sua aquisição.<br/><br/><br/></td></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/ImgsEmail/services.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'>".$title."</td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/><hr/></td><td  style='width: 200px; text-align: center;'><b>R$".$desconto."</b></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td style='width: 200px; text-align: center;'></td><td colspan='2' style='text-align: center; font-size: 10px; width: 400px;'><br/></td><td  style='width: 200px; text-align: center;'><b><span style='font-size: 20px;'>R$".$total_value."</span></b></td></tr><tr ></tr><tr style=''><td colspan='4'><img src='https://secure.jezzy.com.br/uploads/Emails/files/statuscomimagensalteradas/servicos-salao-voucher_05.jpg' width='800' style='vertical-align: bottom;'/></td></tr><tr style='font-family: Helvetica, Arial, sans-serif; font-size: 12px;  color: #9B9B9B; background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'>Quando o status do pedido estiver como \"<b>Voucher Disponível</b>\", acesse o aplicativo na opção \"<b>Meus Vouchers</b>\"</br> para realizar o agendamento do Serviço adquirido.</td></tr><tr></tr><tr style='background: #f2f2f2;'><td colspan='4' style='font-size: 14px; color: #9B9B9B; font-family: Helvetica, Arial, sans-serif; padding-left: 40px;'></td></tr><tr></tr><tr><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/07.jpg' width='200' style='vertical-align: bottom;'/></td><td  colspan='1'  style='width: 100px; background: red;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/08.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'> <img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/09.jpg' width='200' style='vertical-align: bottom;'/></td><td  style='width: 200px;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/10.jpg' width='200' style='vertical-align: bottom;'/></td> </tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/11.jpg' style='vertical-align: bottom;'/></td></tr><tr><td colspan='4' style='text-align: center;'><img src='http://www.schabla.com.br/jezzy_images/transacao-finalizada/12.jpg'  style='vertical-align: bottom;'/></td></tr></table>" ;
}


// Define a mensagem (Texto e Assunto)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 //$mail->Subject  = "Jezzy - Pedido Recebido"; // Assunto da mensagem

// $mail->AltBody = "Seu pedido foi adicionado ao Jezzy!";





// Define os anexos (opcional)
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//$mail->AddAttachment("c:/temp/documento.pdf", "novo_nome.pdf");  // Insere um anexo
  // Envia o e-mail


$url = 'https://api.turbo-smtp.com/api/mail/send';
$data = array('authuser' => $host_username, 'authpass' => $host_Password, 'from' => $host_username, 'to' => $email, 'subject' => "Jezzy - Pedido recebido!", 'html_content' => $html);

$options = array(
        'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    )
);
$context  = stream_context_create($options);
$result = json_decode(file_get_contents($url, false, $context));






          // Exibe uma mensagem de resultado
          if ($result->message == "OK") {

             $order2 = $moip->orders()->get($jObj->id);


          } else {

            $order2 = $moip->orders()->get($jObj->id);

 }
 
 if($payment_method_id == '73'){
                $payment_method_id = 'Boleto';
                }else if($payment_method_id == '5'){
                $payment_method_id = 'MasterCard';
                }else if($payment_method_id == '7'){
                         $payment_method_id = 'American Express';
                         }else if($payment_method_id == '8'){
                                  $payment_method_id = 'Diners';
                                  }else if($payment_method_id == '10'){
                                           $payment_method_id = 'Elo';
                                           }else if($payment_method_id == '15'){
                                                    $payment_method_id = 'Hiper';
                                                    }else if($payment_method_id == '3'){
                                                             $payment_method_id = 'Visa';
                                                             }

  $dn = date_create($dn);
  $dn = date_format($dn, 'd/m/Y');

  
  $array = array(
    'productype' => $offer_type,
    "transaction" => $transaction,
    "title" => $title,
	"email" => $email,
	"payment_method_id" => $payment_method_id,
	"total_value" => $total_value,
	"dn" => $dn
);
  
echo json_encode($array);

?>




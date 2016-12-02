<?php
require("../lib/phpmailer/PHPMailerAutoload.php");
require '../vendor/moip/vendor/autoload.php';
require("../php/configuracao.php"); //pega as configurações globais de endereços


use Moip\Moip;
use Moip\MoipBasicAuth;


$token = 'HREOTOHJO4IYQRO24AEUUMQ89ZQ113RN';
$key = 'SPTQ2XRYS7WHJUKQKH25TC957H03LI4ZWKLCO0CL';



$data = new DateTime();
$dn = $data -> format("Y-m-d");
$expiration = $data -> add(new DateInterval('P2D')) -> format("Y-m-d");
print_r($_POST['orderId']);
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
										$header [] = "Authorization: Basic SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==";
										$auth = 'SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==';
                                        // URL do SandBox - Nosso ambiente de testes
                                        // $url = "https://desenvolvedor.moip.com.br/sandbox/ws/alpha/PreCadastramento";
                                       // $url = "https://sandbox.moip.com.br/v2/orders/".$_POST['orderId']."/payments";
                                       //$url = "https://sandbox.moip.com.br/v2/orders/ORD-3J5XPDT36F2Y/payments";

                                      // $url = "https://sandbox.moip.com.br/v2/orders?q=ORD-3J5XPDT36F2Y";
                                       $url = "https://sandbox.moip.com.br/v2/payments/PAY-9C93QIXE1F2O/void";
                                        $curl = curl_init();
                                        curl_setopt($curl, CURLOPT_URL, $url);

                                        // header que diz que queremos autenticar utilizando o HTTP Basic Auth
                                        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

                                        // informa nossas credenciais
                                        curl_setopt($curl, CURLOPT_USERPWD, $auth);
                                        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
                                        curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/4.0");
                                        //curl_setopt($curl, CURLOPT_GET, true);
                                        curl_setopt($curl, CURLOPT_POST, true);

                                        // Informa nosso XML de instru��o
                                      curl_setopt($curl, CURLOPT_POSTFIELDS, $json);

                                        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                                        // efetua a requisi��o e coloca a resposta do servidor do MoIP em $ret
                                        $ret = curl_exec($curl);
                                        $err = curl_error($curl);
                                        $err = curl_error($curl);

                                        curl_close($curl);
print_r($ret);

										$objeto  = json_decode($ret);
										$link = $objeto->_links->payBoleto->redirectHref;
										return $link;
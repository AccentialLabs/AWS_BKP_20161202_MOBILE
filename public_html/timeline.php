<html>
<meta charset="UTF-8">
<head>
<?php 
	$cookie = json_decode($_COOKIE['User'], true);
	$user = $cookie['name']; 
	$page = 'home';
	include  'php/Menu/Menu.php';
?>
<script src="js/page/configuracao.js"></script>
<script src="lib/hammer.js-master/hammer.js"></script>
<script src="lib/jquery-storage/json2.js"></script>
</head>
<body id="container">
<?php
	$title = 'MEU HISTÓRICO';
	include 'php/Menu/Title.php';
	include 'php/Utils/Utils.php';
	$return = []; 
		
	$obj = new Utils();
	$query = 'SELECT date, offers.percentage_discount,checkouts.unit_value, checkouts.shipping_value, offers_comments.evaluation, checkouts.boleto_link, checkouts.amount, checkouts.order_id, companies.fancy_name, offers.id, offers.title, offers_extra_infos.offer_type, payment_methods.name, payment_states.name,total_value FROM checkouts INNER JOIN companies ON company_id = companies.id INNER JOIN payment_methods ON payment_method_id = payment_methods.id INNER JOIN payment_states ON payment_state_id = payment_states.id INNER JOIN offers on offers.id = offer_id INNER JOIN offers_extra_infos ON offers.id = offers_extra_infos.offer_id LEFT JOIN offers_comments ON offers_comments.offer_id = offers.id AND offers_comments.user_id = ' .$cookie['id'] .' WHERE checkouts.user_id = ' .$cookie['id'];

	$result = $obj->ApiRequest($query);
	foreach($result as $item){
		
		$itemcheckouts=($item->checkouts->date);
		$item = (array)$item;
		$item['date'] = $itemcheckouts;
		array_push($return, $item);
		
	}
	$query = 'SELECT date, companies.fancy_name, subclasse_name, secondary_users.name, voucher_id,time_begin, schedules.id FROM schedules INNER JOIN companies ON companie_id = companies.id INNER JOIN secondary_users ON secondary_user_id = secondary_users.id  WHERE user_id =' .$cookie['id'];
	
	$result = $obj->ApiRequest($query);
	foreach($result as $item){
		$itemcheckouts=($item->schedules->date);
		$item = (array)$item;
		$item['date'] = $itemcheckouts;
		array_push($return, $item);
	}
	
	function date_compare($a, $b){
    $t1 = strtotime($a['date']);
    $t2 = strtotime($b['date']);
    return $t1 - $t2;
	}    
	
	usort($return, 'date_compare');
	
	$return = array_reverse ($return);
	echo '<div class="col-md-6"><ul class="timeline" id="timeline">'; // inicio do elemento timeline
	foreach($return as $element){ // histórico completo
		$date = new DateTime($element['date']);
		$date = $date->format('d/m/Y');
	
		if(array_key_exists('checkouts', $element)){ // compras
			switch($element['payment_states']->name){
				case 'INICIADO':
					$statuscheckout = 'Compra Iniciada';
					break;
				case 'AUTORIZADO':
					$statuscheckout = 'Compra Autorizada';
					break;
				case 'BOLETO IMPRESSO':
					$statuscheckout = 'Boleto Impresso';
					break;
				case 'CONCLUIDO':
					$statuscheckout = 'Pagamento Concluído';
					break;
				case 'EM ANALISE':	
					$statuscheckout = 'Pagamento em análise';
					break;
				case 'ESTORNADO':
					$statuscheckout = 'Pagamento Estornado';
					break;
				case 'EM REVISAO':
					$statuscheckout = 'Pagamento em revisão';
					break;
				case 'REEMBOLSADO':
					$statuscheckout = 'Pagamento Reembolsado';
					break;
				case 'INICIO DA TRANSACAO':
					$statuscheckout = 'Inicio da Transação';
					break;
			}
			$desconto = ((100-$element['offers']->percentage_discount)*$element['checkouts']->unit_value/100);
			
			if($element['offers_comments']->evaluation == ''  || $element['offers_comments']->evaluation == null){
				$evaluation = 0;
			}else{
				$evaluation = $element['offers_comments']->evaluation;
			}
			if($element['offers_extra_infos']->offer_type == "SERVICE"){ // compra de serviço
				if($element['payment_methods']->name != 'Bradesco'){ // compra de serviço com cartão de crédito
					echo '<li class="timeline adminchat">
					<div class="timeline-badge dourado"><img class="timelineIcon" style="width: 80%;margin-top: 25%;" src="img/icons/Voucher-05.png"></i></div>
					<div class="timeline-panel">
						<div class="timeline-heading">
							<small class="pull-right timeline-date">'.$date.'</small><br><span class="timeline-title">'.$element['offers']->title.'</span>
                        <p></p>
						</div>
						<div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ '.$element['checkouts']->total_value.'</span><br>
								<small class="timeline-undertitle">'.$statuscheckout.'</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/'.$element['payment_methods']->name.'.png">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" onclick="ClickComments('.$element['offers']->id.');" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/'.$evaluation.'.png">
							</div>	
                        </div>
                    </div>
                </div>
            </li>';
			}else{ // compra de serviço com boleto bancário
				$datetime1 = new DateTime('now');
					$datetime2 = new DateTime($element['date']);
					$interval = $datetime2->diff($datetime1);
					if($interval->format('%a') <= 7){ // boleto reenviavel
						echo '<li class="timeline adminchat">
                <div class="timeline-badge dourado"><img class="timelineIcon" style="width: 80%;margin-top: 25%;" src="img/icons/Voucher-05.png"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">'.$date.'</small><br><span class="timeline-title">'.$element['offers']->title.'</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ '.$element['checkouts']->total_value.'</span><br>
								<small class="timeline-undertitle">'.$statuscheckout.'</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/enviar-boleto.png" onclick="EnviarBoleto(\''.$cookie['email'].'\', \''.$element['checkouts']->boleto_link.'\',\''.$element['offers']->id.'\',\''.$element['checkouts']->amount.'\',\''.$element['date'].'\', \''.$element['checkouts']->order_id.'\', \''.$element['offers_extra_infos']->offer_type.'\', \''.$element['checkouts']->shipping_value.'\', \''.$desconto.'\', \''.$element['checkouts']->total_value.'\');">									
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" onclick="ClickComments('.$element['offers']->id.');" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/'.$evaluation.'.png">
							</div>	
                        </div>
                    </div>
                </div>
            </li>';
					}else{
						echo '<li class="timeline adminchat">
                <div class="timeline-badge dourado"><img class="timelineIcon" style="width: 80%;margin-top: 25%;" src="img/icons/Voucher-05.png"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">'.$date.'</small><br><span class="timeline-title">'.$element['offers']->title.'</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ '.$element['checkouts']->total_value.'</span><br>
								<small class="timeline-undertitle">'.$statuscheckout.'</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/boleto.jpg">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" onclick="ClickComments('.$element['offers']->id.');" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/'.$evaluation.'.png">
							</div>	
                        </div>
                    </div>
                </div>
            </li>';
					}
				
			}
			}else{  // compra de produto
				if($element['payment_methods']->name != 'Bradesco'){  // compra de produto com cartão de crédito
					echo'<li class="timeline adminchat"> 
                <div class="timeline-badge dourado"><img class="timelineIcon" src="img/icons/offerFooterIcon.PNG"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">'.$date.'</small><br><span class="timeline-title">'.$element['offers']->title.'</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ '.$element['checkouts']->total_value.'</span><br>
								<small class="timeline-undertitle">'.$statuscheckout.'</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/'.$element['payment_methods']->name.'.png">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" onclick="ClickComments('.$element['offers']->id.');" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/'.$evaluation.'.png">
							</div>													
                        </div>
                    </div>
                </div>
            </li>';
				}else{  // compra de produto com boleto bancário
					$datetime1 = new DateTime('now');
					$datetime2 = new DateTime($element['date']);
					$interval = $datetime2->diff($datetime1);
					if($interval->format('%a') <= 7){ // boleto reenviavel
					echo '<li class="timeline adminchat"> 
						<div class="timeline-badge dourado"><img class="timelineIcon" src="img/icons/offerFooterIcon.PNG"></i></div>
						<div class="timeline-panel">
						<div class="timeline-heading">
                        <small class="pull-right timeline-date">'.$date.'</small><br><span class="timeline-title">'.$element['offers']->title.'</span>
                        <p></p>
						</div>
						<div class="timeline-body">
							<div class="form-group">
								<div class="row" style="padding-right: 0%!important;width: 105%;">
									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
											<span class="timeline-subtitle">R$ '.$element['checkouts']->total_value.'</span><br>
											<small class="timeline-undertitle">'.$statuscheckout.'</small>  
										<div class="pull-right col-xs-2 paddingoff">	
										<img class="col-xs-12 paddingoff" src="img/icons/enviar-boleto.png" onclick="EnviarBoleto(\''.$cookie['email'].'\', \''.$element['checkouts']->boleto_link.'\',\''.$element['offers']->id.'\',\''.$element['checkouts']->amount.'\',\''.$element['date'].'\', \''.$element['checkouts']->order_id.'\', \''.$element['offers_extra_infos']->offer_type.'\', \''.$element['checkouts']->shipping_value.'\', \''.$desconto.'\', \''.$element['checkouts']->total_value.'\');">	
									</div>								
										</div>
									</div>
								<div class="pull-left col-xs-10 paddingoff marginTop5">
								<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" src="img/icons/Comentarios2.png">
								<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/'.$evaluation.'.png">
								</div>														
							</div>
							</div>
						</div>
					</li>';
					}else{
					echo '<li class="timeline adminchat"> 
						<div class="timeline-badge dourado"><img class="timelineIcon" src="img/icons/offerFooterIcon.PNG"></i></div>
						<div class="timeline-panel">
						<div class="timeline-heading">
                        <small class="pull-right timeline-date">'.$date.'</small><br><span class="timeline-title">'.$element['offers']->title.'</span>
                        <p></p>
						</div>
						<div class="timeline-body">
							<div class="form-group">
								<div class="row" style="padding-right: 0%!important;width: 105%;">
									<div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
											<span class="timeline-subtitle">R$ '.$element['checkouts']->total_value.'</span><br>
											<small class="timeline-undertitle">'.$statuscheckout.'</small>  
										<div class="pull-right col-xs-2 paddingoff">	
										<img class="col-xs-12 paddingoff" src="img/icons/boleto.jpg">	
									</div>								
										</div>
									</div>
								<div class="pull-left col-xs-10 paddingoff marginTop5">
								<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" onclick="ClickComments('.$element['offers']->id.');"  src="img/icons/Comentarios2.png">
								<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/'.$evaluation.'.png">
								</div>														
							</div>
							</div>
						</div>
					</li>';
					}					
				}	
			}
		}else{		  // serviço agendado pelo aplicativo
		$timebegin = explode(":", $element['schedules']->time_begin)[0]. ":" . explode(":", $element['schedules']->time_begin)[1];
		
			if($element['schedules']->voucher_id == 0){ // serviço agendado pelo aplicativo sem voucher
				echo '<li class="timeline adminchat"><div class="timeline-badge"><img class="timelineIcon" src="img/icons/Servicos.png"></i></div><div class="timeline-panel"><div class="timeline-heading"><small class="pull-right timeline-date">'.$date.' - '.$timebegin.'</small><br><span class="timeline-title">'.$element['schedules']->subclasse_name.'</span></div><div class="timeline-body"><div class="form-group"><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-18"><span class="timeline-subtitle">Com '.$element['secondary_users']->name.'</span><br><small class="timeline-undertitle">'.$element['companies']->fancy_name.'</small></div></div><img class="pull-right icon" onclick="Click('.$element['schedules']->id.');" src="img/icons/emrpesaSemLogo.png"></div></div></div></li>';
			}else{ // serviço agendado pelo aplicativo com voucher
				echo '<li class="timeline adminchat"><div class="timeline-badge"><img class="timelineIcon" src="img/icons/Servicos.png"></i></div><div class="timeline-panel"><div class="timeline-heading"><small class="pull-right timeline-date">'.$date.' - '.$timebegin.'</small><br><span class="timeline-title">'.$element['schedules']->subclasse_name.'</span></div><div class="timeline-body"><div class="form-group"><div class="row" style="padding-right: 0%!important;width: 105%;"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;"><span class="timeline-subtitle">Com '.$element['secondary_users']->name.'</span><br><small class="timeline-undertitle">'.$element['companies']->fancy_name.'</small><div class="pull-right col-xs-2 paddingoff" style="margin-bottom:5%!important;"><img class="col-xs-12 paddingoff" src="img/icons/Voucher-03.png"></div></div></div><img class="pull-right icon" onclick="Click('.$element['schedules']->id.');" src="img/icons/emrpesaSemLogo.png"></div></div></div></li>';
			}
		}
	}
	echo '</u></div>';  // fim do elemento timeline
?>	
<script>
function Click(servico){
var query = "SELECT*FROM schedules Schedules WHERE user_id =" + $.cookieStorage.get('User').id + " and Schedules.id =" + servico;

   var conditions = {
      'User': {
            'query':query
      }
   };
   var postData = JSON.stringify(conditions);

   postData = {
      'params': postData
   };
   var url = 'https://'+api+'/users/get/query/' + createToken();

   $.ajax({
      method: "POST",
      url: url,
      data: postData

   }).done(function(result) {
	if(result!=""){
      var objReturn = JSON.parse(JSON.stringify(result));
      var decodeObjReturn = Base64.decode(objReturn);
      var convertedReturn = (JSON.parse(decodeObjReturn));
	
		$.cookieStorage.remove('Schedules');

		$.cookieStorage.set(convertedReturn[0]);

		if ($.cookieStorage.isSet('Schedules')) {
			window.location.href = "service_galery_image.html";
		} else {
     
		}
	 }else{
      
      }
   }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      alert(errorThrown);
   });

	
}

function ClickComments(offer){
	console.log(offer);
	var query = "SELECT*FROM offers Offer WHERE Offer.id =" + offer;
	
   var conditions = {
      'User': {
            'query':query
      }
   };
   var postData = JSON.stringify(conditions);

   postData = {
      'params': postData
   };
   var url = 'https://'+api+'/users/get/query/' + createToken();

   $.ajax({
      method: "POST",
      url: url,
      data: postData

   }).done(function(result) {
	if(result!=""){
      var objReturn = JSON.parse(JSON.stringify(result));
      var decodeObjReturn = Base64.decode(objReturn);
      var convertedReturn = (JSON.parse(decodeObjReturn));
	
		$.cookieStorage.remove('Offer');

		$.cookieStorage.set(convertedReturn[0]);

		if ($.cookieStorage.isSet('Offer')) {
			window.location.href = "comments.html";
		} else {
     
		}
	 }else{
      
      }
   }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      alert(errorThrown);
   });
}

// ---------------------------FUNÇÃO PARA ENVIAR BOLETO NOVAMENTE AO EMAIL DO CLIENTE -------------------------//
function EnviarBoleto(email, link, id, qtdcheckout, date, orderid, offertype, frete, desconto, valortotal){

    var conditionsOffer = {
        'Offer': {
            'conditions' : {
                'Offer.id':id
            }
        }
    };
    var postDataOffer = JSON.stringify(conditionsOffer);

    postDataOffer = {
        'params': postDataOffer
    };
    var urlOffer = 'https://'+api+'/offers/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: urlOffer,
        data: postDataOffer

    }).done(function(result) {
        if(result!='') {
            var objReturnOffer = JSON.parse(JSON.stringify(result));
            var decodeObjReturnOffer = Base64.decode(objReturnOffer);
            var convertedReturnOffer = JSON.parse(decodeObjReturnOffer);
			var title = convertedReturnOffer.Offer.title;
			
            if((convertedReturnOffer.Offer.amount_allowed/1) >= (qtdcheckout/1)){

			var query = "SELECT*FROM companies Company WHERE Company.id =" + convertedReturnOffer.Offer.company_id;
	
   var conditions = {
      'User': {
            'query':query
      }
   };
   var postData = JSON.stringify(conditions);

   postData = {
      'params': postData
   };
   var url = 'https://'+api+'/users/get/query/' + createToken();

   $.ajax({
      method: "POST",
      url: url,
      data: postData

   }).done(function(result) {
	if(result!=""){
      var objReturn = JSON.parse(JSON.stringify(result));
      var decodeObjReturn = Base64.decode(objReturn);
      var convertedReturn = (JSON.parse(decodeObjReturn));
		console.log($.cookieStorage.get('User'));
                $.confirm({
                    title: 'Deseja que o boleto seja reenviado pro seu email?',
                    content: false,
                    animation: 'zoom',
                    closeAnimation: 'scale',
                    animationBounce: 1.5,
                    theme: 'supervan',
                    confirmButton: 'Sim',
                    cancelButton: 'Não',
                    keyboardEnabled: true,	
					
                    confirm: function () {
                        var url = 'https://'+ip+'/jezzy-mobile/public_html/php/mailerboleto.php';
                        $.ajax({
                            method: "POST",
                            url: url,
                            //data: postData
                            data: {
                                password:link,
                                email:email,
								offertype: offertype,
								frete:frete,
								desconto:desconto,
								valortotal:valortotal,
								title:title,
								salao:convertedReturn[0].Company.fancy_name,
								salaoaddress:convertedReturn[0].Company.address,
								salaonumber:convertedReturn[0].Company.number,
								salaocomplement:convertedReturn[0].Company.complement,
								salaocity:convertedReturn[0].Company.city,
								salaodistrict:convertedReturn[0].Company.district,
								salaostate:convertedReturn[0].Company.state,
								salaozip_code:convertedReturn[0].Company.zip_code,
								workdays:convertedReturn[0].Company.work_days,
								open_hour:convertedReturn[0].Company.open_hour,
								end_hour:convertedReturn[0].Company.close_hour,
								address:$.cookieStorage.get('User').address,
								number:$.cookieStorage.get('User').number,
								complement:$.cookieStorage.get('User').complement,
								district:$.cookieStorage.get('User').district,
								zip_code:$.cookieStorage.get('User').zip_code,
								city:$.cookieStorage.get('User').city,
								state:$.cookieStorage.get('User').state,
								id:orderid
                            }

                        }).done(function(result) {
							console.log(result);
                            if(result!=''){
                                $.alert({
                                    title: "",
                                    content: 'Boleto Reenviado com Sucesso!',
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    animationBounce: 1.5,
                                    theme: 'supervan',
                                    closeIcon: false,
                                    confirmButton: false,
                                    backgroundDismiss: true
                                });
                            }else{
                                $.alert({
                                    title: "",
                                    content: 'Boleto não pôde ser reenviado!',
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    animationBounce: 1.5,
                                    theme: 'supervan',
                                    closeIcon: false,
                                    confirmButton: false,
                                    backgroundDismiss: true
                                });
                            }
                        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });
                    },
                    cancel: function () {

                        $.alert({
                            title: false,
                            content: 'Boleto não foi reenviado!',
                            animation: 'zoom',
                            closeAnimation: 'scale',
                            animationBounce: 1.5,
                            theme: 'supervan',
                            closeIcon: false,
                            confirmButton: false,
                            backgroundDismiss: true

                        })

                    }
                });

		
	 }else{
      
      }
   }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      alert(errorThrown);
   });
            }else{
                $.alert({
                    title: false,
                    content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><span>PRODUTO INDISPONÍVEL EM ESTOQUE</span><br><br><br><button class="btn" style="background-color:#2597AC;" onclick="sendmeanaviso('+ $.cookieStorage.get("User").id+', '+id+');">AVISE-ME QUANDO CHEGAR</button></br></br><button style="background-color:#2597AC;" class="btn" onclick="cancelorder('+orderid+');">CANCELAR O PEDIDO</button>',
                    animation: 'zoom',
                    closeAnimation: 'scale',
                    animationBounce: 1.5,
                    theme: 'supervan',
                    closeIcon: false,
                    confirmButton: false,
                    backgroundDismiss: true

                })
            }

        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
// ------------------------------------------FIM DA FUNÇÃO ENVIO DE BOLETO-------------------------------------------------- //
// ------------------------------------------INICIO DA FUNÇÃO ENVIAR AVISO QUANDO PRODUTO ESTIVER EM ESTOQUE------------------------------------------------------- //
function sendmeanaviso(user_id, offer_id){
    var date = new Date();
	var day = date.getDate();
	var month = ((date.getMonth()/1)+1);
	var year = date.getFullYear();
	date = year + "-" + month + "-" + day;
    var query = "INSERT INTO email_notify_users (user_id, date_solicitation, offer_id) VALUES("+user_id+ ", \'" +date+ "\',"+offer_id+")";

    var conditions = {
        'User': {
            'query':query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/users/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData

    }).done(function(result) {
        $.alert({
            title: false,
            content: 'VOCÊ SERÁ NOTIFICADO',
            animation: 'zoom',
            closeAnimation: 'scale',
            animationBounce: 1.5,
            theme: 'supervan',
            closeIcon: false,
            confirmButton: false,
            backgroundDismiss: true,
            onClose:function(){
                window.location.href = 'offer_history.html';
            }

        })


    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
//---------------------------------------------------------------------------------------------------------------------------------//
function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}
//--------------------------- INICIO DA FUNÇÃO CANCELAR ORDEM DE PEDIDO -------------------------------------------------------------//
function cancelorder(orderid){
    var query = "UPDATE checkouts SET payment_state_id = 2 WHERE order_id = "+orderid;
console.log(query);
    var conditions = {
        'User': {
            'query':query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/users/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData

    }).done(function(result) {
            window.location.href = 'offer_history.html';
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
//------------------------------------------------------------------------------------------------------------------------------------------------//

function createToken() {
   var arraySend = {
      'secureNumbers': Math.floor(new Date().getTime() / 1000)
   };
   var json = JSON.stringify(arraySend);
   return Base64.encode(json);
}
var Base64 = {
   _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
   encode: function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
         chr1 = input.charCodeAt(i++);
         chr2 = input.charCodeAt(i++);
         chr3 = input.charCodeAt(i++);
         enc1 = chr1 >> 2;
         enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
         enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
         enc4 = chr3 & 63;
         if (isNaN(chr2)) {
            enc3 = enc4 = 64;
         } else if (isNaN(chr3)) {
            enc4 = 64;
         }
         output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      }
      return output;
   },
   decode: function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
         enc1 = this._keyStr.indexOf(input.charAt(i++));
         enc2 = this._keyStr.indexOf(input.charAt(i++));
         enc3 = this._keyStr.indexOf(input.charAt(i++));
         enc4 = this._keyStr.indexOf(input.charAt(i++));
         chr1 = (enc1 << 2) | (enc2 >> 4);
         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
         chr3 = ((enc3 & 3) << 6) | enc4;
         output = output + String.fromCharCode(chr1);
         if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
         }
         if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
         }
      }
      output = Base64._utf8_decode(output);
      return output;
   },
   _utf8_encode: function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
         var c = string.charCodeAt(n);
         if (c < 128) {
            utftext += String.fromCharCode(c);
         }
         else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
         }
         else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
         }
      }
      return utftext;
   },
   _utf8_decode: function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;
      while (i < utftext.length) {
         c = utftext.charCodeAt(i);
         if (c < 128) {
            string += String.fromCharCode(c);
            i++;
         }
         else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
         }
         else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
         }
      }
      return string;
   }
};

</script>
</body>
</html>

			<!--li class="timeline adminchat"> COMPRA DE SERVIÇO COM CARTÃO DE CRÉDITO
                <div class="timeline-badge dourado"><img class="timelineIcon" style="width: 80%;margin-top: 25%;" src="img/icons/Voucher-05.png"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">22/10/2016</small><br><span class="timeline-title">Barba</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ 149,20</span><br>
								<small class="timeline-undertitle">Compra Iniciada</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/Mastercard.png">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/5.png">
							</div>	
                        </div>
                    </div>
                </div>
            </li-->		


			<!--li class="timeline adminchat"> COMPRA DE SERVIÇO COM BOLETO
                <div class="timeline-badge dourado"><img class="timelineIcon" style="width: 80%;margin-top: 25%;" src="img/icons/Voucher-05.png"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">22/10/2016</small><br><span class="timeline-title">Barba</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ 149,20</span><br>
								<small class="timeline-undertitle">Compra Iniciada</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/boleto.jpg">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/5.png">
							</div>														
                        </div>
                    </div>
                </div>
            </li-->		
			
			<!--li class="timeline adminchat"> COMPRA DE SERVIÇO COM BOLETO DENTRO DA VALIDADE
                <div class="timeline-badge dourado"><img class="timelineIcon" style="width: 80%;margin-top: 25%;" src="img/icons/Voucher-05.png"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">22/10/2016</small><br><span class="timeline-title">Barba</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ 149,20</span><br>
								<small class="timeline-undertitle">Compra Iniciada</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/enviar-boleto.png">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/5.png">
							</div>															
                        </div>
                    </div>
                </div>
            </li-->		

			<!--li class="timeline adminchat"> COMPRA COM BOLETO FORA DA VALIDADE
                <div class="timeline-badge dourado"><img class="timelineIcon" src="img/icons/offerFooterIcon.PNG"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">22/10/2016</small><br><span class="timeline-title">Shampoo Kérastase para cabelos finos</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ 149,20</span><br>
								<small class="timeline-undertitle">Compra Iniciada</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/boleto.jpg">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/5.png">
							</div>														
                        </div>
                    </div>
                </div>
            </li-->
			
			<!--li class="timeline adminchat"> COMPRA COM BOLETO DENTRO DA VALIDADE
                <div class="timeline-badge dourado"><img class="timelineIcon" src="img/icons/offerFooterIcon.PNG"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">22/10/2016</small><br><span class="timeline-title">Shampoo Kérastase para cabelos finos</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ 149,20</span><br>
								<small class="timeline-undertitle">Compra Iniciada</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/enviar-boleto.png">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/5.png">
							</div>														
                        </div>
                    </div>
                </div>
            </li-->
			
			
			
			
			
			<!--li class="timeline adminchat"> COMPRA COM CARTÃO DE CRÉDITO
                <div class="timeline-badge dourado"><img class="timelineIcon" src="img/icons/offerFooterIcon.PNG"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">22/10/2016</small><br><span class="timeline-title">Shampoo Kérastase para cabelos finos</span>
                        <p></p>
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">R$ 149,20</span><br>
								<small class="timeline-undertitle">Compra Iniciada</small>  
								<div class="pull-right col-xs-2 paddingoff">	
									<img class="col-xs-12 paddingoff" src="img/icons/Mastercard.png">	
								</div>								
                                </div>
                            </div>
							<div class="pull-left col-xs-10 paddingoff marginTop5">
							<img class="col-xs-3 paddingoff" style="padding:1%!important;width:18%;" src="img/icons/Comentarios2.png">
							<img class="col-xs-9 paddingoff" style="padding:1%!important;" src="img/icons/5.png">
							</div>													
                        </div>
                    </div>
                </div>
            </li-->
			
			
			    


			<!--li class="timeline adminchat">            SERVIÇO
                <div class="timeline-badge"><img class="timelineIcon" src="img/icons/Servicos.png"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">17/10/2016 - 15:00</small><br><span class="timeline-title">Barba</span>                        
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18">
								<span class="timeline-subtitle">Com Romário</span><br>
								<small class="timeline-undertitle">Salão do Matheus</small>                               
                                </div>
                            </div> 
							<img class="pull-right icon" src="img/icons/emrpesaSemLogo.png">						
                        </div>
                    </div>
                </div>
            </li-->
			
			<!--li class="timeline adminchat">           SERVIÇO COM VOUCHER
                <div class="timeline-badge"><img class="timelineIcon" src="img/icons/Servicos.png"></i></div>
                <div class="timeline-panel">
                    <div class="timeline-heading">
                        <small class="pull-right timeline-date">17/10/2016 - 15:00</small><br><span class="timeline-title">Barba</span>                        
                    </div>
                    <div class="timeline-body">
                        <div class="form-group">
                            <div class="row" style="padding-right: 0%!important;width: 105%;">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-18" style="padding-right:0%!important;">
								<span class="timeline-subtitle">Com Romário</span><br>
								<small class="timeline-undertitle">Salão do Matheus</small>    
								<div class="pull-right col-xs-2 paddingoff" style="margin-bottom:5%!important;">	
									<img class="col-xs-12 paddingoff" src="img/icons/Voucher-03.png">	
								</div>
                                </div>
                            </div> 
							<img class="pull-right icon" src="img/icons/emrpesaSemLogo.png">						
                        </div>
                    </div>
                </div>
            </li-->
			
			
			
			
			
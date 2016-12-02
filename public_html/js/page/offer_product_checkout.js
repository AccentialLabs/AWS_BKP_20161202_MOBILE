var id = '';
var idaddress='';
var address = '';
var number = '';
var city = '';
var state = '';
var district = '';
function PreencherSecondaryComissioned(){
    if(JSON.parse(localStorage.getItem('FavCompany'))!= null && JSON.parse(localStorage.getItem('FavCompany'))!= undefined) {
        var FavCompany = JSON.parse(localStorage.getItem('FavCompany'));

    var conditionsMetrics={
        'General': {
            'query': 'SELECT * FROM secondary_users INNER JOIN secondary_users_commissioning_fees ON secondary_users_commissioning_fees.secondary_user_id = secondary_users.id   WHERE excluded = 0 and company_id = '+ FavCompany.id
        }
    };

    var postDataMetrics = JSON.stringify(conditionsMetrics);

    postDataMetrics = {
        'params': postDataMetrics
    };

    var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: urlMetrics,
        data: postDataMetrics
    }).done(function (result) {
        if(result!='ImE6MDp7fSI=') {
            var objReturnMetrics = JSON.parse(JSON.stringify(result));
            var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
            var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));
            localStorage.setItem('qtdsecondaryuser', convertedReturnMetrics.length);
            for(var r = 0; r<convertedReturnMetrics.length;r++){
                var secondary_user = convertedReturnMetrics[r].secondary_users;
                $("#myModalLabel").html(FavCompany.fancy_name);
                var name = utf8_decode(secondary_user.name);
                $("#sel1").append('<option value='+secondary_user.id+'>'+name+'</option>');
            }


        }else{
            localStorage.setItem('qtdsecondaryuser', 0);
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
    }
}
function volta(){
    window.location.go(-1);
}
function godetail(){
     window.location.href = 'offer_product_detail.html';
}
var loading = "";
$(document).ready(function() {

   // $("#ceplabel").mask("99999-999");
    PreencherSecondaryComissioned();
    document.getElementById("BtnPagamentoAviso").disabled = true;
    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;



    if ($.cookieStorage.get('paginaanterior') == "https://'+ip+'/jezzy-mobile/public_html/home.html") {
        id = $.cookieStorage.get('Offer').id;
    } else {
        id = $.cookieStorage.get('Offer').id;
    }
     if(document.referrer != "https://'+ip+'/jezzy-mobile/public_html/offer_product_detail.html"){

         if($.cookieStorage.isSet('usuario')){
            $("#BackButton1").attr('onclick', 'voltar();');
      }else{
        idaddress = $.cookieStorage.get('AditionalAddressesUser').id;
            $("#BackButton1").attr('onclick', 'godetail();');
      }
   }


        function generateModalAlert(mensagem) {
            if ($("#mymodal").length) {
                $("#messageModelGoesHere").html(mensagem);
            } else {
                $modalHtml =
                    '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
                    + '<div class="modal-dialog modal-sm">'
                    + '<div class="modal-content" id="messageModelGoesHere">'
                    + mensagem
                    + '</div>'
                    + '</div>'
                    + '</div>';
                $("body").append($modalHtml);
            }
    }


    function generateModalAlert2(mensagem) {
        if ($("#mymodal").length) {
            $("#messageModelGoesHere").html(mensagem);
        } else {
            $modalHtml =
                '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
                + '<div class="modal-dialog modal-sm">'
                + '<div class="modal-content2" id="messageModelGoesHere">'
                + mensagem
                + '</div>'
                + '</div>'
                + '</div>';
            $("body").append($modalHtml);
        }
    }
    sendRequest();

    $("#BtnAddEndereco").click(function () {
        window.location.href = "address_list.html";
    });
    $("#btncadenderecoprincipalsalvar").click(function() {
        if ($.cookieStorage.get('User').id != '' && document.getElementById("addresslabel").value != '' && document.getElementById("numberlabel").value != '' && document.getElementById("bairrolabel").value != '' && document.getElementById("citylabel").value != '' && document.getElementById("statelabel").value != '' && document.getElementById("ceplabel").value != ''){
            var conditionsSave = {
                'AditionalAddressesUser': {
                    'user_id': $.cookieStorage.get('User').id,
                    'label': document.getElementById("label1").value,
                    'address': document.getElementById("addresslabel").value,
                    'number': document.getElementById("numberlabel").value,
                    'complement': document.getElementById("complementlabel").value,
                    'district': document.getElementById("bairrolabel").value,
                    'city': document.getElementById("citylabel").value,
                    'state': document.getElementById("statelabel").value,
                    'zip_code': document.getElementById("ceplabel").value
                }
            };


        var postDataSave = JSON.stringify(conditionsSave);

        postDataSave = {
            'params': postDataSave
        };

        var urlSave = 'https://' + api + '/users/save/first/' + createToken();

        $.ajax({
            method: "POST",
            url: urlSave,
            data: postDataSave

        }).done(function (result) {


            var conditionsSave = {
                'AditionalAddressesUser': {
                    'user_id': $.cookieStorage.get('User').id,
                    'zip_code': document.getElementById("ceplabel").value
                }
            };


            var postDataSave = JSON.stringify(conditionsSave);

            postDataSave = {
                'params': postDataSave
            };

            var urlSave = 'https://' + api + '/users/get/all/' + createToken();

            $.ajax({
                method: "POST",
                url: urlSave,
                data: postDataSave

            }).done(function (result) {


                var objReturnMetrics = JSON.parse(JSON.stringify(result));
                var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
                var convertedReturnMetrics = (JSON.parse(decodeObjReturnMetrics));


                var conditionsSave = {
                    'User': {
                        'id': $.cookieStorage.get('User').id,
                        'id_address': convertedReturnMetrics[(convertedReturnMetrics.length / 1 - 1)].AditionalAddressesUser.id
                    }
                };

                var postDataSave = JSON.stringify(conditionsSave);

                postDataSave = {
                    'params': postDataSave
                };

                var urlSave = 'https://' + api + '/users/save/first/' + createToken();

                $.ajax({
                    method: "POST",
                    url: urlSave,
                    data: postDataSave

                }).done(function (result) {

                    var conditionsSave = {
                        'User': {
                            'query': 'SELECT * FROM users User WHERE id  = ' + $.cookieStorage.get('User').id
                        }
                    };

                    var postDataSave = JSON.stringify(conditionsSave);

                    postDataSave = {
                        'params': postDataSave
                    };

                    var urlSave = 'https://' + api + '/users/get/query/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: urlSave,
                        data: postDataSave

                    }).done(function (result) {


                        var objReturnMetricssss = JSON.parse(JSON.stringify(result));
                        var decodeObjReturnMetricssss = Base64.decode(objReturnMetricssss);
                        var convertedReturnMetricssss = (JSON.parse(decodeObjReturnMetricssss));


                        $.cookieStorage.set(convertedReturnMetricssss[0]);


                        window.location.href = 'offer_product_checkout.html';


                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });


                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });


            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });


        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
    }else{
            generateModalAlert("Preencha todos os campos corretamente!");
            $('#mymodal').modal('show');
        }
    });
    $("#BtnPagamentoAviso").click(function () {

        if (document.getElementById("BtnPagamentoAviso").innerText == "REALIZAR PAGAMENTO" &&  document.getElementById("BtnPagamentoAviso").disabled == false) {
            if(JSON.parse(localStorage.getItem('FavCompany'))!= null && JSON.parse(localStorage.getItem('FavCompany'))!= undefined) {
              //console.log(localStorage.getItem('qtdsecondaryuser'));
                if(localStorage.getItem('qtdsecondaryuser') != 0 ){
                    $("#buttonmodalfirstlogin").click();




                $("#salvarbuttonfirstlogin").click(function(){

                    localStorage.setItem("ComissionedSecondaryUser", document.getElementById("sel1").value);
                    var total = $("#totalValue").html();
                    var diasdeentrega = $("#deliveryValue").html();
                    var days = diasdeentrega.split("");
                    var frete = $("#sendValue").html();
                    var cod_frete = $("#codServico").val();

                    var address =  document.getElementById("address").value;
                    var zip_code =  $("#cepValue").html();
                    var city =  document.getElementById("city").value;
                    var district= document.getElementById("district").value;
                    var state = document.getElementById("state").value;
                    var number = document.getElementById("number").value;
                    var checkout = new Object();
                    var checkoutarray = new Array();
                    var complement = '';
                    if($.cookieStorage.get('Offer').metrics != '') {
                        var metrics = $("#OfferMetrics").val();

                        var radios = document.getElementsByName("metrics");
                        for (var i = 0; i < radios.length; i++) {

                            if (radios[i].checked == true) {
                                metrics = radios[i].value;
                            } else {
                                metrics = '';
                            }
                        }

                        var metrics2 = $("#OfferMetrics2").val();
                        var radios2 = document.getElementsByName("metrics2");
                        for (var j = 0; j < radios2.length; j++) {

                            if (radios2[j].checked == true) {
                                metrics2 = radios2[j].value;
                            } else {
                                metrics2 = '';
                            }
                        }


                    }

                    checkout.total_value = total;
                    checkout.shipping_value = frete;
                    checkout.shipping_type = cod_frete;
                    checkout.metrics = metrics + "," + metrics2;
                    checkout.address = address;
                    checkout.number = number;
                    checkout.zip_code = zip_code;
                    checkout.city = city;
                    checkout.complement = complement;
                    checkout.district = district;
                    checkout.state = state;
                    checkout.shipping_days = days[0];
                    checkout.quantidade = $("#quantProductValue").html();
                    checkoutarray[0] = checkout;



                    var Check = checkoutarray[0];
                    var checkoutsave = (JSON.stringify(Check));
                    var variavel = (JSON.parse(checkoutsave));

                    $.cookieStorage.set(variavel); //salvando valor do frete


                    if ($.cookieStorage.isSet('shipping_value')) { //verificando se valor do frete foi salvo




                        $("#salvarbuttonfirstlogin").html('<i class="fa fa-spinner fa-pulse fa-2x fa-fw" aria-hidden="true"></i>');

                        loading = $.alert({
                            animation: 'zoom',
                            title: '',
                            content: '',
                            closeAnimation: 'scale',
                            animationBounce: 1.5,
                            theme: 'supervan',
                            closeIcon: false,
                            confirmButton: false,
                            backgroundDismiss: false
                        });
                        $(".jconfirm.jconfirm-supervan .jconfirm-bg").css('background-color', 'transparent');

                        CalcularParcelas();

                    } else {

                        generateModalAlert("Erro ao salvar Cookie");
                        $('#mymodal').modal('show');

                    }


                });
                }else{
                    var total = $("#totalValue").html();
                    var diasdeentrega = $("#deliveryValue").html();
                    var days = diasdeentrega.split("");
                    var frete = $("#sendValue").html();
                    var cod_frete = $("#codServico").val();

                    var address =  document.getElementById("address").value;
                    var zip_code =  $("#cepValue").html();
                    var city =  document.getElementById("city").value;
                    var district= document.getElementById("district").value;
                    var state = document.getElementById("state").value;
                    var number = document.getElementById("number").value;
                    var checkout = new Object();
                    var checkoutarray = new Array();
                    var complement = '';
                    if($.cookieStorage.get('Offer').metrics != '') {
                        var metrics = $("#OfferMetrics").val();

                        var radios = document.getElementsByName("metrics");
                        for (var i = 0; i < radios.length; i++) {

                            if (radios[i].checked == true) {
                                metrics = radios[i].value;
                            } else {
                                metrics = '';
                            }
                        }

                        var metrics2 = $("#OfferMetrics2").val();
                        var radios2 = document.getElementsByName("metrics2");
                        for (var j = 0; j < radios2.length; j++) {

                            if (radios2[j].checked == true) {
                                metrics2 = radios2[j].value;
                            } else {
                                metrics2 = '';
                            }
                        }


                    }

                    checkout.total_value = total;
                    checkout.shipping_value = frete;
                    checkout.shipping_type = cod_frete;
                    checkout.metrics = metrics + "," + metrics2;
                    checkout.address = address;
                    checkout.number = number;
                    checkout.zip_code = zip_code;
                    checkout.city = city;
                    checkout.complement = complement;
                    checkout.district = district;
                    checkout.state = state;
                    checkout.shipping_days = days[0];
                    checkout.quantidade = $("#quantProductValue").html();
                    checkoutarray[0] = checkout;



                    var Check = checkoutarray[0];
                    var checkoutsave = (JSON.stringify(Check));
                    var variavel = (JSON.parse(checkoutsave));

                    $.cookieStorage.set(variavel); //salvando valor do frete


                    if ($.cookieStorage.isSet('shipping_value')) { //verificando se valor do frete foi salvo

                        $("#salvarbuttonfirstlogin").html('<i class="fa fa-spinner fa-pulse fa-2x fa-fw" aria-hidden="true"></i>');

                        loading = $.alert({
                            animation: 'zoom',
                            title: '',
                            content: '',
                            closeAnimation: 'scale',
                            animationBounce: 1.5,
                            theme: 'supervan',
                            closeIcon: false,
                            confirmButton: false,
                            backgroundDismiss: false
                        });
                        $(".jconfirm.jconfirm-supervan .jconfirm-bg").css('background-color', 'transparent');

                        CalcularParcelas();

                    } else {

                        generateModalAlert("Erro ao salvar Cookie");
                        $('#mymodal').modal('show');

                    }
                }
            }else{
                var total = $("#totalValue").html();
                var diasdeentrega = $("#deliveryValue").html();
                var days = diasdeentrega.split("");
                var frete = $("#sendValue").html();
                var cod_frete = $("#codServico").val();

                var address =  document.getElementById("address").value;
                var zip_code =  $("#cepValue").html();
                var city =  document.getElementById("city").value;
                var district= document.getElementById("district").value;
                var state = document.getElementById("state").value;
                var number = document.getElementById("number").value;
                var checkout = new Object();
                var checkoutarray = new Array();
                var complement = '';
                if($.cookieStorage.get('Offer').metrics != '') {
                    var metrics = $("#OfferMetrics").val();

                    var radios = document.getElementsByName("metrics");
                    for (var i = 0; i < radios.length; i++) {

                        if (radios[i].checked == true) {
                            metrics = radios[i].value;
                        } else {
                            metrics = '';
                        }
                    }

                    var metrics2 = $("#OfferMetrics2").val();
                    var radios2 = document.getElementsByName("metrics2");
                    for (var j = 0; j < radios2.length; j++) {

                        if (radios2[j].checked == true) {
                            metrics2 = radios2[j].value;
                        } else {
                            metrics2 = '';
                        }
                    }


                }

                checkout.total_value = total;
                checkout.shipping_value = frete;
                checkout.shipping_type = cod_frete;
                checkout.metrics = metrics + "," + metrics2;
                checkout.address = address;
                checkout.number = number;
                checkout.zip_code = zip_code;
                checkout.city = city;
                checkout.complement = complement;
                checkout.district = district;
                checkout.state = state;
                checkout.shipping_days = days[0];
                checkout.quantidade = $("#quantProductValue").html();
                checkoutarray[0] = checkout;



                var Check = checkoutarray[0];
                var checkoutsave = (JSON.stringify(Check));
                var variavel = (JSON.parse(checkoutsave));

                $.cookieStorage.set(variavel); //salvando valor do frete


                if ($.cookieStorage.isSet('shipping_value')) { //verificando se valor do frete foi salvo

                    $("#salvarbuttonfirstlogin").html('<i class="fa fa-spinner fa-pulse fa-2x fa-fw" aria-hidden="true"></i>');

                    loading = $.alert({
                        animation: 'zoom',
                        title: '',
                        content: '',
                        closeAnimation: 'scale',
                        animationBounce: 1.5,
                        theme: 'supervan',
                        closeIcon: false,
                        confirmButton: false,
                        backgroundDismiss: false
                    });
                    $(".jconfirm.jconfirm-supervan .jconfirm-bg").css('background-color', 'transparent');

                    CalcularParcelas();
                } else {

                    generateModalAlert("Erro ao salvar Cookie");
                    $('#mymodal').modal('show');

                }
            }





        } else if(document.getElementById("BtnPagamentoAviso").innerText == "AVISE-ME QUANDO CHEGAR") {
            saveEmailtoInform();
            $("#BtnPagamentoAviso").text('VOLTAR');
        } else if(document.getElementById("BtnPagamentoAviso").innerText == "SELECIONE A OPÇÃO DE ENTREGA ACIMA"){
            generateModalAlert("Selecione o método de entrega!");
            $('#mymodal').modal('show');
            $("#mymodal").click(function () {
                document.getElementById("codServico").focus();
            })
        }else if(document.getElementById("BtnPagamentoAviso").innerText == "FRETE PRECISA DE ENDEREÇO VÁLIDO"){
            generateModalAlert("Sem opções de frete para endereço selecionado");
            $('#mymodal').modal('show');
        } else if(document.getElementById("BtnPagamentoAviso").innerText == "VOLTAR") {
           window.location.href = 'home.html';
        }

    });



});
function sendmeanaviso(user_id, offer_id){
    var date = moment().format('YYYY-MM-DD');
    var query = "INSERT INTO email_notify_users (user_id, date_solicitation, offer_id) VALUES("+user_id+ ", \'" +date+ "\',"+offer_id+")";
   //console.log(query);
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
                window.location.href = 'home.html';
            }

        })


    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function saveEmailtoInform(){
    var email = $.cookieStorage.get('User').email;
    if(email == ""){
        generateModalAlert("Insira um e-mail");
        $('#mymodal').modal('show');
    } else
        sendmeanaviso($.cookieStorage.get('User').id, $.cookieStorage.get('Offer').id);
        generateModalAlert("Você será avisado no endereço: " + email);
         $('#mymodal').modal('show', function(){
        // window.location.href = 'home.html';
    });
}

function RequestCorreios() {

if($('#addressValue').html != ', , -') {
    var peso = document.getElementById("nVlPeso").value;
    if(document.getElementById('quantProductValue')!=null){
        var K = document.getElementById('quantProductValue').innerText;
        var pesoplusquantidade = peso*K;
    } else{
        var pesoplusquantidade = peso;
    }



        var conditionsInfo = {
        'nCdServico': document.getElementById("codServico").value,
        'sCepOrigem': document.getElementById("sCepOrigem").value,
        'sCepDestino': ((document.getElementById("sCepDestino").value).replace("-", "")).trim(),
        'nVlPeso': pesoplusquantidade,
        'nVlLargura': document.getElementById("nVlLargura").value,
        'nVlComprimento': document.getElementById("nVlComprimento").value,
        'nVlAltura': document.getElementById("nVlAltura").value

    };

    var urlInfo = 'https://'+ip+'/jezzy-mobile/public_html/php/frete.php/';

    $.ajax({
        method: "POST",
        url: urlInfo,
        data: conditionsInfo
    }).done(function (result) {
        if (document.getElementById("BtnPagamentoAviso").innerText == "AVISE-ME QUANDO CHEGAR") {
            generateModalAlert("PRODUTO INDISPONIVEL!");
            $('#mymodal').modal('show');
        } else{

            if (result.indexOf("|") != -1) {

                var valordofrete = result.split("|");
                $("#sendValue").text("");
                $("#sendValue").append('R$' + valordofrete[0]);
                $("#deliveryValue").text("");
                $("#deliveryValue").append(valordofrete[1]);
                var total = document.getElementById("offerNewPrice").innerHTML;

                $("#totalValue").text("");
                var totalmonetario = (total.split("R$"));
                var a = totalmonetario[1].replace(',', '.');
                var c = 1;
                if(document.getElementById('quantProductValue')!= null) {
                    c = document.getElementById('quantProductValue').innerText;
                }else{
                    c = 1;

                }

                var d = (c / 1) * a;
                var b = valordofrete[0].replace(',', '.');

                var totalcomfrete = monetary(parseFloat(d)+parseFloat(b));

                $("#totalValue").append(totalcomfrete);
                var totalfrete = document.getElementById("parcelsValue").innerHTML;
                var totalmonetariofrete = (totalfrete.split("R$"));
                var totalparcelascomfrete = monetary(parseFloat(totalmonetariofrete[1]) + parseFloat(b / 12));
                $("#parcelsValue").text("");
                if ($.cookieStorage.get('Offer').parcels == "ACTIVE") {
                    $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                }
               //console.log($("#BtnPagamentoAviso").innerHTML);
                if(document.getElementById('quantProductValue')!=null) {
                    if($("#BtnPagamentoAviso").innerText != '<i class="fa fa-spinner fa-pulse fa-2x fa-fw" aria-hidden="true"></i>') {
                        document.getElementById("BtnPagamentoAviso").innerText = "REALIZAR PAGAMENTO";
                        document.getElementById("BtnPagamentoAviso").disabled = false;
                    }
                }else{
                    //document.getElementById("BtnPagamentoAviso").innerText = "ESCOLHA MÉTRICAS DO PRODUTO";
                }

                RequestCorreios();

            } else {
                $("#sendValue").text("");
                $("#sendValue").append('Não foi possível calcular o valor do frete!');
               // document.getElementById("BtnPagamentoAviso").innerText = "FRETE PRECISA DE ENDEREÇO VÁLIDO";
            }


        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });


}else{
    generateModalAlert("ENDEREÇO INVÁLIDO!");
    $('#mymodal').modal('show');
    $("#addressValue").text("");
}
}





function VerificaEstoque(){
   if( document.getElementById("BtnPagamentoAviso").innerText == "AVISE-ME QUANDO CHEGAR"){

    } else{
       if(document.getElementById("sendValue").innerText != "Não foi possível calcular o valor do frete!"){
           if(document.getElementById('DisponibilidadeEstoque').html == undefined){
             //  document.getElementById("BtnPagamentoAviso").innerText = "SELECIONE FRETE E ENDEREÇO DE ENTREGA DO PRODUTO";
           }else if(document.getElementById("codServico").value == "40000") {
              // $("#BtnPagamentoAviso").text("SELECIONE A OPÇÃO DE ENTREGA ACIMA");
           } else{
              //console.log($("#BtnPagamentoAviso").innerHTML);

                   $("#BtnPagamentoAviso").text("REALIZAR PAGAMENTO");
                   document.getElementById("BtnPagamentoAviso").disabled = false;



           }
       }else{
           if(document.getElementById("codServico").value == "40000") {
              // $("#BtnPagamentoAviso").text("SELECIONE A OPÇÃO DE ENTREGA ACIMA");
           }else{
              // $("#BtnPagamentoAviso").text("SELECIONE A OPÇÃO DE ENTREGA ACIMA");
           }
       }

   }
}

function mostrarmaismetrics(Y_Name){
    $("#DisponibilidadeEstoque").html("");

    var querymetrics =  "select * from offers_metrics inner join offers_domains offery on offery.id = offers_metrics.offer_metrics_y_id inner join offers_attributes offers_attributesy on offers_attributesy.id = offery.offer_attribute_id inner join offers_domains offerx on offerx.id = offers_metrics.offer_metrics_x_id inner join offers_attributes offers_attributesx on offers_attributesx.id = offerx.offer_attribute_id where offer_id =" + $.cookieStorage.get('Offer').id + " and offery.name = '" + Y_Name + "'";

   //console.log(querymetrics);
    var conditionsMetrics={
        'General': {
            'query': querymetrics
        }
    };
    var postDataMetrics = JSON.stringify(conditionsMetrics);

    postDataMetrics = {
        'params': postDataMetrics
    };

    var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: urlMetrics,
        data: postDataMetrics
    }).done(function (result) {
        if(result!= 'ImE6MDp7fSI=') {
            var objReturnMetrics = JSON.parse(JSON.stringify(result));
            var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
            var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));
            var offerMetrics2 = "";
            for(var j=0;j<convertedReturnMetrics.length;j++){
            var MetricsSepareted2 = convertedReturnMetrics[j].offerx.name;
                $("#OfferMetrics2").html(" ");
                var isColor =  MetricsSepareted2.search("#");
               if(isColor == 0){
                offerMetrics2 += "<input type='radio' name='metrics2' class='btn btn-primary btn-xs' id='" + convertedReturnMetrics[j].offerx.id + "'  onclick='mostrarestoque(\""+convertedReturnMetrics[j].offerx.name+"\",\""+Y_Name+"\");' value=" + MetricsSepareted2 + "><i style='border: 1px solid white; background-color: "+MetricsSepareted2+"; margin-top:5%; padding-left:10px; padding-right:10px'></i>" ;
               } else if(isColor == -1) {

                   offerMetrics2 += "<input type='radio' name='metrics2' class='btn btn-primary btn-xs' id='" + convertedReturnMetrics[j].offerx.id + "'  onclick='mostrarestoque(\""+convertedReturnMetrics[j].offerx.name+"\",\""+Y_Name+"\");' value=" + MetricsSepareted2 + ">" + MetricsSepareted2;
               }
            }

            if($.cookieStorage.get('Offer').metrics != "" && $.cookieStorage.get('Offer').metrics != "," && $.cookieStorage.get('Offer').metrics != "''" ){ //metricas dinamicas
                $("#OfferMetrics2").append(offerMetrics2);

            }



        }



        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
}
function mostrarestoque(Y_Name, X_Name){

    var querymetrics =  "select * from offers_metrics inner join offers_domains offery on offery.id = offers_metrics.offer_metrics_y_id inner join offers_attributes offers_attributesy on offers_attributesy.id = offery.offer_attribute_id inner join offers_domains offerx on offerx.id = offers_metrics.offer_metrics_x_id inner join offers_attributes offers_attributesx on offers_attributesx.id = offerx.offer_attribute_id where offer_id =" + $.cookieStorage.get('Offer').id + " and offery.name = '" + X_Name + "' and offerx.name = '" + Y_Name + "'";

   //console.log(querymetrics);
    var conditionsMetrics={
        'General': {
            'query': querymetrics
        }
    };
    var postDataMetrics = JSON.stringify(conditionsMetrics);

    postDataMetrics = {
        'params': postDataMetrics
    };

    var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: urlMetrics,
        data: postDataMetrics
    }).done(function (result) {
        if(result!= 'ImE6MDp7fSI=') {
            RequestCorreios();
            var objReturnMetrics = JSON.parse(JSON.stringify(result));
            var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
            var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));
           //console.log(convertedReturnMetrics);
            for(var j=0;j<convertedReturnMetrics.length;j++){
                var Amount = convertedReturnMetrics[j].offers_metrics.amount;
                var quantidadedeprodutos = 1;

                if((Amount/1) == 0){
                    $("#DisponibilidadeEstoque").append('Produto indisponível em estoque.');
                    $("#BtnPagamentoAviso").html("AVISE-ME QUANDO CHEGAR");


                } else {
                    $("#DisponibilidadeEstoque").html("");
                    $("#BtnAddEndereco").html("");
                    $("#DisponibilidadeEstoque").append("Quantidade<br/> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantMinus'>-</button> <button type='button' class='btn btn-primary btn-xs textbuttomValue' id='quantProductValue'>1</button> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantPlus'>+</button> ");
                    VerificaEstoque(); //metricas dinamicas

                    $("#BtnAddEndereco").append("<button type='button' class='btn btn-info btn-block' style='background-color:rgba(167, 167, 95, 0.75);border-color:rgba(167, 167, 95, 0.75);bottom:6.5%;'>ALTERAR ENDEREÇO DE ENTREGA</button>");



                    $("#ProductQuantPlus").click(function () {
                        if (quantidadedeprodutos < Amount / 1) {
                            $("#quantProductValue").empty();
                            quantidadedeprodutos = quantidadedeprodutos / 1 + 1;
                            $("#quantProductValue").append(quantidadedeprodutos);
                            if(document.getElementById("sendValue") == undefined  || document.getElementById("sendValue") == null  ||document.getElementById("sendValue").innerText == ""  || document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!"){
                                var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/12);
                                $("#parcelsValue").text("");
                                if($.cookieStorage.get('Offer').parcels=="ACTIVE"){
                                    $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                }
                                RequestCorreios()
                            }else {

                                    var totalvalue = document.getElementById("offerNewPrice").innerText;
                                    var totalvaluefrete = document.getElementById("sendValue").innerText;
                                    var totalvaluemonetaryfrete = totalvaluefrete.split('R$');
                                    var totalvaluemonetary = totalvalue.split('R$');
                                    var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                                    var totalvalueatualizado = totalvaluemonetary[1].replace(",", ".");
                                    var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                    var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                    var totalsomacomquantidadedeprodutos = monetary((totalvalueatualizado2 * quantidadedeprodutos) + totalvalueatualizado2frete);
                                    $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                    var oi = monetary(((totalvalueatualizado2 * quantidadedeprodutos) + totalvalueatualizado2frete) / 12);
                                    $("#parcelsValue").text("");
                                    if ($.cookieStorage.get('Offer').parcels == "ACTIVE") {
                                        $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                    }
                                    RequestCorreios()
                            }
                        }else {
                            generateModalAlert("Desculpe, há somente " + quantidadedeprodutos + " produto(s) em estoque!");
                            $('#mymodal').modal('show');
                        }

                    });

                    $("#ProductQuantMinus").click(function () {
                        if (quantidadedeprodutos > 1) {
                            $("#quantProductValue").empty();
                            quantidadedeprodutos = quantidadedeprodutos / 1 - 1;
                            $("#quantProductValue").append(quantidadedeprodutos);
                            if(document.getElementById("sendValue") == undefined  || document.getElementById("sendValue") == null  ||document.getElementById("sendValue").innerText == ""  || document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!"){
                                var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/12);
                                $("#parcelsValue").text("");
                                if($.cookieStorage.get('Offer').parcels=="ACTIVE"){
                                    $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                }
                                RequestCorreios()
                            }else{
                                    var totalvalue = document.getElementById("offerNewPrice").innerText;
                                    var totalvaluefrete = document.getElementById("sendValue").innerText;
                                    var totalvaluemonetaryfrete = totalvaluefrete.split("R$");
                                    var totalvaluemonetary = totalvalue.split("R$");
                                    var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                                    var totalvalueatualizado = totalvaluemonetary[1].replace(",", ".");
                                    var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                    var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                var totalsomacomquantidadedeprodutos = monetary(((totalvalueatualizado2 * quantidadedeprodutos)+totalvalueatualizado2frete));
                                    $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                    var oi = monetary(((totalvalueatualizado2 * quantidadedeprodutos) + totalvalueatualizado2frete) / 12);
                                    $("#parcelsValue").text("");

                                    if ($.cookieStorage.get('Offer').parcels == "ACTIVE") {
                                        $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                    }
                                    RequestCorreios()
                            }

                        }
                    });


                }




            }



        }



    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}

function sendRequest() {
if(idaddress == ""){
    var conditions = {
        'Offer': {
            'conditions': {
                'Offer.id': id
            }
        }
    };
    var conditionsUser={
        'User': {
            'conditions': {
                'User.id':  $.cookieStorage.get('User').id
            }
        }
    };
    var postDataUser = JSON.stringify(conditionsUser);
    postDataUser = {
        'params': postDataUser
    };
    var urlUser = 'https://'+api+'/users/get/first/' + createToken();

    var postData = JSON.stringify(conditions);
    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/offers/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {

        $.ajax({
            method: "POST",
            url: urlUser,
            data: postDataUser
        }).done(function (result1) {


            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);
            var objReturnUser = JSON.parse(JSON.stringify(result1));
            var decodeObjReturnUser = Base64.decode(objReturnUser);
            var convertedReturnUser = JSON.parse(decodeObjReturnUser);
            var titulo = convertedReturn.Offer.title;
            var tituloMaiusculo = titulo.toUpperCase();

            var booleanhasaddress = false;

            if($.cookieStorage.get('User').id_address != 'NULL' && $.cookieStorage.get('User').id_address != ' ' && $.cookieStorage.get('User').id_address != 0  && $.cookieStorage.get('User').id_address != 'undefined'&& $.cookieStorage.get('User').id_address != undefined){
                var conditionsUser = {
                    'AditionalAddressesUser': {
                        'conditions': {
                            'AditionalAddressesUser.user_id': $.cookieStorage.get('User').id,
                            'AditionalAddressesUser.id': $.cookieStorage.get('User').id_address
                        }
                    }
                };

                var postDataUser = JSON.stringify(conditionsUser);
                postDataUser = {
                    'params': postDataUser
                };
                var urlUser = 'https://'+api+'/users/get/first/' + createToken();

                $.ajax({
                    method: "POST",
                    url: urlUser,
                    data: postDataUser
                }).done(function (result1) {

                    var objReturnUser = JSON.parse(JSON.stringify(result1));
                    var decodeObjReturnUser = Base64.decode(objReturnUser);
                    var convertedReturnUser = JSON.parse(decodeObjReturnUser);

                    address = convertedReturnUser.AditionalAddressesUser.address;
                    number = convertedReturnUser.AditionalAddressesUser.number;
                    city = convertedReturnUser.AditionalAddressesUser.city;
                    state =  convertedReturnUser.AditionalAddressesUser.state;
                    district = convertedReturnUser.AditionalAddressesUser.district;
                    var cep=(convertedReturnUser.AditionalAddressesUser.zip_code);
                    if(address && city && number && state && district != ''){
                        document.getElementById("address").value = address;
                        document.getElementById("number").value = number;
                        document.getElementById("city").value = city;
                        document.getElementById("state").value = state;
                        document.getElementById("district").value = district;
                        $("#addressValue").append(address+", " + number+", "+ city + " - " + state);
                    }else{
                        $("#addressValue").append('Cadastre um endereço');
                        $(".addressInfo").addClass('hide');
                    //    $("#BtnPagamentoAviso").innerText = 'CADASTRE OU SELECIONE UM ENDEREÇO ENTRE OS ADICIONAIS';
                    //    $("#BtnPagamentoAviso").text = 'CADASTRE OU SELECIONE UM ENDEREÇO ENTRE OS ADICIONAIS';
                    //    $("#BtnPagamentoAviso").innerHTML = 'CADASTRE OU SELECIONE UM ENDEREÇO ENTRE OS ADICIONAIS';
                        document.getElementById("BtnPagamentoAviso").disabled = true;
                    }




                    $("#cepValue").append(cep);

                    $("#sCepDestino").attr('value', cep);

                    if(convertedReturn.Offer.photo!=""){
                        $("#offerImage").attr('src', convertedReturn.Offer.photo);
                    }else{
                        $("#offerImage").attr('src', icons+'ImagemIndisponivel2.png');
                    }


                    $("#offerName").append(tituloMaiusculo);
                    $("#offerNameSubTitle").append(convertedReturn.Offer.title);

                    $("#nVlPeso").attr('value', convertedReturn.Offer.weight);
                    $("#nVlComprimento").attr('value', 16);
                    $("#nVlAltura").attr('value', 4);
                    $("#nVlLargura").attr('value', 12);
                    var arredondaOldPrice =convertedReturn.Offer.value;
                    var linhaoldprice = arredondaOldPrice.replace(".", ",");
                    meuLog(linhaoldprice);
                    if(convertedReturn.Offer.percentage_discount != 0){
                        $("#unitValue").append("R$" + linhaoldprice+"<br>");
                    }else{
                        $("#unitValue").append('');
                        $("#unitValueLabel").html('');
                        $("#tirar").addClass('hide');
                        $("#offerNewPriceLabel").html('Valor:');
                        document.getElementById("offerNewPriceLabel").style.fontSize = "16px";
                        document.getElementById("offerNewPrice").style.fontSize = "15px";
                    }
                    var totalvaluefrete = document.getElementById("sendValue").innerText;
                   //console.log(totalvaluefrete);
                    if(totalvaluefrete != ''){
                        var totalvaluemonetaryfrete = totalvaluefrete.split('R$');
                        var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                        var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                        var valorComDesconto = ((convertedReturn.Offer.value/100)*(100-convertedReturn.Offer.percentage_discount)+totalvalueatualizado2frete);
                    }else{
                        var valorComDesconto = ((convertedReturn.Offer.value/100)*(100-convertedReturn.Offer.percentage_discount));
                    }


                    var arredondado = valorComDesconto.toFixed(2);
                    var linha = arredondado.replace(".", ",");
                    meuLog(linha);




                    $("#offerNewPrice").append("R$" + linha);
                    $("#totalValue").append("R$"+linha+"<br>");
                    var parcelas = valorComDesconto/12;
                    var parcelasarredondado = parcelas.toFixed(2);
                    var linhaparcelas = parcelasarredondado.replace(".", ",");
                    meuLog(linhaparcelas);
                    if(convertedReturn.Offer.parcels=="ACTIVE"){
                        $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                    }

                    $("#offerCode").append(convertedReturn.Offer.id);
                    RequestCorreios();
                    //query metrics para pegar estoque de cada metrica do produto
                    var querymetrics =  "select distinct offery.name from offers_metrics inner join offers_domains offery on offery.id = offers_metrics.offer_metrics_y_id inner join offers_attributes offers_attributesy on offers_attributesy.id = offery.offer_attribute_id inner join offers_domains offerx on offerx.id = offers_metrics.offer_metrics_x_id inner join offers_attributes offers_attributesx on offers_attributesx.id = offerx.offer_attribute_id where offer_id =" + $.cookieStorage.get('Offer').id;


                    var conditionsMetrics={
                        'General': {
                            'query': querymetrics
                        }
                    };
                    var postDataMetrics = JSON.stringify(conditionsMetrics);

                    postDataMetrics = {
                        'params': postDataMetrics
                    };

                    var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


                    $.ajax({
                        method: "POST",
                        url: urlMetrics,
                        data: postDataMetrics
                    }).done(function (result) {
                        if(result!= 'ImE6MDp7fSI='){
                            var objReturnMetrics = JSON.parse(JSON.stringify(result));
                            var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
                            var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));
                            var offerMetrics ="";
                            for(var j=0;j<convertedReturnMetrics.length;j++){
                                var MetricsSepareted = convertedReturnMetrics[j].offery.name;
                                var isColor =  MetricsSepareted.search("#");
                                if(isColor == 0){
                                    offerMetrics += "<input type='radio' name='metrics' class='btn btn-primary btn-xs' id='" + convertedReturnMetrics[j].offerx.id + "' onclick='mostrarmaismetrics(\""+convertedReturnMetrics[j].offery.name+"\");' value=" + MetricsSepareted + "><i style='border: 1px solid white; background-color: "+MetricsSepareted+"; margin-top:5%; padding-left:10px; padding-right:10px'></i>" ;
                                } else if(isColor == -1) {

                                    offerMetrics += '<input type="radio" name="metrics" class="btn btn-primary btn-xs" onclick="mostrarmaismetrics(\''+convertedReturnMetrics[j].offery.name+'\');"  value='+MetricsSepareted+'>'+MetricsSepareted;
                                }

                            }

                            if(convertedReturn.Offer.metrics!=""){ //metricas dinamicas
                                $("#OfferMetrics").append(offerMetrics);
                            }


                        }else{
                            var quantidadedeprodutos = 1;
                            if((convertedReturn.Offer.amount_allowed/1) == 0){
                                $("#DisponibilidadeEstoque").append('Produto indisponível em estoque.');
                                $("#BtnPagamentoAviso").html("AVISE-ME QUANDO CHEGAR");


                            } else {

                                $("#DisponibilidadeEstoque").append("Quantidade<br/>  <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantMinus'>-</button> <button type='button' class='btn btn-primary btn-xs textbuttomValue' id='quantProductValue'>1</button> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantPlus'>+</button>");
                                VerificaEstoque(); //metricas dinamicas

                                $("#BtnAddEndereco").append("<button type='button' class='btn btn-info btn-block' style='background-color:rgba(167, 167, 95, 0.75);border-color:rgba(167, 167, 95, 0.75);bottom:6.5%;'>ALTERAR ENDEREÇO DE ENTREGA</button>");



                                $("#ProductQuantPlus").click(function () {
                                    if (quantidadedeprodutos < convertedReturn.Offer.amount_allowed / 1) {
                                        $("#quantProductValue").empty();
                                        quantidadedeprodutos = quantidadedeprodutos / 1 + 1;
                                        $("#quantProductValue").append(quantidadedeprodutos);
                                        if(document.getElementById("sendValue").innerText == "" || document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!"){
                                            var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                            var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                            var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                            var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                            var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                            $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                            var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/12);
                                            $("#parcelsValue").text("");
                                            if(convertedReturn.Offer.parcels=="ACTIVE"){
                                                $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                            }
                                            RequestCorreios()
                                        }else{
                                            var totalvalue = document.getElementById("offerNewPrice").innerText;
                                            var totalvaluefrete = document.getElementById("sendValue").innerText;
                                            var totalvaluemonetaryfrete = totalvaluefrete.split('R$');
                                            var totalvaluemonetary = totalvalue.split('R$');
                                            var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                                            var totalvalueatualizado = totalvaluemonetary[1].replace(",", ".");
                                            var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                            var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                            var totalsomacomquantidadedeprodutos = monetary(((totalvalueatualizado2 * quantidadedeprodutos)+totalvalueatualizado2frete));
                                            $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                            var oi = monetary(((totalvalueatualizado2*quantidadedeprodutos)+totalvalueatualizado2frete)/12);
                                            $("#parcelsValue").text("");
                                            if(convertedReturn.Offer.parcels=="ACTIVE"){
                                                $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                            }
                                            RequestCorreios()

                                        }

                                    }else {
                                        generateModalAlert("Desculpe, há somente " + quantidadedeprodutos + " produto(s) em estoque!");
                                        $('#mymodal').modal('show');
                                    }

                                });

                                $("#ProductQuantMinus").click(function () {
                                    if (quantidadedeprodutos > 1) {
                                        $("#quantProductValue").empty();
                                        quantidadedeprodutos = quantidadedeprodutos / 1 - 1;
                                        $("#quantProductValue").append(quantidadedeprodutos);
                                        if(document.getElementById("sendValue").innerText == ""|| document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!"){
                                            var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                            var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                            var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                            var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                            var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                            $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                            var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/12);
                                            $("#parcelsValue").text("");
                                            if(convertedReturn.Offer.parcels=="ACTIVE"){
                                                $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                            }
                                            RequestCorreios()
                                        }else{
                                            var totalvalue = document.getElementById("offerNewPrice").innerText;
                                            var totalvaluefrete = document.getElementById("sendValue").innerText;
                                            var totalvaluemonetaryfrete =  totalvaluefrete.split("R$");
                                            var totalvaluemonetary =  totalvalue.split("R$");
                                            var totalvalueatualizadofrete  = totalvaluemonetaryfrete[1].replace(",", ".");
                                            var totalvalueatualizado  = totalvaluemonetary[1].replace(",", ".");
                                            var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                            var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                            var totalsomacomquantidadedeprodutos = monetary(((totalvalueatualizado2 * quantidadedeprodutos)+totalvalueatualizado2frete));
                                            $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                            var oi = monetary(((totalvalueatualizado2*quantidadedeprodutos))/12);
                                            $("#parcelsValue").text("");
                                            if(convertedReturn.Offer.parcels=="ACTIVE"){
                                                $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                            }
                                        }

                                        RequestCorreios()


                                    }
                                });


                            }
                        }

                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });


                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });

            }else{
                if(convertedReturn.Offer.photo!=""){
                    $("#offerImage").attr('src', convertedReturn.Offer.photo);
                }else{
                    $("#offerImage").attr('src', icons+'ImagemIndisponivel2.png');
                }


                $("#offerName").append(tituloMaiusculo);
                $("#offerNameSubTitle").append(convertedReturn.Offer.title);

                $("#nVlPeso").attr('value', convertedReturn.Offer.weight);
                $("#nVlComprimento").attr('value', 16);
                $("#nVlAltura").attr('value', 4);
                $("#nVlLargura").attr('value', 12);
                var arredondaOldPrice =convertedReturn.Offer.value;
                var linhaoldprice = arredondaOldPrice.replace(".", ",");
                meuLog(linhaoldprice);
                if(convertedReturn.Offer.percentage_discount != 0){
                    $("#unitValue").append("R$" + linhaoldprice+"<br>");
                }else{
                    $("#unitValue").append('');
                    $("#unitValueLabel").html('');
                    $("#tirar").addClass('hide');
                    $("#offerNewPriceLabel").html('Valor:');
                    document.getElementById("offerNewPriceLabel").style.fontSize = "16px";
                    document.getElementById("offerNewPrice").style.fontSize = "15px";
                }
                var totalvaluefrete = document.getElementById("sendValue").innerText;
                if(totalvaluefrete != '') {
                    var totalvaluemonetaryfrete = totalvaluefrete.split('R$');
                    var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                    var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                    var valorComDesconto = ((convertedReturn.Offer.value / 100) * (100 - convertedReturn.Offer.percentage_discount) + totalvalueatualizado2frete);
                }else{
                    var valorComDesconto = ((convertedReturn.Offer.value / 100) * (100 - convertedReturn.Offer.percentage_discount));
                }
                var arredondado = valorComDesconto.toFixed(2);
                var linha = arredondado.replace(".", ",");
                meuLog(linha);
                $("#offerNewPrice").append("R$" + linha);
                $("#totalValue").append("R$"+linha+"<br>");
                var parcelas = valorComDesconto/12;
                var parcelasarredondado = parcelas.toFixed(2);
                var linhaparcelas = parcelasarredondado.replace(".", ",");
                meuLog(linhaparcelas);
                if(convertedReturn.Offer.parcels=="ACTIVE"){
                    $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                }

                $("#offerCode").append(convertedReturn.Offer.id);
                RequestCorreios();
                //query metrics para pegar estoque de cada metrica do produto
                var querymetrics =  "select distinct offery.name from offers_metrics inner join offers_domains offery on offery.id = offers_metrics.offer_metrics_y_id inner join offers_attributes offers_attributesy on offers_attributesy.id = offery.offer_attribute_id inner join offers_domains offerx on offerx.id = offers_metrics.offer_metrics_x_id inner join offers_attributes offers_attributesx on offers_attributesx.id = offerx.offer_attribute_id where offer_id =" + $.cookieStorage.get('Offer').id;


                var conditionsMetrics={
                    'General': {
                        'query': querymetrics
                    }
                };
                var postDataMetrics = JSON.stringify(conditionsMetrics);

                postDataMetrics = {
                    'params': postDataMetrics
                };

                var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


                $.ajax({
                    method: "POST",
                    url: urlMetrics,
                    data: postDataMetrics
                }).done(function (result) {
                    if(result!= 'ImE6MDp7fSI='){
                        var objReturnMetrics = JSON.parse(JSON.stringify(result));
                        var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
                        var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));
                        var offerMetrics ="";
                        for(var j=0;j<convertedReturnMetrics.length;j++){
                            var MetricsSepareted = convertedReturnMetrics[j].offery.name;
                            var isColor =  MetricsSepareted.search("#");
                            if(isColor == 0){
                                offerMetrics += "<input type='radio' name='metrics' class='btn btn-primary btn-xs' id='" + convertedReturnMetrics[j].offerx.id + "' onclick='mostrarmaismetrics(\""+convertedReturnMetrics[j].offery.name+"\");' value=" + MetricsSepareted + "><i style='border: 1px solid white; background-color: "+MetricsSepareted+"; margin-top:5%; padding-left:10px; padding-right:10px'></i>" ;
                            } else if(isColor == -1) {

                                offerMetrics += '<input type="radio" name="metrics" class="btn btn-primary btn-xs" onclick="mostrarmaismetrics(\''+convertedReturnMetrics[j].offery.name+'\');"  value='+MetricsSepareted+'>'+MetricsSepareted;
                            }

                        }

                        if(convertedReturn.Offer.metrics!=""){ //metricas dinamicas
                            $("#OfferMetrics").append(offerMetrics);
                        }


                    }else{
                        var quantidadedeprodutos = 1;
                        if((convertedReturn.Offer.amount_allowed/1) == 0){
                            $("#DisponibilidadeEstoque").append('Produto indisponível em estoque.');
                            $("#BtnPagamentoAviso").html("AVISE-ME QUANDO CHEGAR");


                        } else {

                            $("#DisponibilidadeEstoque").append("Quantidade<br/> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantMinus'>-</button> <button type='button' class='btn btn-primary btn-xs textbuttomValue' id='quantProductValue'>1</button> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantPlus'>+</button> ");
                            VerificaEstoque(); //metricas dinamicas

                            $("#BtnAddEndereco").append("<button type='button' class='btn btn-info btn-block' style='background-color:rgba(167, 167, 95, 0.75);border-color:rgba(167, 167, 95, 0.75);bottom:6.5%;'>ALTERAR ENDEREÇO DE ENTREGA</button>");



                            $("#ProductQuantPlus").click(function () {
                                if (quantidadedeprodutos < convertedReturn.Offer.amount_allowed / 1) {
                                    $("#quantProductValue").empty();
                                    quantidadedeprodutos = quantidadedeprodutos / 1 + 1;
                                    $("#quantProductValue").append(quantidadedeprodutos);
                                    if(document.getElementById("sendValue").innerText == "" || document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!"){
                                        var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                        var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                        var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                        var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                        var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                        $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                        var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/12);
                                        $("#parcelsValue").text("");
                                        if(convertedReturn.Offer.parcels=="ACTIVE"){
                                            $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                        }
                                        RequestCorreios();
                                    }else{
                                        var totalvalue = document.getElementById("offerNewPrice").innerText;
                                        var totalvaluefrete = document.getElementById("sendValue").innerText;
                                        var totalvaluemonetaryfrete = totalvaluefrete.split('R$');
                                        var totalvaluemonetary = totalvalue.split('R$');
                                        var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                                        var totalvalueatualizado = totalvaluemonetary[1].replace(",", ".");
                                        var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                        var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                        var totalsomacomquantidadedeprodutos = monetary(((totalvalueatualizado2 * quantidadedeprodutos)+totalvalueatualizado2frete));
                                        $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                        var oi = monetary(((totalvalueatualizado2*quantidadedeprodutos)+totalvalueatualizado2frete)/12);
                                        $("#parcelsValue").text("");
                                        if(convertedReturn.Offer.parcels=="ACTIVE"){
                                            $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                        }
                                        RequestCorreios();

                                    }

                                }else {
                                    generateModalAlert("Desculpe, há somente " + quantidadedeprodutos + " produto(s) em estoque!");
                                    $('#mymodal').modal('show');
                                }

                            });

                            $("#ProductQuantMinus").click(function () {
                                if (quantidadedeprodutos > 1) {
                                    $("#quantProductValue").empty();
                                    quantidadedeprodutos = quantidadedeprodutos / 1 - 1;
                                    $("#quantProductValue").append(quantidadedeprodutos);
                                    if(document.getElementById("sendValue").innerText == ""|| document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!"){
                                        var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                        var totalvaluemonetarysemfrete =  totalvaluesemfrete.split("R$");
                                        var totalvalueatualizadosemfrete  = totalvaluemonetarysemfrete[1].replace(",", ".");
                                        var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                        var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos));
                                        $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                        var oi = monetary((totalvalueatualizado2semfrete*quantidadedeprodutos)/12);
                                        $("#parcelsValue").text("");
                                        if(convertedReturn.Offer.parcels=="ACTIVE"){
                                            $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                        }
                                        RequestCorreios()
                                    }else{
                                        var totalvalue = document.getElementById("offerNewPrice").innerText;
                                        var totalvaluefrete = document.getElementById("sendValue").innerText;
                                        var totalvaluemonetaryfrete =  totalvaluefrete.split("R$");
                                        var totalvaluemonetary =  totalvalue.split("R$");
                                        var totalvalueatualizadofrete  = totalvaluemonetaryfrete[1].replace(",", ".");
                                        var totalvalueatualizado  = totalvaluemonetary[1].replace(",", ".");
                                        var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                        var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                        var totalsomacomquantidadedeprodutos = monetary(((totalvalueatualizado2 * quantidadedeprodutos)+totalvalueatualizado2frete));
                                        $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                        var oi = monetary(((totalvalueatualizado2*quantidadedeprodutos))/12);
                                        $("#parcelsValue").text("");
                                        if(convertedReturn.Offer.parcels=="ACTIVE"){
                                            $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                        }
                                    }

                                    RequestCorreios();


                                }
                            });

                        }
                    }

                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });


                    $("#clickbtncadenderecoprincipal").click();




            }


        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
} else{

    var conditions = {
        'Offer': {
            'conditions': {
                'Offer.id': id
            }
        }
    };
    var conditionsUser = {
        'AditionalAddressesUser': {
            'conditions': {
                'AditionalAddressesUser.id':idaddress
            }
        }
    };
    var postDataUser = JSON.stringify(conditionsUser);
    postDataUser = {
        'params': postDataUser
    };
    var urlUser = 'https://'+api+'/users/get/first/' + createToken();

    var postData = JSON.stringify(conditions);
    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/offers/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {

        $.ajax({
            method: "POST",
            url: urlUser,
            data: postDataUser
        }).done(function (result1) {


            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);
            var objReturnUser = JSON.parse(JSON.stringify(result1));
            var decodeObjReturnUser = Base64.decode(objReturnUser);
            var convertedReturnUser = JSON.parse(decodeObjReturnUser);
            var titulo = convertedReturn.Offer.title;
            var tituloMaiusculo = titulo.toUpperCase();

            address = convertedReturnUser.AditionalAddressesUser.address;
            number = convertedReturnUser.AditionalAddressesUser.number;
            city = convertedReturnUser.AditionalAddressesUser.city;
            state =  convertedReturnUser.AditionalAddressesUser.state;
            district = convertedReturnUser.AditionalAddressesUser.district;
            document.getElementById("address").value = address;
            document.getElementById("number").value = number;
            document.getElementById("city").value = city;
            document.getElementById("state").value = state;
            document.getElementById("district").value = district;

            $("#addressValue").append(convertedReturnUser.AditionalAddressesUser.address+", " + convertedReturnUser.AditionalAddressesUser.number+", "+ convertedReturnUser.AditionalAddressesUser.city + " - " + convertedReturnUser.AditionalAddressesUser.state);
            $("#cepValue").append(convertedReturnUser.AditionalAddressesUser.zip_code);
            var cep=(convertedReturnUser.AditionalAddressesUser.zip_code);
            $("#sCepDestino").attr('value', cep);

            if(convertedReturn.Offer.photo!=""){
                $("#offerImage").attr('src', convertedReturn.Offer.photo);
            }else{
                $("#offerImage").attr('src', icons+'ImagemIndisponivel2.png');
            }


            $("#offerName").append(tituloMaiusculo);
            $("#offerNameSubTitle").append(convertedReturn.Offer.title);
            var arredondaOldPrice =convertedReturn.Offer.value;
            $("#nVlPeso").attr('value', convertedReturn.Offer.weight);
            $("#nVlComprimento").attr('value', 16);
            $("#nVlAltura").attr('value', 4);
            $("#nVlLargura").attr('value', 12);
            var linhaoldprice = arredondaOldPrice.replace(".", ",");
            meuLog(linhaoldprice);
            $("#unitValue").append("R$" + linhaoldprice+"<br>");
            var totalvaluefrete = document.getElementById("sendValue").innerText;
            if(totalvaluefrete!=''){
                var totalvaluemonetaryfrete = totalvaluefrete.split('R$');
                var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                var valorComDesconto = ((convertedReturn.Offer.value/100)*(100-convertedReturn.Offer.percentage_discount)+totalvalueatualizado2frete);
            }else{
                var valorComDesconto = ((convertedReturn.Offer.value/100)*(100-convertedReturn.Offer.percentage_discount));
            }


            var arredondado = valorComDesconto.toFixed(2);
            var linha = arredondado.replace(".", ",");
            meuLog(linha);
            $("#offerNewPrice").append("R$" + linha);
            $("#totalValue").append("R$"+linha+"<br>");
            var parcelas = valorComDesconto/12;
            var parcelasarredondado = parcelas.toFixed(2);
            var linhaparcelas = parcelasarredondado.replace(".", ",");
            meuLog(linhaparcelas);
            if(convertedReturn.Offer.parcels=="ACTIVE"){
                $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
            }
            $("#textOffer").append(convertedReturn.Offer.resume +"<br>");
            $("#offerCode").append(convertedReturn.Offer.id);
            RequestCorreios();
            var querymetrics =  "select distinct offery.name from offers_metrics inner join offers_domains offery on offery.id = offers_metrics.offer_metrics_y_id inner join offers_attributes offers_attributesy on offers_attributesy.id = offery.offer_attribute_id inner join offers_domains offerx on offerx.id = offers_metrics.offer_metrics_x_id inner join offers_attributes offers_attributesx on offers_attributesx.id = offerx.offer_attribute_id where offer_id =" + $.cookieStorage.get('Offer').id;


            var conditionsMetrics={
                'General': {
                    'query': querymetrics
                }
            };
            var postDataMetrics = JSON.stringify(conditionsMetrics);

            postDataMetrics = {
                'params': postDataMetrics
            };

            var urlMetrics = 'https://'+api+'/General/get/query/' + createToken();


            $.ajax({
                method: "POST",
                url: urlMetrics,
                data: postDataMetrics
            }).done(function (result) {
                if(result!= 'ImE6MDp7fSI='){
                    var objReturnMetrics = JSON.parse(JSON.stringify(result));
                    var decodeObjReturnMetrics = Base64.decode(objReturnMetrics);
                    var convertedReturnMetrics = unserialize(JSON.parse(decodeObjReturnMetrics));
                    var offerMetrics = "";
                    for(var j=0;j<convertedReturnMetrics.length;j++){
                        var MetricsSepareted = convertedReturnMetrics[j].offery.name;
                        var isColor =  MetricsSepareted.search("#");
                        if(isColor == 0){
                            offerMetrics += "<input type='radio' name='metrics' class='btn btn-primary btn-xs' id='" + convertedReturnMetrics[j].offerx.id + "' onclick='mostrarmaismetrics(\""+convertedReturnMetrics[j].offery.name+"\");' value=" + MetricsSepareted + "><i style='border: 1px solid white; background-color: "+MetricsSepareted+"; margin-top:5%; padding-left:10px; padding-right:10px'></i>" ;
                        } else if(isColor == -1) {

                            offerMetrics += '<input type="radio" name="metrics" class="btn btn-primary btn-xs" onclick="mostrarmaismetrics(\''+convertedReturnMetrics[j].offery.name+'\');"  value='+MetricsSepareted+'>'+MetricsSepareted;
                        }

                    }

                    if(convertedReturn.Offer.metrics!=""){ //metricas dinamicas
                        $("#OfferMetrics").append(offerMetrics);
                    }

                }else {



                    if (convertedReturn.Offer.metrics != "") {
                        $("#OfferMetrics").append(offerMetrics);
                    }
                    var quantidadedeprodutos = 1;
                    if ((convertedReturn.Offer.amount_allowed / 1) == 0) {
                        $("#DisponibilidadeEstoque").append('Produto indisponível em estoque.');
                        $("#BtnPagamentoAviso").append("AVISE-ME QUANDO CHEGAR");


                    } else {

                        $("#DisponibilidadeEstoque").append("Quantidade<br/><button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantMinus'>-</button> <button type='button' class='btn btn-primary btn-xs textbuttomValue' id='quantProductValue' onclick='QuantProduct()'>1</button> <button type='button' class='btn btn-primary btn-xs textbuttom' id='ProductQuantPlus'>+</button> ");
                        VerificaEstoque();

                        $("#BtnAddEndereco").append("<button type='button' class='btn btn-info btn-block' style='background-color:rgba(167, 167, 95, 0.75);border-color:rgba(167, 167, 95, 0.75);bottom:6.5%;'>ALTERAR ENDEREÇO DE ENTREGA</button>");


                        $("#ProductQuantPlus").click(function () {
                            if (quantidadedeprodutos < convertedReturn.Offer.amount_allowed / 1) {
                                $("#quantProductValue").empty();
                                quantidadedeprodutos = quantidadedeprodutos / 1 + 1;
                                $("#quantProductValue").append(quantidadedeprodutos);
                                if (document.getElementById("sendValue").innerText == ""|| document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!") {
                                    var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                    if(totalvalue!=undefined){
                                        var totalvaluemonetarysemfrete = totalvaluesemfrete.split('R$');
                                        }
                                    var totalvalueatualizadosemfrete = totalvaluemonetarysemfrete[1].replace(",", ".");
                                    var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                    var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete * quantidadedeprodutos));
                                    $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                    var oi = monetary((totalvalueatualizado2semfrete * quantidadedeprodutos) / 12);
                                    $("#parcelsValue").text("");
                                    if (convertedReturn.Offer.parcels == 'ACTIVE') {
                                        $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                    }
                                    RequestCorreios()
                                } else
                                        var totalvalue = document.getElementById("offerNewPrice").innerText;
                                        var totalvaluefrete = document.getElementById("sendValue").innerText;
                                        var totalvaluemonetaryfrete = totalvaluefrete.split('R$');
										if(totalvalue!=undefined){
                                        var totalvaluemonetary = totalvalue.split('R$');
                                        }
                                        var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                                        var totalvalueatualizado = totalvaluemonetary[1].replace(",", ".");
                                        var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                        var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                        var totalsomacomquantidadedeprodutos = monetary(((totalvalueatualizado2 * quantidadedeprodutos)+totalvalueatualizado2frete));
                                        $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                        var oi = monetary(((totalvalueatualizado2 * quantidadedeprodutos) ) / 12);
                                        $("#parcelsValue").text("");
                                        if (convertedReturn.Offer.parcels == 'ACTIVE') {
                                            $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                        }
                                        RequestCorreios()


                            } else {
                                generateModalAlert("Desculpe, há somente " + quantidadedeprodutos + " produto(s) em estoque!");
                                $('#mymodal').modal('show');
                            }

                        });

                        $("#ProductQuantMinus").click(function () {
                            if (quantidadedeprodutos > 1) {
                                $("#quantProductValue").empty();
                                quantidadedeprodutos = quantidadedeprodutos / 1 - 1;
                                $("#quantProductValue").append(quantidadedeprodutos);
                                if (document.getElementById("sendValue").innerText == "" || document.getElementById("sendValue").innerText == "Não foi possível calcular o valor do frete!") {
                                    var totalvaluesemfrete = document.getElementById("offerNewPrice").innerText;
                                    var totalvaluemonetarysemfrete = totalvaluesemfrete.split("R$");
                                    var totalvalueatualizadosemfrete = totalvaluemonetarysemfrete[1].replace(",", ".");
                                    var totalvalueatualizado2semfrete = parseFloat(totalvalueatualizadosemfrete);
                                    var totalsomacomquantidadedeprodutossemfrete = monetary((totalvalueatualizado2semfrete * quantidadedeprodutos));
                                    $("#totalValue").text(totalsomacomquantidadedeprodutossemfrete);
                                    var oi = monetary((totalvalueatualizado2semfrete * quantidadedeprodutos) / 12);
                                    $("#parcelsValue").text("");
                                    if (convertedReturn.Offer.parcels == 'ACTIVE') {
                                        $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                    }
                                    RequestCorreios()
                                } else {
                                        var totalvalue = document.getElementById("offerNewPrice").innerText;
                                        var totalvaluefrete = document.getElementById("sendValue").innerText;
                                        var totalvaluemonetaryfrete = totalvaluefrete.split("R$");
                                        var totalvaluemonetary = totalvalue.split("R$");
                                        var totalvalueatualizadofrete = totalvaluemonetaryfrete[1].replace(",", ".");
                                        var totalvalueatualizado = totalvaluemonetary[1].replace(",", ".");
                                        var totalvalueatualizado2frete = parseFloat(totalvalueatualizadofrete);
                                        var totalvalueatualizado2 = parseFloat(totalvalueatualizado);
                                        var totalsomacomquantidadedeprodutos = monetary(((totalvalueatualizado2 * quantidadedeprodutos)+totalvalueatualizado2frete));
                                        $("#totalValue").text(totalsomacomquantidadedeprodutos);
                                        var oi = monetary(((totalvalueatualizado2 * quantidadedeprodutos) ) / 12);
                                        $("#parcelsValue").text("");
                                        if (convertedReturn.Offer.parcels == 'ACTIVE') {
                                            $("#parcelsValue").append("ou em até "+$.cookieStorage.get('Offer').parcels_quantity+"x no cartão de crédito.");
                                        }
                                        RequestCorreios()
                                    }
                                }

                        });


                    }
                }

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}

}

function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}

function generateModalAlert(mensagem) {
    if ($("#mymodal").length) {
        $("#messageModelGoesHere").html(mensagem);
    } else {
        $modalHtml =
            '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
            + '<div class="modal-dialog modal-sm">'
            + '<div class="modal-content" id="messageModelGoesHere">'
            + mensagem
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}


function meuLog(msg) {
    span = document.body;
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
function VerificarFimDigitacaoCep(){
    var cep4 =  document.getElementById("ceplabel").value;
    var cep2 = cep4.replace("-", " ");
    var cep3 = cep2.replace(" ", "");
    var cep5 = cep3.replace("_", " ");
    var cep = cep5.trim();
    if(cep.length == 8){
        var enviarcepparafuncao = cep.replace("-", " ");

        getEndereco(enviarcepparafuncao.trim());
    }else{
        $("#citylabel").val("");
        $("#statelabel").val("");
        $("#addresslabel").val("");
        $("#bairrolabel").val("");
        document.getElementById("citylabel").disabled = false;
        document.getElementById("statelabel").disabled = false;
        document.getElementById("addresslabel").disabled = false;
        document.getElementById("bairrolabel").disabled = false;

    }

}
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('addresslabel').value=("");
    document.getElementById('bairrolabel').value=("");
    document.getElementById('citylabel').value=("");
    document.getElementById('statelabel').value=("");

}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('addresslabel').value=(conteudo.logradouro);
        document.getElementById('bairrolabel').value=(conteudo.bairro);
        document.getElementById('citylabel').value=(conteudo.localidade);
        document.getElementById('statelabel').value=(conteudo.uf);

    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        //$("#loadingCep").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Aguardando preenchimento correto do CEP</div>');
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('addresslabel').value="...";
            document.getElementById('bairrolabel').value="...";
            document.getElementById('citylabel').value="...";
            document.getElementById('statelabel').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();

           // $("#loadingCep").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Aguardando preenchimento correto do CEP</div>');
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
function getEndereco(cep1) {
    var cep2 = cep1.replace("-", " ");
    var cep5 = cep2.replace(" ", "");
    var cep = cep5.replace("_", " ");

    if($.trim(cep) != "" && ($.trim(cep)).length == 8){
        var ceptrm = cep.trim();
        pesquisacep(ceptrm);
    } else{

    }
}
function CalcularParcelas(){
    var url = 'php/QueryParcels.php';

    $.ajax({
        method: "POST",
        url: url

    }).done(function(result) {

        $.cookieStorage.set('tokenparcels', result);

        window.location.href = "payment.html";

       // $("#MoipWidget").attr('data-token', result);

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
$(document).ready(function () {


    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;


});
var offer_history_ID = '';
function Click(id){
    var conditionsOffer = {
        'Checkout': {
            'conditions' : {
                'Checkout.id':id
            }
        }
    };
    var postDataOffer = JSON.stringify(conditionsOffer);

    postDataOffer = {
        'params': postDataOffer
    };
    var urlOffer = 'https://'+api+'/payments/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: urlOffer,
        data: postDataOffer

    }).done(function(result) {

        var objReturnOffer = JSON.parse(JSON.stringify(result));
        var decodeObjReturnOffer = Base64.decode(objReturnOffer);
        var convertedReturnOffer = JSON.parse(decodeObjReturnOffer);

        $.cookieStorage.set(convertedReturnOffer);



        if ($.cookieStorage.isSet('Checkout')) {
            window.location.href = "offer_detail.html";
        } else {

        }




    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}

$(document).ready(function() {
    sendRequest();
});
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
function EnviarBoleto(email, link, id, qtdcheckout, date, orderid){

if(moment(date)>=moment().subtract(3, 'days')){

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

            if(convertedReturnOffer.Offer.amount_allowed >= qtdcheckout){

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
                                email:email
                            }

                        }).done(function(result) {
                          
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
}else{






    /*
//gerar novo boleto com nova data

    $.ajax({
        method: "POST",
        url: 'https://secure.jezzy.com.br/jezzy-mobile/public_html/php/newboleto.php',
        data: {
            orderId:orderid
        }

    }).done(function(result) {
       //console.log(result);


    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });*/
}
}
function volta(){
    window.history.go(-1);
}
function sendmeanaviso(user_id, offer_id){
    var date = moment().format('YYYY-MM-DD');
    var query = "INSERT INTO email_notify_users (user_id, date_solicitation, offer_id) VALUES("+user_id+ ", \'" +date+ "\',"+offer_id+")";
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
function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
}
function cancelorder(orderid){
    var query = "UPDATE checkouts SET payment_state_id = 2 WHERE order_id = "+orderid;

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
function sendRequest() {
    var query = "SELECT * from checkouts Checkout inner join offers Offer on Offer.id = Checkout.offer_id where Checkout.user_id = "+$.cookieStorage.get('User').id + " ORDER BY Checkout.id DESC";

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

            var servico;
            var offer_history_ID;

            for(var i=0; i<convertedReturn.length;i++) {
                servico = convertedReturn[i];
                offer_history_ID = servico.Checkout.offer_id;



                var data =   moment(servico.Checkout.date).format('DD/MM');

                var iddacompra = servico.Checkout.id;
                var status = servico.Checkout.payment_state_id;


                switch(status){
                    case '1':
                        status= "AUTORIZADO";
                        break;
                    case '2':
                        status= "INICIADO";
                        break;
                    case '3':
                        status= "BOLETO IMPRESSO";
                        break;
                    case '4':
                        status= "CONCLUIDO";
                        break;
                    case '5':
                        status=  "CANCELADO";
                        break;
                    case '6':
                        status= "EM ANALISE";
                        break;
                    case '7':
                        status= "ESTORNADO";
                        break;
                    case '8':
                        status=  "EM REVISAO";
                        break;
                    case '9':
                        status=  "REEMBOLSADO";
                        break;
                    case '14':
                        status= "INICIO DA TRANSACAO";
                        break;
                }
                var valorcomdesconto1 = parseFloat(servico.Checkout.total_value);
                var val = (valorcomdesconto1.toString()).replace(",",".");
                var val2  = (val/1).toFixed(2);
                var valorcomdesconto2 = parseFloat(val2) ;
                var texto = "";
                if(servico.Checkout.payment_method_id == 73){
                    if(moment(servico.Checkout.date)>=moment().subtract(3, 'days')) {
                        $("#Offer_History").append("<div class='row'  style='border-bottom:0.5px solid rgba(163, 162, 155, 0.33);padding-top:2%;padding-bottom:2%;'><div class='col-xs-3 tablecontent' style='margin-bottom:2%;' id='" + servico.Checkout.id + "' onclick='Click(" + servico.Checkout.id + ")'>" + servico.Offer.title + "</div><div class='col-xs-2 tablecontent' onclick='Click(" + servico.Checkout.id + ")' id='date' >" + data + "</div><div class='col-xs-2 tablecontent' id='value'>" + monetary((valorcomdesconto2).toFixed(2)) + "</div><div onclick='Click(" + servico.Checkout.id + ")' class='col-xs-3  tablecontent' id='status'>" + status + "</div><div class='col-xs-2 tablecontent link' style='color: white!important;padding: 2%;box-shadow: inset 0 2px 3px 0 rgba(255,255,255,.3), inset 0 -3px 6px 0 rgba(0,0,0,.2), 0 3px 2px 0 rgba(0,0,0,.2);background-image: linear-gradient(to bottom, #2597AC, #139fb9 130%);' id='number' onclick='EnviarBoleto(\"" + $.cookieStorage.get('User').email + "\",\"" + servico.Checkout.boleto_link + "\", \"" + servico.Checkout.offer_id + "\", \"" + servico.Checkout.amount + "\", \"" + servico.Checkout.date + "\", \"" + servico.Checkout.order_id + "\");'>BOLETO</div></div>");
                    }else{
                        $("#Offer_History").append("<div class='row'  style='border-bottom:0.5px solid rgba(163, 162, 155, 0.33);padding-top:2%;padding-bottom:2%;'><div class='col-xs-3 tablecontent' style='margin-bottom:2%;' id='" + servico.Checkout.id + "' onclick='Click(" + servico.Checkout.id + ")'>" + servico.Offer.title + "</div><div class='col-xs-2 tablecontent' onclick='Click(" + servico.Checkout.id + ")' id='date' >" + data + "</div><div class='col-xs-2 tablecontent' id='value'>" + monetary((valorcomdesconto2).toFixed(2)) + "</div><div onclick='Click(" + servico.Checkout.id + ")' class='col-xs-3  tablecontent' id='status'>" + status + "</div><div class='col-xs-2 tablecontent' style='padding: 2%;' id='number'>BOLETO</div></div>");
                    }
                }else{
                    $("#Offer_History").append("<div  class='row' style='border-bottom:0.5px solid rgba(163, 162, 155, 0.33);padding-top:2%;padding-bottom:2%;' ><div class='col-xs-3 tablecontent' style='margin-bottom:2%;' id='"+servico.Checkout.id+"' onclick='Click("+servico.Checkout.id+")'>"+servico.Offer.title+"</div><div class='col-xs-2 tablecontent' onclick='Click("+servico.Checkout.id+")' id='date' >"+data+"</div><div class='col-xs-2 tablecontent' onclick='Click("+servico.Checkout.id+")' id='value'>"+monetary((valorcomdesconto2).toFixed(2))+"</div><div class='col-xs-3 tablecontent' style='padding: 2%;' id='status' onclick='Click("+servico.Checkout.id+")'>"+status+"</div><div onclick='Click("+servico.Checkout.id+")' class='col-xs-2 tablecontent' id='number'>CRÉDITO</div></div>");
                }



            }
        }else{
            var txt0 = utf8_decode('compras');
            var txt = 'histórico';
            $("#Offer_History").append('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Sem '+txt+' de '+txt0+'</div>');
        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}




function meuLog(msg) {
    div = document.body;

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
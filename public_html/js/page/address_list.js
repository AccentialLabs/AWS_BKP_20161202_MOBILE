var id = 0;
var string = document.cookie.split(":");
id = string[1];

$(document).ready(function() {
   //console.log($.cookieStorage.get('User').id_address);
    sendRequest();

        document.getElementById("userName").innerText = $.cookieStorage.get('User').name;


$("#addadress").click(function () {
			window.location.href = "address_new.html";
    
});

});
function AlterarEnderecoFixo(){

    $.cookieStorage.remove('AditionalAddressesUser');
    $.cookieStorage.set('usuario', 'sim');

    if ($.cookieStorage.isSet('usuario')) {

        generateModalAlert("Seu endereço de cadastro não será alterado"); //modal jquery confirm
        $('#mymodal').modal('show');
		 window.location.href = "../../jezzy-mobile/public_html/offer_product_checkout.html"; //abre a pagina de checkout
       

    } else {
        generateModalAlert("Erro ao salvar Cookie");
        $('#mymodal').modal('show');
    }


}
function AlterarEndereco(idaddress){
    $.cookieStorage.remove('usuario');
    $.cookieStorage.set(idaddress);

    generateModalAlert($.cookieStorage.get('AditionalAddressesUser').name);

    $('#mymodal').modal('show');

    if ($.cookieStorage.isSet('AditionalAddressesUser')) {

        generateModalAlert("Seu endereço de cadastro não será alterado"); //modal jquery confirm
        $('#mymodal').modal('show');
		 window.location.href = "../../jezzy-mobile/public_html/offer_product_checkout.html"; //abre a pagina de checkout
       

    } else {
        generateModalAlert("Erro ao salvar Cookie");
        $('#mymodal').modal('show');
    }


}

function meuLog(msg) {
    span = document.body;
}
var Base64 = { //adiciona encoder e decoder para Base64
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

function sendRequest() {
    var conditions = {
        'AditionalAddressesUser': {
            'conditions': {
                'AditionalAddressesUser.user_id':$.cookieStorage.get('User').id //pega os endereços adicionais relacionados ao id do usuario nos cookies
            }
        }
    };



    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/users/get/all/' + createToken();

    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
           //console.log(result);
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);


            for(var t=0; t<convertedReturn.length;t++){ //percorre os resultados para ordena-los na tela
                var retorno = convertedReturn[t]; //para o resultado na posição que está sendo lida é adicionado o objeto na variavel retorno
                var rua = retorno.AditionalAddressesUser.address;  //adiciona informaçao especifica a variavel
                var tipodeResidencia = retorno.AditionalAddressesUser.label; //...
                var numero = retorno.AditionalAddressesUser.number;     //...
                var cidade =  retorno.AditionalAddressesUser.city;  //...
                var estado =  retorno.AditionalAddressesUser.state;   //...
                var cep =  retorno.AditionalAddressesUser.zip_code;  //...
                var textoHtml = "";
                var retornocookie = JSON.stringify(retorno);










                if(retorno.AditionalAddressesUser.id == $.cookieStorage.get('User').id_address){
                    textoHtml += "<div class='row'  style='margin-left:-2%!important;margin-bottom:2%;margin-top:2%;border-bottom:1px solid #d3d3d3'><div class='col-xs-12' style='padding:0%;margin:0%;'><div class='col-xs-9' style='padding:0%;margin:0%;margin-bottom:2%;' onclick='AlterarEndereco("+retornocookie+")'><div class='col-xs-12' style='padding:0%;margin:0%;line-height: 95%'> <span class='typeOfLocation'  style='font-size: 2.3vh;' id='typeOfLocation' >"+tipodeResidencia+"</span><span class='streetOfAdreess' id='streetOfAdreess'  style='font-size: 2.3vh;'>"+rua + ', ' + numero+"</span> <span class='cepOfAdreess' id='cepOfAdreess'  style='font-size: 2.3vh;'>"+cidade + ' - ' + estado + ', CEP ' +cep+"</span> </div></div><div class='col-xs-3' style='padding:0%!important;margin:0%;margin-top:5%;'><div class='col-xs-12' style='padding: 0%;margin: 0%;font-size:2.3vh;text-align: justify;'><div class='col-xs-6'  style='padding:0%!important;margin:0%;'><img onclick='AlterarPrincipal("+retorno.AditionalAddressesUser.id+")' style='width: 90%;' src='img/icons/Estrelinhas-01.png'/></div><div class='col-xs-6'  style='padding:0%!important;margin:0%;'></div></div></div></div></div>";
                }else{


                    textoHtml += "<div class='row' style='margin-left:-2%!important;margin-bottom:2%;margin-top:2%;border-bottom:1px solid #d3d3d3'><div class='col-xs-12' style='padding:0%;margin:0%;'><div class='col-xs-9' style='padding:0%;margin:0%;margin-bottom:2%;' onclick='AlterarEndereco("+retornocookie+")'><div class='col-xs-12 marginTop10'  style='padding:0%;margin:0%;line-height: 95%;'> <span class='typeOfLocation' style='font-size: 2.3vh;' id='typeOfLocation'>"+tipodeResidencia+"</span><span class='streetOfAdreess'  style='font-size: 2.3vh;' id='streetOfAdreess'>"+rua + ', ' + numero+"</span> <span class='cepOfAdreess' id='cepOfAdreess'  style='font-size: 2.3vh;'>"+cidade + ' - ' + estado + ', CEP ' +cep+"</span> </div></div><div class='col-xs-3' style='padding:0%!important;margin:0%;margin-top:5%;'><div class='col-xs-12' style='padding: 0%;margin: 0%;font-size: 2.3vh;text-align: justify;'><div class='col-xs-6' style='padding:0%!important;margin:0%;'><img onclick='AlterarPrincipal("+retorno.AditionalAddressesUser.id+")'  style='width: 90%;' src='img/icons/Estrelinhas-02.png'/></div><div class='col-xs-6' style='padding:0%!important;margin:0%;'><img  style='width: 60%;margin-top: 5%;margin-left: 20%;' onclick='ExcluirEndereço("+retorno.AditionalAddressesUser.id+")'   src='img/icons/lixeira.jpg'/></div></div></div></div></div></div>";
                }

                //cria o codigo html para exibição dos resultados
                $("#divResultSearchBussiness").append(textoHtml); //preenche a div indicada com o codigo html

            }


    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        //alert(errorThrown);
    });
}

function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}


function ExcluirEndereço(id){
    $.confirm({
        title: 'Excluir endereço adicional?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: 'Não',
        keyboardEnabled: true,

        confirm: function () {
            var conditionsSave = {
                'User': {
                    'query': 'DELETE FROM aditional_addresses_users WHERE user_id = ' + $.cookieStorage.get('User').id + ' and id = ' + id
                }
            };

            var postDataSave = JSON.stringify(conditionsSave);

            postDataSave = {
                'params': postDataSave
            };

            var urlSave = 'https://'+api+'/users/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urlSave,
                data: postDataSave

            }).done(function (result) {

                var conditionsSave = {
                    'User': {
                        'query': 'SELECT * FROM users User WHERE id = ' + $.cookieStorage.get('User').id
                    }
                };

                var postDataSave = JSON.stringify(conditionsSave);

                postDataSave = {
                    'params': postDataSave
                };

                var urlSave = 'https://'+api+'/users/get/query/' + createToken();

                $.ajax({
                    method: "POST",
                    url: urlSave,
                    data: postDataSave

                }).done(function (result) {
                    var objReturn = JSON.parse(JSON.stringify(result));
                    var decodeObjReturn = Base64.decode(objReturn);
                    var convertedReturn = JSON.parse(decodeObjReturn);

                    $.cookieStorage.remove('User');
                    $.cookieStorage.set(convertedReturn[0]);
                    window.location.href = 'address_list.html';
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert(errorThrown);
                });

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                //alert(errorThrown);
            });
            $.alert({
                title: "",
                content: 'Endereço Excluído!',
                animation: 'zoom',
                closeAnimation: 'scale',
                animationBounce: 1.5,
                theme: 'supervan',
                closeIcon: false,
                confirmButton: false,
                backgroundDismiss: true
            });
        },
        cancel: function () {

            $.alert({
                title: false,
                content: 'Exclusão não foi realizada!',
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
}


function AlterarPrincipal(id){
        var conditionsSave = {
            'User': {
                'id': $.cookieStorage.get('User').id,
                'id_address': id
            }
        };
       //console.log(conditionsSave);
        var postDataSave = JSON.stringify(conditionsSave);

        postDataSave = {
            'params': postDataSave
        };

        var urlSave = 'https://'+api+'/users/save/first/' + createToken();

        $.ajax({
            method: "POST",
            url: urlSave,
            data: postDataSave

        }).done(function (result) {

            var conditionsSave = {
                'User': {
                    'query': 'SELECT * FROM users User WHERE id = ' + $.cookieStorage.get('User').id
                }
            };
           //console.log(conditionsSave);
            var postDataSave = JSON.stringify(conditionsSave);

            postDataSave = {
                'params': postDataSave
            };

            var urlSave = 'https://'+api+'/users/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urlSave,
                data: postDataSave

            }).done(function (result) {
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = JSON.parse(decodeObjReturn);

                $.cookieStorage.remove('User');
                $.cookieStorage.set(convertedReturn[0]);
                window.location.href = 'address_list.html';
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
              //  alert(errorThrown);
            });

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
        });

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

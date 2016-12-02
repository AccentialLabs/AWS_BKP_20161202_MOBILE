$(document).ready(function () {
    //$("#niver2").mask("99/99/9999");
    $("#tel2").maskbrphone({
        useDdd            : true,
        useDddParenthesis: true,  // Informa se o DDD deve estar entre parênteses
        dddSeparator     : ' ',   // Separador entre o DDD e o número do telefone
        numberSeparator  : '-'    // Caracter que separa o prefixo e o sufixo do telefone
    });
});
var lengthcaracterespassword = 6;
function verificarEmail(){
    var emailUsuario = document.getElementById('email').value;
    usuario = emailUsuario.substring(0, emailUsuario.indexOf("@"));
    dominio = emailUsuario.substring(emailUsuario.indexOf("@")+ 1, emailUsuario.length);
    if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById("form").submit();
    } else {
        return false;

    }

}

function meuLog(msg) {
    span = document.body;
}
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}
function verificaSenha(){
    var password = (document.getElementById("password").value).trim();
    var confirmpassword = (document.getElementById("confirmpassword").value).trim();
    if(password != confirmpassword){
        document.getElementById("info").style.display = "block";
    } else if(password == confirmpassword){
        document.getElementById("info").style.display = "none";
    }

}

function verificaSenhalength(){
    var password = (document.getElementById("password").value).trim();
    lengthcaracterespassword = 6;
    if((password.length/1)<lengthcaracterespassword){
       $("#infolength").html('Senha precisa ter ao menos '+lengthcaracterespassword+' caracteres!');
        document.getElementById("infolength").style.display = "block";
    } else if(password>=lengthcaracterespassword){
        document.getElementById("infolength").style.display = "none";
    }

}

function verificaEmailConfirm(){
    var email = (document.getElementById("email").value).trim();
    var confirmemail = (document.getElementById("confirmemail").value).trim();
    if(email != confirmemail){
        document.getElementById("infoemail").style.display = "block";
    } else if(email == confirmemail){
        document.getElementById("infoemail").style.display = "none";
    }

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
function unserialize (data) {
    //  discuss at: http://phpjs.org/functions/unserialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Pedro Tainha (http://www.pedrotainha.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Chris
    // improved by: James
    // improved by: Le Torbi
    // improved by: Eli Skeggs
    // bugfixed by: dptr1988
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: d3x
    //    input by: Brett Zamir (http://brett-zamir.me)
    //    input by: Martin (http://www.erlenwiese.de/)
    //    input by: kilops
    //    input by: Jaroslaw Czarniak
    //        note: We feel the main purpose of this function should be to ease the transport of data between php & js
    //        note: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
    //   returns 1: ['Kevin', 'van', 'Zonneveld']
    //   example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
    //   returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}

    var that = this,
        utf8Overhead = function (chr) {
            // http://phpjs.org/functions/unserialize:571#comment_95906
            var code = chr.charCodeAt(0)
            if (code < 0x0080 || 0x00A0 <= code && code <= 0x00FF || [338, 339, 352, 353, 376, 402, 8211, 8212, 8216, 8217,
                    8218, 8220, 8221, 8222, 8224, 8225, 8226, 8230, 8240, 8364, 8482
                ].indexOf(code) != -1) {
                return 0
            }
            if (code < 0x0800) {
                return 1
            }
            return 2
        }
    error = function (type, msg, filename, line) {
        throw new that.window[type](msg, filename, line)
    }
    read_until = function (data, offset, stopchr) {
        var i = 2,
            buf = [],
            chr = data.slice(offset, offset + 1)

        while (chr != stopchr) {
            if ((i + offset) > data.length) {
                error('Error', 'Invalid')
            }
            buf.push(chr)
            chr = data.slice(offset + (i - 1), offset + i)
            i += 1
        }
        return [buf.length, buf.join('')]
    }
    read_chrs = function (data, offset, length) {
        var i, chr, buf

        buf = []
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i)
            buf.push(chr)
            length -= utf8Overhead(chr)
        }
        return [buf.length, buf.join('')]
    }
    _unserialize = function (data, offset) {
        var dtype, dataoffset, keyandchrs, keys, contig,
            length, array, readdata, readData, ccount,
            stringlength, i, key, kprops, kchrs, vprops,
            vchrs, value, chrs = 0,
            typeconvert = function (x) {
                return x
            }

        if (!offset) {
            offset = 0
        }
        dtype = (data.slice(offset, offset + 1))
            .toLowerCase()

        dataoffset = offset + 2

        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10)
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'b':
                typeconvert = function (x) {
                    return parseInt(x, 10) !== 0
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x)
                }
                readData = read_until(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'n':
                readdata = null
                break
            case 's':
                ccount = read_until(data, dataoffset, ':')
                chrs = ccount[0]
                stringlength = ccount[1]
                dataoffset += chrs + 2

                readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10))
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 2
                if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
                    error('SyntaxError', 'String length mismatch')
                }
                break
            case 'a':
                readdata = {}

                keyandchrs = read_until(data, dataoffset, ':')
                chrs = keyandchrs[0]
                keys = keyandchrs[1]
                dataoffset += chrs + 2

                length = parseInt(keys, 10)
                contig = true

                for (i = 0; i < length; i++) {
                    kprops = _unserialize(data, dataoffset)
                    kchrs = kprops[1]
                    key = kprops[2]
                    dataoffset += kchrs

                    vprops = _unserialize(data, dataoffset)
                    vchrs = vprops[1]
                    value = vprops[2]
                    dataoffset += vchrs

                    if (key !== i)
                        contig = false

                    readdata[key] = value
                }

                if (contig) {
                    array = new Array(length)
                    for (i = 0; i < length; i++)
                        array[i] = readdata[i]
                    readdata = array
                }

                dataoffset += 1
                break
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype)
                break
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)]
    }

    return _unserialize((data + ''), 0)[2]
}
function sendRequest() {

   var loading= $.alert({
        icon: 'fa fa-spinner fa-spin',
        title: '',
        content: false,
        theme:'supervan',
        confirmButton: false,
        autoClose:'confirm|1000',
        closeIcon: false,
        onOpen: function(){
        var email = (document.getElementById("email").value).trim();
        usuario = email.substring(0, email.indexOf("@"));
        dominio = email.substring(email.indexOf("@")+ 1, email.length);
        if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& (dominio.lastIndexOf(".") < dominio.length - 1)) {
            var name = document.getElementById("nameinput").value;
            var password = (document.getElementById("password").value).trim();
           // var birthday = (document.getElementById("niver2").value).trim();
           // var mes = (document.getElementById("niver2").value).split("/")[1];
           // var dia = (document.getElementById("niver2").value).split("/")[0];
           // var ano = (document.getElementById("niver2").value).split("/")[2];

           // var formatBirth = new Date(ano,mes-1,dia);

            //formatBirth = moment(formatBirth).format('YYYY-MM-DD');
            var formatBirth = '0000-00-00';
            var formatDate = new Date;
            var dateregister = moment(formatDate).format('YYYY-MM-DD');
            var confirmemail = (document.getElementById("confirmemail").value).trim();
            var confirmpassword = (document.getElementById("confirmpassword").value).trim();
            var tel3 = (document.getElementById("tel2").value).replace("("," ");
            var tel4 = (tel3.replace("-", " ")).trim();
            var tel6 = (tel4.replace("(", " ")).trim();
            var telcom = (tel6.replace(")", " ")).trim();
            var tel =  (telcom.replace(" ", "")).trim();
            if(tel == ""){
                tel = 0000000000;
            }
            var passhash = md5(password).toString();

    if(email != "" && name != "" && password != "" && confirmemail !="" && confirmpassword != "" && formatBirth != "" && document.getElementById("info").style.display == 'none'&& document.getElementById("infoemail").style.display == 'none'){

        var conditionsCreateUser = {
    'General': {
        'query': "SELECT*FROM users WHERE `email` = '"+email.toLowerCase()+"';"
    }
    };

var postDataCreateUser = JSON.stringify(conditionsCreateUser);

postDataCreateUser = {
    'params': postDataCreateUser
};
var urlCreateUser = 'https://'+api+'/General/get/query/' + createToken();

$.ajax({
    method: "POST",
    url: urlCreateUser,
    data: postDataCreateUser

}).done(function (result) {

    if(result != "ImE6MDp7fSI="){
        loading.close();
        generateModalAlert("Este e-mail já está cadastrado!");
        $('#mymodal').modal('show');
        document.getElementById("email").value = "";
        document.getElementById("confirmemail").value = "";

    }else {
        var conditionsCreateUser = {
            'General': {
                'query': "INSERT users(email, name, password, gender, birthday, address, city, zip_code, number, state, complement, district, photo, date_register, phone) VALUES ('"+ email+"','"+name+"','"+passhash+"', '', '"+formatBirth+"','', '', '', '', '', '', '', '', '"+dateregister+"', '"+tel.trim()+"'); "
            }
        };

        var postDataCreateUser = JSON.stringify(conditionsCreateUser);

        postDataCreateUser = {
            'params': postDataCreateUser
        };
        var urlCreateUser = 'https://'+api+'/General/get/query/' + createToken();

        $.ajax({
            method: "POST",
            url: urlCreateUser,
            data: postDataCreateUser

        }).done(function (result) {

                if(result == "ImE6MDp7fSI="){

                var conditionsCreateUser = {
                'General': {
                    'query': "SELECT*FROM users WHERE `email` = '"+email.toLocaleLowerCase()+"' and status ='ACTIVE';"
                }
                };

                var postDataCreateUser = JSON.stringify(conditionsCreateUser);

            postDataCreateUser = {
                'params': postDataCreateUser
            };
            var urlCreateUser = 'https://'+api+'/General/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urlCreateUser,
                data: postDataCreateUser

            }).done(function (result) {
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

                if(result == "ImE6MDp7fSI="){
                    loading.close();
                    generateModalAlert("Usuário não foi cadastrado!");
                    $('#mymodal').modal('show');
                }else{
                             for(var n=0; n<convertedReturn.length;n++){
                                var user = convertedReturn[n];

                                var name = user.users.name;
                                var separatedname = name.split(" ");
                                var firstname = separatedname[0];
                                var lastname = separatedname[1];
                                var date = new Date();
                                var id = user.users.id;
                                 var conditionsCreateUserPreferences = {
                                     'General': {
                                         'query': "INSERT users_preferences(user_id, background, notifications_periodicity, notifications_type, first_login) VALUES ("+id+",'','','',0);"
                                     }
                                 };
                               //console.log(conditionsCreateUserPreferences);
                                 var postDataCreateUserPreferences = JSON.stringify(conditionsCreateUserPreferences);

                                 postDataCreateUserPreferences = {
                                     'params': postDataCreateUserPreferences
                                 };
                                 var urlCreateUserPreferences = 'https://'+api+'/General/get/query/' + createToken();

                                 $.ajax({
                                     method: "POST",
                                     url: urlCreateUserPreferences,
                                     data: postDataCreateUserPreferences

                                 }).done(function (result) {
                                    //console.log(result);
                                     if(result == "ImE6MDp7fSI="){

                                         var conditionsCreateUser = {
                                             'General': {
                                                 'query': " INSERT facebook_profiles (facebook_id, user_id, name, first_name, last_name, email, gender, profile_link, birthday, location, relationship_status, religion, political, updated_time, hair_type, chemistry) VALUES ('000000000000000', "+user.users.id+", '"+user.users.name+"', '"+firstname+"', '"+lastname+"', '"+user.users.email+"', ' ', ' ','"+user.users.birthday+"', '', '', '', '', '"+date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+"', '', ''); "
                                             }
                                         };
                                       //console.log(conditionsCreateUser);
                                         var postDataCreateUser = JSON.stringify(conditionsCreateUser);

                                         postDataCreateUser = {
                                             'params': postDataCreateUser
                                         };
                                         var urlCreateUser = 'https://'+api+'/General/get/query/' + createToken();

                                         $.ajax({
                                             method: "POST",
                                             url: urlCreateUser,
                                             data: postDataCreateUser

                                         }).done(function (result) {
                                               //console.log(result);
                                             loading.close();
                                             $.alert({
                                                 //   icon: 'fa fa-spinner fa-spin',
                                                 title: 'Cadastro Efetuado com Sucesso!',
                                                 content: false,
                                                 theme: 'supervan',
                                                 confirmButton: 'OK',
                                                 onOpen: function(){

                                                 },
                                                 confirm: function () {
                                                     verificarEmail();

                                                 }

                                             });




                                         }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                             alert(errorThrown);
                                         });

                                     }
                                 }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                     alert(errorThrown);
                                 });


                            }

                }

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

            }


        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });


    }

}).error(function (XMLHttpRequest, textStatus, errorThrown) {
    alert(errorThrown);
});

}else{
    generateModalAlert("Preencha corretamente todos os campos!");
    $('#mymodal').modal('show');
}
} else {
    generateModalAlert("E-mail inválido!");
    $('#mymodal').modal('show');
}
        }

    });
}
function generateModalAlert(mensagem) {
    if ($("#mymodal").length) {
        $("#messageModelGoesHere").html(mensagem);
    } else {
        $modalHtml =
            '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="mymodal">'
            + '<div class="modal-dialog modal-sm">'
            + '<div class="modal-content" id="messageModelGoesHere"">'
            + mensagem
            + '</div>'
            + '</div>'
            + '</div>';
        $("body").append($modalHtml);
    }
}




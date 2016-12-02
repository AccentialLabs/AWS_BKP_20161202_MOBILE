


$(document).ready(function() {
    setInterval(function(){CarregaNotificacao(); VerificaNotificacao();}, 20000);
    if($.cookieStorage.isSet('User')){

    }else{

            window.location.href = 'index.html';

    }
	
	$(".sizeLogo:not(#scroll)").click(function(){
		window.location.href = "home.html";
	});
    $(".icon-bar").click(function () {

    });

    $("#scroll").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 100);
    });
    $("#btnMyNavMenu").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 100);
    });
    $('#notify').click(function (){
        window.location.href = 'notifications.html';
    });
    /*

    $('#container').click(function (e) {
        e.stopPropagation();
        toggleNav();
    });
*/
    $('#container').on("swipeleft", function (e) {
    //    e.preventDefault();
     //   e.stopPropagation();
   //  $("#myNavmenu").offcanvas('hide');
    });



    CarregaNotificacao();
    VerificaNotificacao();
    if ($.cookieStorage.isSet('notifications')) {
        if ($.cookieStorage.get('notifications') != 0) {
            $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink' /><span class='badge' id='notify'>" + $.cookieStorage.get('notifications') + "</span>");
        } else {
            $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink'/>");
        }
    } else {
        $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink'/>");
    }
    $("#footerCalendarIconClick").click(function () {
        window.location.href = "../../jezzy-mobile/public_html/agenda-views.html";
    });

    $('#footerCardIconClick').click(function () {
        window.location.href = "../..y/jezzy-mobile/public_html/offer_product_checkout.html";
    });
    $('#footerFeedIconClick').click(function () {
        window.location.href = "../../jezzy-mobile/public_html/news.html";
    });

    $('#backbutton').click(function () {
        window.history.go(-1);
    });
    $('#UserLink').click(function () {
        window.location.href = "../../jezzy-mobile/public_html/notifications.html";
    });

    $('#NavHome').click(function () {
        window.location.href = "../../jezzy-mobile/public_html/home.html";

    });
    $('#BackButton').click(function () {
        window.history.go(-1);
    });
    $('#userName').click(function () {
        window.location.href = "../../jezzy-mobile/public_html/my_profile.html";
    });



});


var datadehoje = new Date();
var mes = '';
var month = datadehoje.getMonth();
switch (month){
    case 0:
        mes = '01';
        break;
    case 1:
        mes = '02';
        break;
    case 2:
        mes = '03';
        break;
    case 3:
        mes = '04';
        break;
    case 4:
        mes = '05';
        break;
    case 5:
        mes = '06';
        break;
    case 6:
        mes = '07';
        break;
    case 7:
        mes = '08';
        break;
    case 8:
        mes = '09';
        break;
    case 9:
        mes = '10';
        break;
    case 10:
        mes = '11';
        break;
    case 11:
        mes = '12';
        break;
}
var dataformatada = datadehoje.getFullYear()+"-"+mes+"-"+datadehoje.getDate();

function CarregaNotificacao(){
    var query_schedules_solicitation = "SELECT * FROM schedules_solicitation ScheduleSolicitation WHERE user_id = "+ $.cookieStorage.get('User').id + " and status = 'SOLICITATION_ACCEPTED'";

    var conditions_schedules_solicitation = {
        'General': {
            'query':query_schedules_solicitation
        }
    };
    var postData_schedules_solicitation = JSON.stringify(conditions_schedules_solicitation);

    postData_schedules_solicitation = {
        'params': postData_schedules_solicitation
    };
    var url_schedules_solicitation = 'https://'+api+'/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: url_schedules_solicitation,
        data: postData_schedules_solicitation

    }).done(function(result) {

        if(result!="ImE6MDp7fSI="){
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            var evento2 = '';
            for(var j=0;j<convertedReturn.length;j++){
                evento2 = convertedReturn[j];

                var query_create_notification_solicitation_accepted = "INSERT INTO notifications_company (description, date_notification ,data, horario, company_id, offer_id, user_id, checkout_id, status, peso, secondary_user_id, solicitation_id) VALUES ('AGENDAMENTO ACEITO PELA EMPRESA', '"+dataformatada+"','"+evento2.ScheduleSolicitation.date + "','"+evento2.ScheduleSolicitation.time_begin + "', "+evento2.ScheduleSolicitation.company_id + "," +evento2.ScheduleSolicitation.service_id + ", "+ $.cookieStorage.get('User').id +", null,1, 4, "+evento2.ScheduleSolicitation.secundary_user_id+", "+evento2.ScheduleSolicitation.id+");";

                var conditions = {
                    'General': {
                        'query':query_create_notification_solicitation_accepted
                    }
                };
                var postData = JSON.stringify(conditions);

                postData = {
                    'params': postData
                };
                var url = 'https://'+api+'/General/get/query/' + createToken();

                $.ajax({
                    method: "POST",
                    url: url,
                    data: postData

                }).done(function(result) {


                    var querydelete = "UPDATE schedules_solicitation SET status = 'DISPLAYED_BY_USER' WHERE status='SOLICITATION_ACCEPTED' and user_id = " + $.cookieStorage.get('User').id;

                    var conditionsdelete = {
                        'General': {
                            'query': querydelete
                        }
                    };


                    var postDatadelete = JSON.stringify(conditionsdelete);

                    postDatadelete = {
                        'params': postDatadelete
                    };
                    var urldelete = 'https://'+api+'/General/get/query/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: urldelete,
                        data: postDatadelete

                    }).done(function (result) {

                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                       // alert(errorThrown);
                    });
                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                  //  alert(errorThrown);
                });


            }
        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
       // alert(errorThrown);
    });
    //fim da verificação de schedules solicitation ACCEPTED
    //inicio da verificação de schedules solicitation NEW_SUGGESTED_SCHEDULING
    var query_schedules_solicitation = "SELECT * FROM schedules_solicitation ScheduleSolicitation WHERE user_id = "+ $.cookieStorage.get('User').id + " and status = 'NEW_SUGGESTED_SCHEDULING'";

    var conditions_schedules_solicitation = {
        'General': {
            'query':query_schedules_solicitation
        }
    };
    var postData_schedules_solicitation = JSON.stringify(conditions_schedules_solicitation);

    postData_schedules_solicitation = {
        'params': postData_schedules_solicitation
    };
    var url_schedules_solicitation = 'https://'+api+'/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: url_schedules_solicitation,
        data: postData_schedules_solicitation

    }).done(function(result) {
        if(result!="ImE6MDp7fSI="){
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            var evento2 = '';
            for(var j=0;j<convertedReturn.length;j++){
                evento2 = convertedReturn[j];

                var query_create_notification_sugested_scheduling = "INSERT INTO notifications_company (description, date_notification, horario, data, company_id, offer_id, user_id, checkout_id, status, peso, secondary_user_id, solicitation_id) VALUES ('SUGESTAO DE NOVO HORARIO', '"+dataformatada+"','"+evento2.ScheduleSolicitation.newSuggestedScheduling+"','"+evento2.ScheduleSolicitation.date+"', "+evento2.ScheduleSolicitation.company_id + "," +evento2.ScheduleSolicitation.service_id + ", "+ $.cookieStorage.get('User').id +", null, 1, 5, "+evento2.ScheduleSolicitation.secundary_user_id+", "+evento2.ScheduleSolicitation.id+");";

                var conditions = {
                    'General': {
                        'query':query_create_notification_sugested_scheduling
                    }
                };
                var postData = JSON.stringify(conditions);

                postData = {
                    'params': postData
                };
                var url = 'https://'+api+'/General/get/query/' + createToken();

                $.ajax({
                    method: "POST",
                    url: url,
                    data: postData

                }).done(function(result) {
                    var querydelete = "UPDATE schedules_solicitation SET status = 'DISPLAYED_BY_USER' WHERE status='NEW_SUGGESTED_SCHEDULING' and user_id = " + $.cookieStorage.get('User').id;

                    var conditionsdelete = {
                        'General': {
                            'query': querydelete
                        }
                    };


                    var postDatadelete = JSON.stringify(conditionsdelete);

                    postDatadelete = {
                        'params': postDatadelete
                    };
                    var urldelete = 'https://'+api+'/General/get/query/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: urldelete,
                        data: postDatadelete

                    }).done(function (result) {
                        window.location.href('notifications.html');
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                      //  alert(errorThrown);
                    });
                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                 //   alert(errorThrown);
                });


            }
        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      //  alert(errorThrown);
    });
    //fim new suggested scheduling


    //inicio recusadas

    var query_schedules_solicitation = "SELECT * FROM schedules_solicitation ScheduleSolicitation WHERE user_id = "+ $.cookieStorage.get('User').id + " and status = 'SOLICITATION_DOES_NOT_ACCEPTED'";

    var conditions_schedules_solicitation = {
        'General': {
            'query':query_schedules_solicitation
        }
    };
    var postData_schedules_solicitation = JSON.stringify(conditions_schedules_solicitation);

    postData_schedules_solicitation = {
        'params': postData_schedules_solicitation
    };
    var url_schedules_solicitation = 'https://'+api+'/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: url_schedules_solicitation,
        data: postData_schedules_solicitation

    }).done(function(result) {
        if(result!="ImE6MDp7fSI="){
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            var evento2 = '';
            for(var j=0;j<convertedReturn.length;j++){
                evento2 = convertedReturn[j];

                var query_create_notification_sugested_scheduling = "INSERT INTO notifications_company (description, date_notification, company_id, offer_id, user_id, checkout_id, horario, status, data, peso, secondary_user_id, solicitation_id) VALUES ('AGENDAMENTO NAO ACEITO PELA EMPRESA', '"+dataformatada+"', "+evento2.ScheduleSolicitation.company_id + "," +evento2.ScheduleSolicitation.service_id + ", "+ $.cookieStorage.get('User').id +", null,'"+evento2.ScheduleSolicitation.time_begin + "', 1, '"+evento2.ScheduleSolicitation.date+"', 2, "+evento2.ScheduleSolicitation.secundary_user_id+", "+evento2.ScheduleSolicitation.id+");";

                var conditions = {
                    'General': {
                        'query':query_create_notification_sugested_scheduling
                    }
                };
                var postData = JSON.stringify(conditions);

                postData = {
                    'params': postData
                };
                var url = 'https://'+api+'/General/get/query/' + createToken();

                $.ajax({
                    method: "POST",
                    url: url,
                    data: postData

                }).done(function(result) {


                    var querydelete = "UPDATE schedules_solicitation SET status = 'DISPLAYED_BY_USER' WHERE status='SOLICITATION_DOES_NOT_ACCEPTED' and user_id = " + $.cookieStorage.get('User').id;

                    var conditionsdelete = {
                        'General': {
                            'query': querydelete
                        }
                    };


                    var postDatadelete = JSON.stringify(conditionsdelete);

                    postDatadelete = {
                        'params': postDatadelete
                    };
                    var urldelete = 'https://'+api+'/General/get/query/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: urldelete,
                        data: postDatadelete

                    }).done(function (result) {
                        window.location.href='notifications.html';
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        //alert(errorThrown);
                    });
                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                   // alert(errorThrown);
                });


            }
        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
      //  alert(errorThrown);
    });
    //fim recusadas

    // verifica as notificaçoes
    var query = "SELECT * FROM notifications_company INNER JOIN companies ON notifications_company.company_id WHERE companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 1 ORDER BY notifications_company.peso  DESC;";

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
        if(result == ""){

        } else{

        }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
       // alert(errorThrown);
    });
}
function Sair(){
    $.cookieStorage.remove('User');
    $.removeAllStorages();
    localStorage.removeItem('FavCompany');


		     window.location.href = 'https://'+ip+'/jezzy-mobile/public_html/index.html';


}
function voltar(){

    if(window.location.href == "https://"+ip+"/jezzy-mobile/public_html/services_history.html"){

            window.location.href = "home.html";

    }else{
			 if(window.location.href == "https://"+ip+"/jezzy-mobile/public_html/schedules_display.html"){
				 
				 window.location.href = "home.html";
				 
			 }else{	
			 
				window.history.go(-1);
				
			 }
	

    }

}
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}
function VerificaNotificacao(){
    var query = "SELECT * FROM notifications_company INNER JOIN companies ON notifications_company.company_id WHERE companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 1 and notifications_company.date_notification >= DATE_FORMAT(CURRENT_TIMESTAMP - interval 7 day, '%Y-%m-%d') and notifications_company.data >= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d') or companies.id = notifications_company.company_id and notifications_company.user_id =" +$.cookieStorage.get('User').id + " and notifications_company.status = 4 and notifications_company.description != 'NOVA OFERTA ADICIONADA' and notifications_company.date_notification >= DATE_FORMAT(CURRENT_TIMESTAMP - interval 7 day, '%Y-%m-%d') and notifications_company.data >= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d') ORDER BY notifications_company.peso  DESC;";

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
   //console.log(url);
    $.ajax({
        method: "POST",
        url: url,
        data: postData

    }).done(function(result) {

        if(result == ""){

        } else {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = (JSON.parse(decodeObjReturn));
          
            var notifications = convertedReturn.length;
            var notify = 0;

            $.cookieStorage.remove("notifications");
            var length = '';
            if(convertedReturn.length<20){
                length = convertedReturn.length;
            }else{
                length = 100;
            }
            for (var l = 0; l < length; l++) {
                if(convertedReturn[l]!= undefined){
                    if(convertedReturn[l].notifications_company.status!=4){
                        notify++;
                    }
                }


                $.cookieStorage.set("notifications", notify);
                if($.cookieStorage.isSet('notifications')){
                    if($.cookieStorage.get('notifications')!=0){
                        $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink' /><span class='badge' id='notify'>"+$.cookieStorage.get('notifications')+"</span>");
                    }else {
                        $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink'/>");
                    }
                }

            }
        }
    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
       // alert(errorThrown);
    });
}

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

function includeFilesJS(fileName) {

    $.getScript("lib/jquery/" + fileName + ".js", function (data, textStatus, jqxhr) {
     //  //console.log(data); // Data returned
      // //console.log("load: " + textStatus); // Success

      // //console.log("Load was performed.");
    });
}
function utf8_decode(str_data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +	  input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *	 example 1: utf8_decode('Kevin van Zonneveld');
    // *	 returns 1: 'Kevin van Zonneveld'

    var tmp_arr = [], i = ac = c = c1 = c2 = 0;

    while (i < str_data.length) {
        c = str_data.charCodeAt(i);
        if (c < 128) {
            tmp_arr[ac++] = String.fromCharCode(c);
            i++;
        }
        else if ((c > 191) && (c < 224)) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
    function utf8_decode(str_data) {
        // http://kevin.vanzonneveld.net
        // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // +	  input by: Aman Gupta
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // *	 example 1: utf8_decode('Kevin van Zonneveld');
        // *	 returns 1: 'Kevin van Zonneveld'

        var tmp_arr = [], i = ac = c = c1 = c2 = 0;

        while (i < str_data.length) {
            c = str_data.charCodeAt(i);
            if (c < 128) {
                tmp_arr[ac++] = String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = str_data.charCodeAt(i + 1);
                tmp_arr[ac++] = String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = str_data.charCodeAt(i + 1);
                c3 = str_data.charCodeAt(i + 2);
                tmp_arr[ac++] = String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return tmp_arr.join('');
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


function monetary(value){
    return 'R$ ' +  parseFloat(value).toFixed(2).replace('.',',');
}








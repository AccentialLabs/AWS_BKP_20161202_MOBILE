$(document).ready(function() {
    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;

});
function excluirschedulesolicitation(id){
    var nao = "Não";
    var nao2 =  "não";
    nao = utf8_decode(nao);
    $.confirm({
        title: 'Tem certeza que deseja cancelar o agendamento?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: nao,
        keyboardEnabled: true,

        confirm: function () {
            var query = "UPDATE schedules_solicitation SET status = 'CANCELLED_BY_USER' WHERE id = " + id;

            var conditions = {
                'General': {
                    'query': query
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

            }).done(function (result) {
                if (result == "ImE6MDp7fSI=") {
                    $.alert({
                        title: "",
                        content: 'Agendamento Cancelado!',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        animationBounce: 1.5,
                        theme: 'supervan',
                        closeIcon: false,
                        confirmButton: false,
                        backgroundDismiss: true,
                        onClose: function(){
                            window.location.href = 'schedules_display.html';
                        }
                    });
                } else {
                    $.alert({
                        title: "",
                        content: 'Erro.Cancelamento '+utf8_decode(nao2)+' foi realizado!',
                        animation: 'zoom',
                        closeAnimation: 'scale',
                        animationBounce: 1.5,
                        theme: 'supervan',
                        closeIcon: false,
                        confirmButton: false,
                        backgroundDismiss: true,
                        onClose: function(){
                            window.location.href = 'schedules_display.html';
                        }
                    });

                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

        },
        cancel: function () {
        $.alert({
            title: false,
            content: 'Cancelamento '+utf8_decode(nao2)+' foi realizado!',
            animation: 'zoom',
            closeAnimation: 'scale',
            animationBounce: 1.5,
            theme: 'supervan',
            closeIcon: false,
            confirmButton: false,
            backgroundDismiss: true

        });

    }
});
}
function excluir(id){
    var nao = "Não";
    var nao2 =  "não";
    nao = utf8_decode(nao);
    $.confirm({
        title: 'Tem certeza que deseja cancelar o agendamento?',
        content: false,
        animation: 'zoom',
        closeAnimation: 'scale',
        animationBounce: 1.5,
        theme: 'supervan',
        confirmButton: 'Sim',
        cancelButton: nao,
        keyboardEnabled: true,

    confirm: function () {


       //CODIGO PARA MUDAR STATUS DE AGENDAMENTO CONCLUIDO PARA CANCELADO
        var query11 = "SELECT * FROM schedules Schedules WHERE id =" + id;

        var conditions3 = {
            'General': {
                'query': query11
            }
        };
        var postData3 = JSON.stringify(conditions3);

        postData3 = {
            'params': postData3
        };
        var url3 = 'https://'+api+'/General/get/query/' + createToken();

        $.ajax({
            method: "POST",
            url: url3,
            data: postData3
        }).done(function (result) {

                if(result !='ImE6MDp7fSI='){
                    var objReturns4 = JSON.parse(JSON.stringify(result));
                    var decodeObjReturns4 = Base64.decode(objReturns4);
                    var convertedReturns4 = unserialize(JSON.parse(decodeObjReturns4));

                    if(convertedReturns4[0].Schedules.voucher_id!=null&&convertedReturns4[0].Schedules.voucher_id!=0 ){
                        var query3 = "UPDATE services_vouchers SET services_vouchers.status = 'APPROVED' WHERE services_vouchers.id = " + convertedReturns4[0].Schedules.voucher_id + ";";

                        var conditions3 = {
                            'General': {
                                'query': query3
                            }
                        };
                        var postData3 = JSON.stringify(conditions3);

                        postData3 = {
                            'params': postData3
                        };
                        var url3 = 'https://'+api+'/General/get/query/' + createToken();

                        $.ajax({
                            method: "POST",
                            url: url3,
                            data: postData3

                        }).done(function (result) {

                            if(result =='ImE6MDp7fSI='){
                                var query = "UPDATE schedules SET status = 2 WHERE id = " + id+';';

                                var conditions = {
                                    'General': {
                                        'query': query
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

                                }).done(function (result) {

                                    if (result == "ImE6MDp7fSI=") {
                                        $.alert({
                                            title: "",
                                            content: 'Agendamento Cancelado!',
                                            animation: 'zoom',
                                            closeAnimation: 'scale',
                                            animationBounce: 1.5,
                                            theme: 'supervan',
                                            closeIcon: false,
                                            confirmButton: false,
                                            backgroundDismiss: true,
                                            onClose: function(){
												localStorage.setItem("atualizarpag", 1);
                                                window.location.href='schedules_display.html';
                                            }
                                        });
                                    } else {
                                        $.alert({
                                            title: "",
                                            content: 'Erro. Cancelamento '+utf8_decode(nao2)+' foi realizado!!',
                                            animation: 'zoom',
                                            closeAnimation: 'scale',
                                            animationBounce: 1.5,
                                            theme: 'supervan',
                                            closeIcon: false,
                                            confirmButton: false,
                                            backgroundDismiss: true,
                                            onClose: function(){
                                                window.location.href='schedules_display.html';
                                            }
                                        });


                                    }
                                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                    alert(errorThrown);
                                });

                            }else{
                                $.alert({
                                    title: "",
                                    content: 'Erro. Cancelamento '+utf8_decode(nao2)+' foi realizado!!',
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    animationBounce: 1.5,
                                    theme: 'supervan',
                                    closeIcon: false,
                                    confirmButton: false,
                                    backgroundDismiss: true,
                                    onClose: function(){
										localStorage.setItem("atualizarpag", 1);
                                        window.location.href='schedules_display.html';
                                    }
                                });
                            }

                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });

                    }else{
                        var query = "UPDATE schedules SET status = 2 WHERE id = " + id+';';

                        var conditions = {
                            'General': {
                                'query': query
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

                        }).done(function (result) {
                            if (result == "ImE6MDp7fSI=") {
                                $.alert({
                                    title: "",
                                    content: 'Agendamento Cancelado!!',
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    animationBounce: 1.5,
                                    theme: 'supervan',
                                    closeIcon: false,
                                    confirmButton: false,
                                    backgroundDismiss: true,
                                    onClose: function(){
										localStorage.setItem("atualizarpag", 1);
                                        window.location.href='schedules_display.html';
                                    }
                                });
                            } else {
                                $.alert({
                                    title: "",
                                    content: 'Erro. Cancelamento '+utf8_decode(nao2)+' foi realizado!!',
                                    animation: 'zoom',
                                    closeAnimation: 'scale',
                                    animationBounce: 1.5,
                                    theme: 'supervan',
                                    closeIcon: false,
                                    confirmButton: false,
                                    backgroundDismiss: true,
                                    onClose: function(){
										localStorage.setItem("atualizarpag", 1);
                                        window.location.href='schedules_display.html';
                                    }
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




    },
    cancel: function () {
        $.alert({
            title: false,
            content: 'Cancelamento '+utf8_decode(nao2)+' foi realizado!',
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

function Schedules() {
    var salao = 'salão';
    var query = "SELECT * FROM schedules_solicitation schedules INNER JOIN companies ON schedules.company_id INNER JOIN secondary_users ON schedules.secundary_user_id WHERE user_id = " + $.cookieStorage.get('User').id + " and schedules.status= 'WAITING_COMPANY_RESPONSE' and companies.id = schedules.company_id and schedules.date >= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d') and secondary_users.id = schedules.secundary_user_id  ORDER BY schedules.date, schedules.time_begin";
    var conditions = {
        'General': {
            'query': query
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

    }).done(function (result) {

        if (result == "ImE6MDp7fSI=") {

        } else {
            var objReturns = JSON.parse(JSON.stringify(result));
            var decodeObjReturns = Base64.decode(objReturns);
            var convertedReturns = unserialize(JSON.parse(decodeObjReturns));
            var HTML = "";
            var datamaisprox = new moment();

            for(var i=0;i<convertedReturns.length;i++){
                var data = new moment(convertedReturns[i].schedules.date+" "+convertedReturns[i].schedules.time_begin);
                var ano = data.get('year');
                var mes = data.get('month');
                var dia = data.get('date');

                var hora =  utf8_decode("às ")+ data.get('hour');
                var minuto = data.get('minute');
                var empresa = convertedReturns[i].companies.fancy_name;
                var professional = convertedReturns[i].secondary_users.name;
                var servico = utf8_decode(convertedReturns[i].schedules.service_name);

                var textaguardando = 'AGUARDANDO RESPOSTA DO '+utf8_decode(salao.toUpperCase());
                var aguardando = '<span style="color:red">'+textaguardando+'</span>';
                str_month = new String(mes+1);
                if (str_month.length < 2)
                    str_month = 0 + str_month;
                str_minutos = new String(minuto);
                if (str_minutos.length < 2) {
                    str_minutos = 0 + str_minutos;
                }
                if(convertedReturns[i].schedules.voucher_id!=0 && convertedReturns[i].schedules.voucher_id!=null ){
                    HTML = "<div id='date'' class='col-xs-12 tablecontent'><div class='col-xs-10'><span class='service'>" +servico+ "</span>(VOUCHER)<br>"+aguardando+"<br>DATA " +  dia + "/" + str_month + "/" + ano + " " + hora +":"+str_minutos + "<br>LOCAL " + empresa + "</br>PROFISSIONAL " + professional+"</div><div class='col-xs-2'><img onclick=excluirschedulesolicitation("+convertedReturns[i].schedules.id+") style='width: 65%;MARGIN-TOP: 40%!important;' src = img/icons/lixeira.jpg></div></div>";
                }else{
                    HTML = "<div id='date'' class='col-xs-12 tablecontent'><div class='col-xs-10'><span class='service'>" +servico+ "</span><br>"+aguardando+"<br>DATA " +  dia + "/" + str_month + "/" + ano + " " + hora +":"+str_minutos + "<br>LOCAL " + empresa + "</br>PROFISSIONAL " + professional+"</div><div class='col-xs-2'><img onclick=excluirschedulesolicitation("+convertedReturns[i].schedules.id+") style='width: 65%;MARGIN-TOP: 40%!important;' src = img/icons/lixeira.jpg></div></div>";
                }
               //console.log(HTML);
                $("#conteudo").append(HTML+ "<div class='bottomLine1'></div>");
            }


        }

        var query = "SELECT * FROM schedules INNER JOIN companies ON schedules.companie_id INNER JOIN secondary_users ON schedules.secondary_user_id WHERE user_id = " + $.cookieStorage.get('User').id + " and schedules.status= '1' and companies.id = schedules.companie_id and schedules.date >= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d') and secondary_users.id = schedules.secondary_user_id  ORDER BY schedules.date, schedules.time_begin";

        var conditions = {
            'General': {
                'query': query
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

        }).done(function (result) {

            if (result == "ImE6MDp7fSI=") {
                var texto = "</br>Não há agendamentos confirmados";
                $("#conteudo").append("<div class='col-xs-12 tablecontent'>"+utf8_decode(texto)+"</div>");
            } else {
                var objReturns = JSON.parse(JSON.stringify(result));
                var decodeObjReturns = Base64.decode(objReturns);
                var convertedReturns = unserialize(JSON.parse(decodeObjReturns));
                var HTML = "";
                var datamaisprox = new moment();

                for(var i=0;i<convertedReturns.length;i++){
                    var data = new moment(convertedReturns[i].schedules.date+" "+convertedReturns[i].schedules.time_begin);
                    var ano = data.get('year');
                    var mes = data.get('month');
                    var dia = data.get('date');

                    var hora =  utf8_decode("às ")+ data.get('hour');
                    var minuto = data.get('minute');
                    var empresa = convertedReturns[i].companies.fancy_name;
                    var professional = convertedReturns[i].secondary_users.name;
                    var servico = utf8_decode(convertedReturns[i].schedules.subclasse_name);
                    var textaguardando = 'CONFIRMADO';
                    var aguardando = '<span style="color:green">'+(textaguardando)+'</span>';

                    str_month = new String(mes+1);
                    if (str_month.length < 2)
                        str_month = 0 + str_month;
                    str_minutos = new String(minuto);
                    if (str_minutos.length < 2) {
                        str_minutos = 0 + str_minutos;
                    }
                    if(convertedReturns[i].schedules.voucher_id!=0 && convertedReturns[i].schedules.voucher_id!=null ){
                        HTML = "<div id='date'' class='col-xs-12 tablecontent'><div class='col-xs-10'><span class='service'>" +servico+ "</span>(VOUCHER)<br>"+aguardando+"<br>DATA " +  dia + "/" + str_month + "/" + ano + " " + hora +":"+str_minutos + "<br>LOCAL " + empresa + "</br>PROFISSIONAL " + professional+"</div><div class='col-xs-2'><img onclick=excluir("+convertedReturns[i].schedules.id+") style='width: 65%;MARGIN-TOP: 40%!important;' src = img/icons/lixeira.jpg></div></div>";
                    }else{
                        HTML = "<div id='date'' class='col-xs-12 tablecontent'><div class='col-xs-10'><span class='service'>" +servico+ "</span><br>"+aguardando+"<br>DATA " +  dia + "/" + str_month + "/" + ano + " " + hora +":"+str_minutos + "<br>LOCAL " + empresa + "</br>PROFISSIONAL " + professional+"</div><div class='col-xs-2'><img onclick=excluir("+convertedReturns[i].schedules.id+") style='width: 65%;MARGIN-TOP: 40%!important;' src = img/icons/lixeira.jpg></div></div>";
                    }

                    $("#conteudo").append(HTML+ "<div class='bottomLine1'></div>");
                }


            }
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });





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
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}
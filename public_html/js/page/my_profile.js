$(document).ready(function() {
    var user = $.cookieStorage.get('User').email;
    var userid = $.cookieStorage.get('User').id;






    $("#birthday").mask("99/99/9999");
    document.getElementById("userinfo").value = user;
    document.getElementById("userinfoid").value = userid;
    $.cookieStorage.remove("Company");
    $.cookieStorage.remove("Offer");
    $.cookieStorage.remove("subclasses");
    $.cookieStorage.remove("classes");
    $.cookieStorage.remove("SchedulesSolicitation");
    $.cookieStorage.remove("parcels");
    $.cookieStorage.remove("shipping_value");
    $.cookieStorage.remove('paginaanterior');
    $.cookieStorage.remove('metrics');
    $.cookieStorage.remove('quantidade');
    $.cookieStorage.remove('shipping_days');
    $.cookieStorage.remove('shipping_type');
    $.cookieStorage.remove('total_value');
    $.cookieStorage.remove('usuario');
    $.cookieStorage.remove("Checkout");
    $.cookieStorage.remove("Schedules");
    $.cookieStorage.remove("Vouchers");
    $.cookieStorage.remove("companies");
    $.cookieStorage.remove("secondary_users");
    $.cookieStorage.remove("service_secondary_users");
    $.cookieStorage.remove("services");
    sendRequest();

    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {


                $('.profile-pic').attr('src', e.target.result);
                $('.profile-pic').attr('src',icons+'ImagemIndisponivel2.png' + '?' + (new Date()).getTime());

            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $(".file-upload").on('change', function(){
        readURL(this);
    });






    $(".upload-button").on('click', function() {
        var fotoUsuario = $.cookieStorage.get('User').photo;
        if(fotoUsuario.indexOf('?') == -1){
            fotoUsuario = fotoUsuario + '?' + (new Date()).getTime();
        }else{
            fotoUsuario = fotoUsuario + '&' + (new Date()).getTime();
        }
        if(fotoUsuario!=""){

            var modalimagem = $.dialog({
                title: '',
                content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><img id="modalimg" class="modalimg" src="'+ fotoUsuario+'"></br></br><button class="btn" onclick="newphoto();">TROCAR FOTO</button></br><button class="btn" onclick="removephoto()">REMOVER FOTO</button>',
                animation: 'zoom',
                closeIcon:false,
                animationBounce: 1.5,
                backgroundDismiss:true,
                theme: 'supervan',
                closeAnimation: 'rotateX',
                keyboardEnabled: true,
                onOpen:function(){

                    var myElement = document.getElementById('modalimg');

                     // create a simple instance
                     // by default, it only adds horizontal recognizers
                     var mc = new Hammer(myElement);
                    mc.get('pinch').set({ enable: true });
                    mc.get('rotate').set({ enable: true });


                    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
                    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
                     // listen to events...
                     mc.on("swipedown", function(ev) {
                         modalimagem.close();
                     });


                },
                onClose: function(){
                    $(".container").css('width','100%!important');
                   // $(".container").css('margin-top','15%!important');


                }

            });

            $(".container").css('width','90%!important');
            $("#modalimg").load(this, function(){

                /*if (navigator.appVersion.indexOf("iPhone")==-1) {

                    EXIF.getData(this, function () {

                        var make = EXIF.getTag(this, "Orientation");


                       //console.log(make);
                        if (make == 6) {
                            $("#modalimg").addClass("rotates");

                        }else if (make == 3) {
                            $("#modalimg").addClass("rotatehs");


                        }else if (make == 8) {
                            $("#modalimg").addClass("rotatews");


                        }else{
                            $("#modalimg").removeClass("hide");
                        }
                    });
                }else{
                    $("#" + this.id).removeClass("hide");
                }*/

            });

        }else{
            $(".file-upload").click();
        }

    });

    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;

    $("#fotousuario").load(this, function(){

        /*if (navigator.appVersion.indexOf("iPhone")==-1) {

            EXIF.getData(this, function () {

                var make = EXIF.getTag(this, "Orientation");

                if (make == 6) {
                    $("#fotousuario").addClass("rotate");
                    $("#fotousuario").removeClass("hide");

                }else if (make == 3) {
                    $("#fotousuario").addClass("rotateh");
                    $("#fotousuario").removeClass("hide");
                    $("#fotousuario").addClass("fotohorizontal");

                }else if (make == 8) {
                    $("#fotousuario").addClass("rotatew");
                    $("#fotousuario").removeClass("hide");


                }else{
                    $("#fotousuario").removeClass("hide");

                }
            });
        }else{

            $("#fotousuario").removeClass("hide");
        }*/

    });



});
function newphoto(){

	
	console.log("****************** CLIQUEI NO BOTAO *****************");

    $(".jconfirm").hide();
   // $(".file-upload").click();
	console.log("****************** click WITH ID *****************");
	$("#fileupload").click();
}
function removephoto(){
    var conditions = {
        'User': {
            'conditions': {
                'User.id': $.cookieStorage.get('User').id
            }
        }
    };



    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+ip+'/jezzy-mobile/public_html/php/RemovoPhotoUser.php';

    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {

        window.location.href="my_profile.html";

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);

        });
}
function carregar(){
    var elem = document.getElementById("progress");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            $("#fileform").submit();
        } else {
            width++;
            elem.style.width = width + '%';
        }
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

function sendRequest() {

    var conditions = {
        'User': {
            'conditions': {
                'User.id': $.cookieStorage.get('User').id
            }
        }
    };



    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/users/get/first/' + createToken();

    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {


        if (result != "") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);

        }
        $.cookieStorage.remove('User');
        $.cookieStorage.set((convertedReturn));
        $("#emailinput").attr('value',$.cookieStorage.get('User').email);
        $("#nickname").attr('value',$.cookieStorage.get('User').name);
        $("#name").attr('value',$.cookieStorage.get('User').name);
        if($.cookieStorage.get('User').gender == 'female'){
            document.getElementById("female").checked = true;
        } else if($.cookieStorage.get('User').gender == 'male'){
            document.getElementById("male").checked = true;
        } else{

        }

        var aniversario = $.cookieStorage.get('User').birthday;
        var niver = aniversario.split("-");
        var dia = niver[1];
        var mes = niver[2];
        var ano = niver[0];

        $("#birthday").attr('value', mes +"/"+ dia+"/"+ ano);
        var fotoUsuario = $.cookieStorage.get('User').photo;
        if(fotoUsuario.indexOf('?') == -1){
            fotoUsuario = fotoUsuario + '?' + (new Date()).getTime();
        }else{
            fotoUsuario = fotoUsuario + '&' + (new Date()).getTime();
        }

        if(fotoUsuario!= "") {
            $("#fotousuario").attr('src',fotoUsuario);

            if($("#fotousuario")[0].x>$("#fotousuario")[0].y){

            }else{

                //$("#fotousuario").addClass("fotohorizontal");
            }

        }else{
            $("#fotousuario").attr('src',icons+'ImagemIndisponivel2.png' + '?' + (new Date()).getTime());
            //$("#fotousuario").addClass("fotohorizontal");
        }



        //$("#fotousuario").addClass("hide");

        var query = "SELECT * FROM users_preferences WHERE user_id = "+$.cookieStorage.get('User').id+" AND notifications_periodicity != 'NEVER';";
        var conditions = {
            'General': {
                'query':query
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
            if(result == "ImE6MDp7fSI="){
                document.getElementById('no').checked = true;
            }else{
                document.getElementById('yes').checked = true;
            }

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);

        });


    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}

function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}

function setFBprofile(){
    var query = 'SELECT * FROM facebook_profiles WHERE user_id = '+ $.cookieStorage.get('User').id
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
        if(result !=''){
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = JSON.parse(decodeObjReturn);
            $.cookieStorage.set(convertedReturn[0]);
           //console.log($.cookieStorage.get('facebook_profiles').gender);
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);

    });
}
function Atualizar() {
    if ((document.getElementById("yes")).checked == true) {
        var query = "INSERT INTO users_preferences (user_id, background, notifications_periodicity, notifications_type) VALUES ("+$.cookieStorage.get('User').id+",' ', 'UNITARY', 'EMAIL')";

        var conditions = {
            'General': {
                'query':query
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

        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);

        });

    } else{
        var query = "UPDATE users_preferences SET notifications_periodicity = 'NEVER' WHERE user_id = " + $.cookieStorage.get('User').id;
        var conditions = {
            'General': {
                'query':query
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
           //console.log(result);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);

        });
    }
}
function EditUser(){
    var gender = ' ';
    if((document.getElementById("male")).checked == true){
        gender = "male";
    }else if((document.getElementById("female")).checked == true){
        gender = "female";
    }

    var birthday = document.getElementById('birthday').value;



    var birth  = birthday.split("/");


    var yearofbirth = birth[2];
    var monthofbirth = birth[1];
    var dayofbirth = birth[0];
    var loading = '';
    if(gender != $.cookieStorage.get('User').gender || document.getElementById('emailinput').value != $.cookieStorage.get('User').email || document.getElementById('name').value != $.cookieStorage.get('User').name || yearofbirth+'-'+monthofbirth+'-'+dayofbirth != $.cookieStorage.get('User').birthday){

        loading= $.alert({
            icon: 'fa fa-spinner fa-spin',
            title: '',
            content: false,
            theme:'supervan',
            confirmButton: false,
            autoClose:'confirm|1000',
            closeIcon: false,
            onOpen: function(){
                if((document.getElementById("male")).checked == true){
                    gender = "male";
                }else if((document.getElementById("female")).checked == true){
                    gender = "female";
                }

                var conditionsEditUser = {
                    'User': {
                        'id': $.cookieStorage.get('User').id,
                        'email': document.getElementById('emailinput').value,
                        'name': document.getElementById('name').value,
                        'birthday': yearofbirth+'-'+monthofbirth+'-'+dayofbirth,
                        'gender': gender

                    }
                };

                var postDataCreateUser = JSON.stringify(conditionsEditUser);


                postDataCreateUser = {
                    'params': postDataCreateUser
                };


                var urlCreateUser = 'https://'+api+'/users/save/first/' + createToken();

                $.ajax({
                    method: "POST",
                    url: urlCreateUser,
                    data: postDataCreateUser,
                    async: false
                }).done(function (result) {

                    var conditions = {
                        'User': {
                            'conditions': {
                                'User.id':$.cookieStorage.get('User').id
                            }
                        }
                    };

                    var postData = JSON.stringify(conditions);

                    postData = {
                        'params': postData
                    };
                    var url = 'https://'+api+'/users/get/first/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: url,
                        data: postData
                    }).done(function (result) {
                        if(result != ""){
                            var objReturn = JSON.parse(JSON.stringify(result));
                            var decodeObjReturn = Base64.decode(objReturn);
                            var convertedReturn = JSON.parse(decodeObjReturn);

                            $.cookieStorage.remove('User');
                            $.cookieStorage.set(convertedReturn);
                            var query = "UPDATE facebook_profiles SET gender = '" +  $.cookieStorage.get('User').gender + "' WHERE user_id = " + $.cookieStorage.get('User').id

                            var conditions_facebook_profile = {
                                'General': {
                                    'query':query
                                }

                            };

                            var postData_facebook_profile = JSON.stringify(conditions_facebook_profile);


                            postData_facebook_profile = {
                                'params': postData_facebook_profile
                            };


                            var url_facebook_profile = 'https://'+api+'/General/get/query/' + createToken();

                            $.ajax({
                                method: "POST",
                                url: url_facebook_profile,
                                data: postData_facebook_profile,
                                async: false
                            }).done(function (result) {
                                if(result == "ImE6MDp7fSI=") {

                                    window.location.href = "my_profile.html";
                                    var fotoUsuario = $.cookieStorage.get('User').photo;
                                    if(fotoUsuario.indexOf('?') == -1){
                                        fotoUsuario = fotoUsuario + '?' + (new Date()).getTime();
                                    }else{
                                        fotoUsuario = fotoUsuario + '&' + (new Date()).getTime();
                                    }
                                    if(fotoUsuario!= "") {
                                        $("#fotousuario").attr('src',fotoUsuario);
                                        if($("#fotousuario")[0].x>$("#fotousuario")[0].y){

                                        }else{
                                            //$("#fotousuario").addClass("fotohorizontal");
                                        }

                                    }else{
                                        $("#fotousuario").attr('src',icons+'ImagemIndisponivel2.png' + '?' + (new Date()).getTime());
                                        //$("#fotousuario").addClass("fotohorizontal");
                                    }

                                    $("#emailinput").attr('value', $.cookieStorage.get('User').email);
                                    $("#nickname").attr('value', $.cookieStorage.get('User').name);
                                    $("#name").attr('value', $.cookieStorage.get('User').name);
                                    $("#birthday").attr('value', $.cookieStorage.get('User').birthday);
                                    setFBprofile();
                                    loading.close();
                                    window.location.href = "home.html";
                                }
                                loading.close();
                                generateModalAlert("Perfil atualizado!");
                                $('#mymodal').modal('show');
                                setFBprofile();
                                window.location.href = "home.html";
                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                alert(errorThrown);
                            });

                        } else{
                            loading.close();
                            generateModalAlert("Perfil não foi atualizado, tente novamente!");
                            $('#mymodal').modal('show');


                        }
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);

                    });




                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });
            }

        });

    }else{
        Atualizar();
        window.location.href = "home.html";
    }
    loading.open();
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

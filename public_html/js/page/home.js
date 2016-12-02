var limitarcaracteres = 16;
var agora = moment(new Date());
agora  = agora.year()+"-"+((agora.month()/1)+1)+"-"+agora.date() + " " + agora.hour()+":"+agora.minutes()+":00";
var query = '';
if($.cookieStorage.isSet('facebook_profiles')){
    var religion = $.cookieStorage.get('facebook_profiles').religion;
    var locationss = $.cookieStorage.get('facebook_profiles').location;
    var gender = $.cookieStorage.get('facebook_profiles').gender;
    var relationship_status = $.cookieStorage.get('facebook_profiles').relationship_status;
    var political = $.cookieStorage.get('facebook_profiles').political;
    var hairtype = $.cookieStorage.get('facebook_profiles').hair_type;
    var chemistry = $.cookieStorage.get('facebook_profiles').chemistry;
}else{
    var religion = '';
    var locationss = '';
    var gender = '';
    var relationship_status = '';
    var political = '';
    var hairtype = '';
    var chemistry ='';
}

var Offers = new Array;
var HTML = '';
var OffersPerfil = new Array;

var urlbackground1 = 'https://secure.jezzy.com.br/uploads/loading/14017858_10210089587742018_1484715137_n.gif';

var urlbackground2 = 'https://secure.jezzy.com.br/uploads/loading/14017858_10210089587742018_1484715137_n.gif';



if(religion == ''){
    religion = "''";
}else{
    religion = '"'+religion+'"';
}
if(locationss == ''){
    locationss = "''";
}else{
    locationss = '"'+locationss+'"';
}
if(gender == ''){
    gender = "''";
}else{
    gender = gender;
}
if(relationship_status == ''){
    relationship_status = "''";
}else{
    relationship_status = '"'+relationship_status+'"';
}
if(political == ''){
    political = "''";
}else{
    political = '"'+political+'"';
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
            window.location.href = 'home.html';
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);

    });
}
function firstLogin(){
    var query = 'SELECT * FROM users_preferences WHERE user_id = ' + $.cookieStorage.get('User').id+';';

    var conditions = {
        'User':{
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
        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = (JSON.parse(decodeObjReturn));
       //console.log(convertedReturn);
        var firstLogin = convertedReturn[0].users_preferences.first_login;

        if(firstLogin/1 == 0){
            var ola = utf8_decode('Olá ');
            var txt = utf8_decode(',<br>seja bem-vindo(a) ao Jezzy!<br><br>Conte-nos um pouco mais sobre você:');
            $("#myModalLabel").html(ola+ $.cookieStorage.get('User').name + txt);
            //MODAL PRIMEIRA CONFIGURAÇÃO
            var hairtype = '';
            var chemistry = '';
            var gender = '';
            var espessura = '';
            var scalp = '';
            var thickness = '';
            $("#buttonmodalfirstlogin").click();


            $("#salvarbuttonfirstlogin").click(function() {
                var typehair = '';
                var chemistryhair = '';
                var birthday = '';
                gender = document.getElementById("sel1").value;
                hairtype = $("input[name='hairtype']");
                for (var k = 0; k < hairtype.length; k++) {
                    if (hairtype[k].checked) {
                        if (hairtype[k].value == 'straight' || hairtype[k].value == 'wavy/curly/kcc' || hairtype[k].value == 'blond/grey') {
                            typehair += hairtype[k].value + ';';
                        } else {
                            chemistryhair += hairtype[k].value + ';';
                        }
                    }
                }
                birthday = document.getElementById("niver").value;

                var birthdaymonth = birthday.split('/')[1];
                var birthdayday = birthday.split('/')[0];
                var birthdayyear = birthday.split('/')[2];
                var userbirthday = birthdayyear + '-' + birthdaymonth + '-' + birthdayday;
                if (birthday == '' || birthday == '__/__/____' ) {
                    generateModalAlert(utf8_decode('Você') + " precisa selecionar o " + utf8_decode('aniversário'));
                    $('#mymodal').modal('show');
                } else {
                    if (gender == 'Qual seu sexo?') {
                    generateModalAlert(utf8_decode('Você') + " precisa selecionar o " + utf8_decode('gênero'));
                    $('#mymodal').modal('show');

                } else {

                    if (chemistryhair == '' && typehair == '') {
                        chemistryhair = 'normal;';
                    }
                    var query = 'UPDATE facebook_profiles SET hair_type = "' + typehair + '", chemistry = "' + chemistryhair + '", gender = "' + gender + '", birthday = "' + userbirthday + '" WHERE user_id = ' + $.cookieStorage.get('User').id;

                    var conditions = {
                        'General': {
                            'query': query
                        }
                    };

                    var postData = JSON.stringify(conditions);

                    postData = {
                        'params': postData
                    };
                    var url = 'https://' + api + '/General/get/query/' + createToken();


                    $.ajax({
                        method: "POST",
                        url: url,
                        data: postData,
                        async: false
                    }).done(function (result) {
                        var query = 'UPDATE users SET gender = "' + gender + '", birthday = "' + userbirthday + '" WHERE id = ' + $.cookieStorage.get('User').id;

                        var conditions = {
                            'General': {
                                'query': query
                            }
                        };

                        var postData = JSON.stringify(conditions);

                        postData = {
                            'params': postData
                        };
                        var url = 'https://' + api + '/General/get/query/' + createToken();


                        $.ajax({
                            method: "POST",
                            url: url,
                            data: postData,
                            async: false
                        }).done(function (result) {
                            var query = 'SELECT * FROM users User WHERE id = ' + $.cookieStorage.get('User').id;

                            var conditions = {
                                'General': {
                                    'query': query
                                }
                            };

                            var postData = JSON.stringify(conditions);

                            postData = {
                                'params': postData
                            };
                            var url = 'https://' + api + '/General/get/query/' + createToken();


                            $.ajax({
                                method: "POST",
                                url: url,
                                data: postData,
                                async: false
                            }).done(function (result) {
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                                var query = 'UPDATE users_preferences SET first_login = 1 WHERE user_id = ' + $.cookieStorage.get('User').id;

                                var conditions = {
                                    'General': {
                                        'query': query
                                    }
                                };

                                var postData = JSON.stringify(conditions);

                                postData = {
                                    'params': postData
                                };
                                var url = 'https://' + api + '/General/get/query/' + createToken();


                                $.ajax({
                                    method: "POST",
                                    url: url,
                                    data: postData
                                }).done(function (result) {
                                    $.cookieStorage.set(convertedReturn[0]);
                                    setFBprofile();

                                    //  location.reload();

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
                }
            }
            });

            }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
$(document).ready(function () {
    $("#niver").mask("99/99/9999");
    if(localStorage.getItem('atualizarpag') != null){
        if(localStorage.getItem('atualizarpag') == 1){
            localStorage.removeItem('atualizarpag');
            location.reload();
        }
    }

    if($.cookieStorage.isSet('CPF')){
        var User = $.cookieStorage.get('User');
        User.cpf = $.cookieStorage.get('CPF');
        User = {User: User};
        $.cookieStorage.set(User);
        $.cookieStorage.remove('CPF');
        window.location.href = 'home.html';
    }
    document.getElementById('imageServiceHomeId2').style.backgroundImage = "url('"+urlbackground1+"')";
    document.getElementById('imageServiceHomeId').style.backgroundImage = "url('"+urlbackground2+"')";


    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;
     $.cookieStorage.remove("Company");
     $.cookieStorage.remove("Offer");
     $.cookieStorage.remove("subclasses");
     $.cookieStorage.remove("classes");
     $.cookieStorage.remove("SchedulesSolicitation");
     $.cookieStorage.remove("parcels");
     $.cookieStorage.remove("shipping_value");
     $.cookieStorage.remove('paginaanterior');
     $.cookieStorage.remove('address');
     $.cookieStorage.remove('city');
     $.cookieStorage.remove('complement');
     $.cookieStorage.remove('district');
     $.cookieStorage.remove('metrics');
     $.cookieStorage.remove('number');
     $.cookieStorage.remove('quantidade');
     $.cookieStorage.remove('shipping_days');
     $.cookieStorage.remove('shipping_type');
     $.cookieStorage.remove('state');
     $.cookieStorage.remove('total_value');
     $.cookieStorage.remove('usuario');
     $.cookieStorage.remove('zip_code');
     $.cookieStorage.remove("Checkout");
     $.cookieStorage.remove("Schedules");
     $.cookieStorage.remove("Vouchers");
     $.cookieStorage.remove("companies");
     $.cookieStorage.remove("secondary_users");
     $.cookieStorage.remove("service_secondary_users");
     $.cookieStorage.remove("services");
    PublicWithCompany();

        firstLogin();
        Schedules();

    UpdateLastUpdate();
    PreencheCompany();
    //location.reload();
    Notifications();






    $('#notify').click(function (){
            window.location.href = 'notifications.html';
    });
    $("#userName").click(function (){
            window.location.href = 'my_profile.html';
    });
    $("#calendarDisplayLink").click(function (){


        var query = 'SELECT * FROM companies_users WHERE status = "ACTIVE" and user_id = ' + $.cookieStorage.get('User').id;

        var conditions = {
            'General':{
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
            data: postData,
            async: false
        }).done(function(result) {
            if(result != 'ImE6MDp7fSI='){
                $.dialog({
                    title: '',
                    content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><button class="btn" onclick="NovoAgendamento();">Novo Agendamento</button></br></br><button class="btn" onclick="AgendamentosExistentes();" >Agendamentos Existentes</button></br></br><button class="btn" onclick="AgendamentoComVoucher();">Agendar com Voucher</button>',
                    animation: 'zoom',
                    closeIcon:false,
                    closeAnimation: 'scale',
                    animationBounce: 1.5,
                    backgroundDismiss:true,
                    theme: 'supervan',
                    keyboardEnabled: true

                });
            }else{
                var salao = 'salão';
                var servicos = 'serviço.';
                var voce = 'Você';
                var saloes = 'salões';
                $.dialog({
                    title: 'Sem '+utf8_decode(saloes)+' favoritos.</br>'+utf8_decode(voce)+' precisa seguir um '+utf8_decode(salao)+'</br>para agendar um '+utf8_decode(servicos),
                    content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><button class="btn" onclick="mudatela(\'bussiness_list.html\');">Seguir um '+utf8_decode(salao)+' existente</button></br></br><button class="btn" onclick="mudatela(\'formcontactcompany.html\');" >Indicar meu '+utf8_decode(salao)+'</button>',
                    animation: 'zoom',
                    closeIcon:false,
                    closeAnimation: 'scale',
                    animationBounce: 1.5,
                    backgroundDismiss:true,
                    theme: 'supervan',
                    keyboardEnabled: true

                });
            }


        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });




    });

    $("#servicesHistoryLink").click(function (){
            window.location.href = "vouchers_list.html";

    });
    
    $("#homeCardDivIcon").click(function (){
        window.location.href = "offer_history.html";
    });

    $("#offerIconDisplay").click(function (){
            window.location.href = "services_history.html";
    });

    $("#userOptonsIcon").click(function (){
            window.location.href = "my_profile.html";
    });
    $("#feedLink").click(function (){
            window.location.href = "news.html";
    });
    $("#AGENDA").click(function (){
            window.location.href = "agenda-views.html";
    });
    $("#offerDisplayLink").click(function () {
        window.location.href = "offer_display.html";


    });
    $("#plusIcon").click(function (){
            window.location.href = "business_follow.html";
    });
    $("#divOfferDisplayLink").click(function(){
        window.location.href = "offer_display.html";
    });
});
function mudatela(tela){
    window.location.href = tela;
}
function Notifications(){
    if($.cookieStorage.isSet('notifications')){
        if($.cookieStorage.get('notifications')!=0){
            $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink' /><span class='badge' id='notify'>"+$.cookieStorage.get('notifications')+"</span>");
        }else {
            $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink'/>");
        }
    }else{
        $('#notify').html("<img src='img/icons/Sino.png' class='menu' id='UserLink'/>");
    }

}
function UpdateLastUpdate(){
    var query = 'UPDATE users SET last_update = "'+agora+'" WHERE id = ' + $.cookieStorage.get('User').id;

    var conditions = {
        'General':{
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
}
function recursiva() {

    if (OffersPerfil != '' && OffersPerfil.length !=1) {
    for (var cont = 0; cont < 2; cont++) {
        for (var cont2 = 0; cont2 < 2; cont2++) {
            var aleatorio = Math.floor(Math.random() * OffersPerfil.length);
            var aleatorio2 = Math.floor(Math.random() * OffersPerfil.length);
        }
    }
    if (OffersPerfil.length != 2) {
        while (aleatorio == aleatorio2) {
            aleatorio2 = Math.floor(Math.random() * OffersPerfil.length);
        }
    }

    //while(aleatorio == aleatorio2){
    // aleatorio2 = Math.floor(Math.random() * Offers.length);
    //}

    $("#foto").attr('src', 'https://' + ip + '/jezzy-mobile/public_html/img/icons/loading.gif');
    var id_offer1 = JSON.stringify(OffersPerfil[aleatorio].Offer.id);
    var foto_offer1 = '';

    if (OffersPerfil[aleatorio].Offer.photo != ''&& OffersPerfil[aleatorio2].Offer.photo != null&& OffersPerfil[aleatorio2].Offer.photo != undefined&& OffersPerfil[aleatorio2].Offer.photo != 'undefined') {
        foto_offer1 =  OffersPerfil[aleatorio].Offer.photo;

        var index = foto_offer1.indexOf(' ');
        for(var j=0;j<index/1;j++){
            foto_offer1 =  foto_offer1.replace(' ', '%20');
        }



    } else {
        foto_offer1 = icons + 'ImagemIndisponivel2.png';
    }
        if(foto_offer1.indexOf('png') != -1){
            document.getElementById('imageServiceHomeId2').style.backgroundImage = "url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQEa5mXlrYptb3M9CBREv39Asl74IwIQJFUR2UxFl92__cFaLRSQP6v5kWlhw')";
        }

    var title_offer1 = OffersPerfil[aleatorio].Offer.title;
    var price_offer1 = monetary(OffersPerfil[aleatorio].Offer.value);
    var discount_price_offer1 = (OffersPerfil[aleatorio].Offer.value / 100) * (100 - OffersPerfil[aleatorio].Offer.percentage_discount);
    var discountprice_offer1 = monetary(discount_price_offer1.toFixed(2));
    var discount_offer1 = Math.floor(OffersPerfil[aleatorio].Offer.percentage_discount);

    var id_offer2 = JSON.stringify(OffersPerfil[aleatorio2].Offer.id);
    var foto_offer2 = '';
    if (OffersPerfil[aleatorio2].Offer.photo != '' && OffersPerfil[aleatorio2].Offer.photo != null&& OffersPerfil[aleatorio2].Offer.photo != undefined&& OffersPerfil[aleatorio2].Offer.photo != 'undefined') {

        foto_offer2 =  OffersPerfil[aleatorio2].Offer.photo;
        var index = foto_offer2.indexOf(' ');
        for(var j=0;j<index/1;j++){
            foto_offer2 =  foto_offer2.replace(' ', '%20');
        }




    } else {
        foto_offer2 = icons + 'ImagemIndisponivel2.png';
    }

        if(foto_offer2.indexOf('png') != -1){
            document.getElementById('imageServiceHomeId').style.backgroundImage = "url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQEa5mXlrYptb3M9CBREv39Asl74IwIQJFUR2UxFl92__cFaLRSQP6v5kWlhw')";
        }
    var title_offer2 = OffersPerfil[aleatorio2].Offer.title;
    var price_offer2 = monetary(OffersPerfil[aleatorio2].Offer.value);
    var discount_price_offer2 = (OffersPerfil[aleatorio2].Offer.value / 100) * (100 - OffersPerfil[aleatorio2].Offer.percentage_discount);
    var discountprice_offer2 = monetary(discount_price_offer2.toFixed(2));
    var discount_offer2 = Math.floor(OffersPerfil[aleatorio2].Offer.percentage_discount);


    var oferta1 = '';
    var oferta2 = '';
    if (discount_offer1 != 0) {
        oferta1 = " <img src=" + foto_offer1 + " class='imagem' id='foto' onclick='clickOffer(" + id_offer1 + ")' id=" + id_offer1 + "><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle' id='offertitle'>" + title_offer1 + "</div><div class='oferta1olderprice' id='ofertaoldprice'> De " + price_offer1 + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + id_offer1 + ")'> <span class='offerprice' id='offerprice'><sup>Por</sup></span><span class='offerprice' id='offerprices'>" + discountprice_offer1 + "</span></div></div>";
    } else {
        oferta1 = " <img src=" + foto_offer1 + " class='imagem' id='foto' onclick='clickOffer(" + id_offer1 + ")' id=" + id_offer1 + "><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle' id='offertitle'>" + title_offer1 + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + id_offer1 + ")'> <span class='offerprice' id='offerprice'><sup>Por</sup></span><span class='offerprice' id='offerprices'>" + discountprice_offer1 + "</span></div></div>";
    }

    if (discount_offer2 != 0) {
        oferta2 = " <img src=" + foto_offer2 + " class='imagem' id='foto2' onclick='clickOffer(" + id_offer2 + ")' id=" + id_offer2 + "><div id='value2' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle' id='offertitle2'>" + title_offer2 + "</div><div class='oferta1olderprice' id='ofertaoldprice2'> De " + price_offer2 + "</div><div id='oferta2' class='oferta2' onclick='clickOffer(" + id_offer2 + ")'> <span class='offerprice' id='offerprice2'><sup>Por</sup></span><span class='offerprice' id='offerprices2'>" + discountprice_offer2 + "</span></div></div>";
    } else {
        oferta2 = " <img src=" + foto_offer2 + " class='imagem' id='foto2' onclick='clickOffer(" + id_offer2 + ")' id=" + id_offer2 + "><div id='value2' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle' id='offertitle2'>" + title_offer2 + "</div><div id='oferta2' class='oferta2' onclick='clickOffer(" + id_offer2 + ")'> <span class='offerprice' id='offerprice2'><sup>Por</sup></span><span class='offerprice' id='offerprices2'>" + discountprice_offer2 + "</span></div></div>";
    }
    $("#imageServiceHomeId2").fadeIn('slow', function () {
        $("#imageServiceHomeId2").html(oferta1);
        document.getElementById('imageServiceHomeId2').style.backgroundImage = "url('"+urlbackground1+"')";

    });

    $("#imageServiceHomeId").fadeIn('slow', function () {
        $("#imageServiceHomeId").html(oferta2);
        document.getElementById('imageServiceHomeId').style.backgroundImage = "url('"+urlbackground2+"')";
    });



}

};
function recursiva2() {

    if (OffersPerfil != '' && OffersPerfil.length !=1) {

        setInterval(function () {
            urlbackground1 = 'https://secure.jezzy.com.br/uploads/loading/14017858_10210089587742018_1484715137_n.gif';
            urlbackground2 = 'https://secure.jezzy.com.br/uploads/loading/14017858_10210089587742018_1484715137_n.gif';
            document.getElementById('imageServiceHomeId2').style.backgroundImage = "url('"+urlbackground1+"')";
            document.getElementById('imageServiceHomeId').style.backgroundImage = "url('"+urlbackground2+"')";
        for (var cont = 0; cont < 2; cont++) {
            for (var cont2 = 0; cont2 < 2; cont2++) {
                var aleatorio = Math.floor(Math.random() * OffersPerfil.length);
                var aleatorio2 = Math.floor(Math.random() * OffersPerfil.length);
            }
        }
        while (aleatorio == aleatorio2) {
            aleatorio2 = Math.floor(Math.random() * OffersPerfil.length);
        }


        var id_offer1 = JSON.stringify(OffersPerfil[aleatorio].Offer.id);
        var foto_offer1 = '';
        if (OffersPerfil[aleatorio].Offer.photo != ''&& OffersPerfil[aleatorio2].Offer.photo != null&& OffersPerfil[aleatorio2].Offer.photo != undefined&& OffersPerfil[aleatorio2].Offer.photo != 'undefined') {
            foto_offer1 = OffersPerfil[aleatorio].Offer.photo;
            var index = foto_offer1.indexOf(' ');
            for(var j=0;j<index/1;j++){
                foto_offer1 =  foto_offer1.replace(' ', '%20');
            }
        } else {
            foto_offer1 = icons + 'ImagemIndisponivel2.png';
        }
        if(foto_offer1.indexOf('png') != -1){
            document.getElementById('imageServiceHomeId2').style.backgroundImage = "url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQEa5mXlrYptb3M9CBREv39Asl74IwIQJFUR2UxFl92__cFaLRSQP6v5kWlhw')";

        }
        var title_offer1 = OffersPerfil[aleatorio].Offer.title;
        var price_offer1 = monetary(OffersPerfil[aleatorio].Offer.value);
        var discount_price_offer1 = (OffersPerfil[aleatorio].Offer.value / 100) * (100 - OffersPerfil[aleatorio].Offer.percentage_discount);
        var discountprice_offer1 = monetary(discount_price_offer1.toFixed(2));
        var discount_offer1 = Math.floor(OffersPerfil[aleatorio].Offer.percentage_discount);

        var id_offer2 = JSON.stringify(OffersPerfil[aleatorio2].Offer.id);
        var foto_offer2 = '';
        if (OffersPerfil[aleatorio2].Offer.photo != ''&& OffersPerfil[aleatorio2].Offer.photo != null&& OffersPerfil[aleatorio2].Offer.photo != undefined&& OffersPerfil[aleatorio2].Offer.photo != 'undefined') {
            foto_offer2 = OffersPerfil[aleatorio2].Offer.photo;
            var index = foto_offer2.indexOf(' ');
            for(var j=0;j<index/1;j++){
                foto_offer2 =  foto_offer2.replace(' ', '%20');
            }
        } else {
            foto_offer2 = icons + 'ImagemIndisponivel2.png';
        }
        if(foto_offer2.indexOf('png') != -1){


            document.getElementById('imageServiceHomeId').style.backgroundImage = "url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQEa5mXlrYptb3M9CBREv39Asl74IwIQJFUR2UxFl92__cFaLRSQP6v5kWlhw')";
        }

        var title_offer2 = OffersPerfil[aleatorio2].Offer.title;
        var price_offer2 = monetary(OffersPerfil[aleatorio2].Offer.value);
        var discount_price_offer2 = (OffersPerfil[aleatorio2].Offer.value / 100) * (100 - OffersPerfil[aleatorio2].Offer.percentage_discount);
        var discountprice_offer2 = monetary(discount_price_offer2.toFixed(2));
        var discount_offer2 = Math.floor(OffersPerfil[aleatorio2].Offer.percentage_discount);

        function fadefade() {
            $("#foto").fadeOut(100, function () {
                $(this).attr('src', foto_offer1);
                document.getElementById("oferta1").setAttribute('onclick', 'clickOffer(' + id_offer1 + ')');
                document.getElementById("foto").setAttribute('onclick', 'clickOffer(' + id_offer1 + ')');

                $("#offertitle").fadeOut(100, function () {
                    $(this).text(title_offer1);
                    $(this).html(title_offer1);
                    $(this).fadeIn(900, function () {

                    });
                });
                $("#ofertaoldprice").fadeOut(100, function () {
                    $(this).text(price_offer1);
                    $(this).html(price_offer1);
                    $(this).fadeIn(900, function () {

                    });
                });
                $("#offerprices").fadeOut(100, function () {
                    $(this).text(discountprice_offer1);
                    $(this).html(discountprice_offer1);
                    $(this).fadeIn(900, function () {

                    });
                });
                $("#offerprice").fadeOut(100, function () {
                    $(this).fadeIn(900, function () {
                    });
                });
                $(this).fadeIn(900, function () {

                });

            });
            $("#foto2").fadeOut(100, function () {
                $(this).attr('src', foto_offer2);
                document.getElementById("oferta2").setAttribute('onclick', 'clickOffer(' + id_offer2 + ')');
                document.getElementById("foto2").setAttribute('onclick', 'clickOffer(' + id_offer2 + ')');

                $("#offertitle2").fadeOut(100, function () {
                    $(this).text(title_offer2);
                    $(this).html(title_offer2);
                    $(this).fadeIn(900, function () {

                    });
                });
                $("#ofertaoldprice2").fadeOut(100, function () {
                    $(this).text(price_offer2);
                    $(this).html(price_offer2);
                    $(this).fadeIn(900, function () {

                    });
                });
                $("#offerprices2").fadeOut(100, function () {
                    $(this).text(discountprice_offer2);
                    $(this).html(discountprice_offer2);
                    $(this).fadeIn(900, function () {

                    });
                });
                $("#offerprice2").fadeOut(100, function () {
                    $(this).fadeIn(900, function () {
                    });
                });
                $(this).fadeIn(900, function () {

                });

            });

        }

        fadefade();

    }, 10000)
}
};
function utf8_decode (str_data) {
    //  discuss at: http://phpjs.org/functions/utf8_decode/
    // original by: Webtoolkit.info (http://www.webtoolkit.info/)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (http://brett-zamir.me)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Norman "zEh" Fuchs
    // bugfixed by: hitwork
    // bugfixed by: Onno Marsman
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: kirilloid
    // bugfixed by: w35l3y (http://www.wesley.eti.br)
    //   example 1: utf8_decode('Kevin van Zonneveld');
    //   returns 1: 'Kevin van Zonneveld'

    var tmp_arr = [],
        i = 0,
        c1 = 0,
        seqlen = 0

    str_data += ''

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i) & 0xFF
        seqlen = 0

        // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
        if (c1 <= 0xBF) {
            c1 = (c1 & 0x7F)
            seqlen = 1
        } else if (c1 <= 0xDF) {
            c1 = (c1 & 0x1F)
            seqlen = 2
        } else if (c1 <= 0xEF) {
            c1 = (c1 & 0x0F)
            seqlen = 3
        } else {
            c1 = (c1 & 0x07)
            seqlen = 4
        }

        for (var ai = 1; ai < seqlen; ++ai) {
            c1 = ((c1 << 0x06) | (str_data.charCodeAt(ai + i) & 0x3F))
        }

        if (seqlen == 4) {
            c1 -= 0x10000
            tmp_arr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)), String.fromCharCode(0xDC00 | (c1 & 0x3FF)))
        } else {
            tmp_arr.push(String.fromCharCode(c1))
        }

        i += seqlen
    }

    return tmp_arr.join('')
}

function NovoAgendamento(){
    window.location.href = "company_selection.html";
}
function AgendamentosExistentes(){
    window.location.href = "schedules_display.html";
}
function AgendamentoComVoucher(){
    window.location.href = "vouchers_list.html";
}
function meuLog(msg) {
    div = document.body;
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

function clickOffer(offer){ //setando cookie com id da oferta clicada
    var query = 'SELECT * FROM offers_statistics WHERE offer_id = ' + offer;

    var conditions = {
        'General':{
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
        data: postData,
        async: false
    }).done(function(result) {
        if(result != "ImE6MDp7fSI=") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            for (var i = 0; i < convertedReturn.length; i++) {


                var cliques = (convertedReturn[i].offers_statistics.details_click) / 1 + 1;

                var query2 = 'UPDATE offers_statistics SET details_click = ' + cliques + ' WHERE offer_id = ' + offer;

                var conditions2 = {
                    'General': {
                        'query': query2
                    }
                };

                var postData2 = JSON.stringify(conditions2);

                postData2 = {
                    'params': postData2
                };
                var url2 = 'https://' +api + '/General/get/query/' + createToken();


                $.ajax({
                    method: "POST",
                    url: url2,
                    data: postData2,
                    async: false
                }).done(function (result) {
                    if (result == "ImE6MDp7fSI=") {
                        var query2 = 'SELECT title, id, company_id, value FROM offers Offer WHERE id = ' + offer;

                        var conditions2 = {
                            'User': {
                                'query': query2
                            }
                        };

                        var postData2 = JSON.stringify(conditions2);

                        postData2 = {
                            'params': postData2
                        };
                        var url2 = 'https://' +api + '/users/get/query/' + createToken();


                        $.ajax({
                            method: "POST",
                            url: url2,
                            data: postData2
                        }).done(function (result) {
                            if (result != "") {
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = (JSON.parse(decodeObjReturn));
                                for (var i = 0; i < convertedReturn.length; i++) {
                                    var oferta = convertedReturn[i];

                                    $.cookieStorage.remove('Offer');

                                    $.cookieStorage.set(oferta);

                                    if ($.cookieStorage.isSet('Offer')) {
                                        window.location.href = "offer_product_detail.html";
                                    } else {
                                        generateModalAlert("Erro ao salvar Cookie");
                                        $('#mymodal').modal('show');
                                    }
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
        }
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });

}
function Sair(){
    $.cookieStorage.remove('User');
    $.removeAllStorages();
    localStorage.removeItem('FavCompany');
    window.location.href = 'https://'+ip+'/jezzy-mobile/public_html/index.html';
}
/*
    function PublicNoCompany(){
        var query = '';
        query = 'SELECT DISTINCT Offer.id, Offer.title, Offer.company_id,  Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels, Offer.parcels_quantity FROM offers Offer WHERE Offer.company_id = 99999 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.amount_allowed >=1 and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE" and Offer.public ="ACTIVE" ORDER BY Offer.id DESC LIMIT 8;';

        var conditions = {
            'User': {
                'query': query
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
        }).done(function (result) {

            if(result!=''){
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = (JSON.parse(decodeObjReturn));

                var tamanho = Offers.length+convertedReturn.length;
                var tamanhoVetorOffers = Offers.length;
                for(var i=Offers.length;i<tamanho;i++){
                    Offers[i] = convertedReturn[i-tamanhoVetorOffers];
                }

            }

            localStorage.setItem("Ofertas", (JSON.stringify(Offers)));

            PrivateNoCompany();

        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
    }
*/
    function PublicWithCompany(){
        var query = '';
        query = 'SELECT DISTINCT Offer.id, Offer.title, Offer.company_id, Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels, Offer.parcels_quantity FROM offers_users RIGHT OUTER JOIN offers Offer ON Offer.id = offers_users.offer_id WHERE offers_users.user_id = ' + $.cookieStorage.get('User').id +' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.company_id != 99999 and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE"  or  Offer.company_id = 99999 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.status = "ACTIVE" and Offer.amount_allowed >=1  ORDER BY Offer.company_id DESC, Offer.id DESC LIMIT 10';
	

        var conditions = {
            'User': {
                'query': query
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
            data: postData,
            async: false
        }).done(function (result) {
            if(result!=''){
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturne = (JSON.parse(decodeObjReturn));
              // alert(convertedReturne.Offer.id);
                var tamanho = Offers.length+convertedReturne.length;
                var tamanhoVetorOffers = Offers.length;
                for(var i=Offers.length;i<tamanho;i++){

                    Offers[i] = convertedReturne[i-tamanhoVetorOffers];
                    //console.log(convertedReturne[i-tamanhoVetorOffers]);
                }

            }

            localStorage.setItem('Ofertas', (JSON.stringify(Offers)));

            //PublicNoCompany();
            var query = 'SELECT * FROM users_preferences WHERE user_id = ' + $.cookieStorage.get('User').id+';';

            var conditions = {
                'User':{
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
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = (JSON.parse(decodeObjReturn));
                //console.log(convertedReturn);
                var firstLogin = convertedReturn[0].users_preferences.first_login;

                if(firstLogin/1 != 0) {
                    PrivateNoCompany();
                }else{

                }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });


        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
    }

    function PrivateNoCompany(){

        chemistryk = chemistry.substr(0,(chemistry.length - 1));

        if(chemistryk.length>=1) {
            chemistryk = chemistryk.split(';');
        }
        var txt = '';

        if(chemistryk.length > 1){
            txt = ' or hair_type LIKE \"%'+chemistryk[0] + '%\"';
            for(var i=1;i<chemistryk.length;i++){
                txt += ' or  hair_type LIKE \"%'+chemistryk[i]+'%\"';
            }
        }else if(chemistryk.length == 0){
            txt = '';
        }else{
            txt =  ' or hair_type LIKE \"%'+chemistryk[0] +'%\"' ;
        }
        hairtypek = hairtype.substr(0,(hairtype.length - 1));
       if(hairtypek.length>=1){
           hairtypek = hairtypek.split(';');
       }


        if(hairtypek.length > 1){
            if(chemistryk.length>=1){
                txt += ' or hair_type LIKE \"%'+hairtypek[0] + '%\"';
            }else{
                txt += ' or hair_type LIKE \"%'+hairtypek[0] + '%\"';
            }
            for(var i=1;i<hairtypek.length;i++){
                txt += ' or hair_type LIKE \"%'+hairtypek[i]+'%\"';
            }
        }else if(hairtypek.length == 0){
            txt += '';
        }else{
            if(chemistryk.length>=1){
                txt += ' or hair_type LIKE \"%'+hairtypek[0] + '%\"';
            }else{
                txt += ' or hair_type LIKE \"%'+hairtypek[0] + '%\"';
            }
        }



        var query = '';
        query = 'SELECT DISTINCT Offer.id, Offer.company_id,  Offer.title, Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels_quantity, Offer.parcels FROM offers Offer INNER JOIN offers_questions ON offers_questions.offer_id = Offer.id WHERE Offer.company_id = 99999 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.amount_allowed >=1  and Offer.status = "ACTIVE" and (offers_questions.public LIKE "'+gender+'%" or offers_questions.public LIKE "%unissex%")  and (hair_type LIKE "%all%" or hair_type = " "  '+txt+') ORDER BY Offer.id DESC;';
		
        var conditions = {
            'User': {
                'query': query
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
            data: postData,
            async: false
        }).done(function (result) {
            if(result!=''){
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = (JSON.parse(decodeObjReturn));
                var tamanho = OffersPerfil.length+convertedReturn.length;
                var tamanhoVetorOffers = OffersPerfil.length;
                for(var i=OffersPerfil.length;i<tamanho;i++){
                    OffersPerfil[i] = convertedReturn[i-tamanhoVetorOffers];
                }




            }

            localStorage.setItem('OfertasPerfil', JSON.stringify((OffersPerfil)));
            recursiva();
            PrivateWithCompany();
        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
    }

    function PrivateWithCompany(){

        chemistryk = chemistry.substr(0,(chemistry.length - 1));

        if(chemistryk.length>=1) {
            chemistryk = chemistryk.split(';');
        }
        var txt = '';

        if(chemistryk.length > 1){
            txt = ' or hair_type = \"'+chemistryk[0] + '\"';
            for(var i=1;i<chemistryk.length;i++){
                txt += ' or  hair_type = \"'+chemistryk[i]+'\"';
            }
        }else if(chemistryk.length == 0){
            txt = '';
        }else{
            txt =  ' or hair_type = \"'+chemistryk[0] +'\"' ;
        }
        hairtypek = hairtype.substr(0,(hairtype.length - 1));
        if(hairtypek.length>=1){
            hairtypek = hairtypek.split(';');
        }


        if(hairtypek.length > 1){
            if(chemistryk.length>=1){
                txt += ' or hair_type = \"'+hairtypek[0] + '\"';
            }else{
                txt += ' or hair_type = \"'+hairtypek[0] + '\"';
            }
            for(var i=1;i<hairtypek.length;i++){
                txt += ' or hair_type = \"'+hairtypek[i]+'\"';
            }
        }else if(hairtypek.length == 0){
            txt += '';
        }else{
            if(chemistryk.length>=1){
                txt += ' or hair_type = \"'+hairtypek[0] + '\"';
            }else{
                txt += ' or hair_type = \"'+hairtypek[0] + '\"';
            }
        }
        var query = '';
        query = 'SELECT DISTINCT Offer.id, Offer.company_id,  Offer.title, Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels_quantity, Offer.parcels FROM offers_users INNER JOIN offers Offer ON Offer.id = offers_users.offer_id RIGHT OUTER JOIN offers_questions ON offers_questions.offer_id = Offer.id WHERE offers_users.user_id = ' + $.cookieStorage.get('User').id +' and Offer.amount_allowed >=1 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE"  and Offer.company_id != 99999 and (offers_questions.public = "'+gender+'" or offers_questions.public LIKE "%unissex%") and (hair_type LIKE "%all%" or hair_type = " "  '+txt+') ORDER BY Offer.id DESC;';

        var conditions = {
            'User': {
                'query': query
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
            data: postData,
            async: false
        }).done(function (result) {
            if(result!=''){
                var objReturn = JSON.parse(JSON.stringify(result));
                var decodeObjReturn = Base64.decode(objReturn);
                var convertedReturn = (JSON.parse(decodeObjReturn));
                var tamanho = OffersPerfil.length+convertedReturn.length;
                var tamanhoVetorOffers = OffersPerfil.length;
                for(var i=OffersPerfil.length;i<tamanho;i++){
                    OffersPerfil[i] = convertedReturn[i-tamanhoVetorOffers];
                }



            }

            localStorage.setItem('OfertasPerfil', JSON.stringify((OffersPerfil)));
            urlbackground1 = 'https://secure.jezzy.com.br/uploads/loading/14017858_10210089587742018_1484715137_n.gif';
            urlbackground2 = 'https://secure.jezzy.com.br/uploads/loading/14017858_10210089587742018_1484715137_n.gif';
            document.getElementById('imageServiceHomeId2').style.backgroundImage = "url('"+urlbackground1+"')";
            document.getElementById('imageServiceHomeId').style.backgroundImage = "url('"+urlbackground2+"')";
           recursiva2();

        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
    }


/*function sendRequest() {
    var companyid = 0;
    var conditionsCompaniesUsers = {
        'General': {
            'query' :'SELECT * FROM companies_users WHERE user_id =' + $.cookieStorage.get('User').id + ' and status = "ACTIVE";'
        }
    };

    var postDataCompaniesUsers = JSON.stringify(conditionsCompaniesUsers);

    postDataCompaniesUsers = {
        'params': postDataCompaniesUsers
    };
    var urlCompaniesUsers = 'https://'+api+'/General/get/query/' + createToken();


    $.ajax({
        method: "POST",
        url: urlCompaniesUsers,
        data: postDataCompaniesUsers
    }).done(function(result) {

        if(result!='ImE6MDp7fSI='){
        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            var religion = $.cookieStorage.get('facebook_profiles').religion;
            var location = $.cookieStorage.get('facebook_profiles').location;
            var gender = $.cookieStorage.get('facebook_profiles').gender;
            var relationship_status = $.cookieStorage.get('facebook_profiles').relationship_status;
            var political = $.cookieStorage.get('facebook_profiles').political;
            if(religion == ''){
                religion = "''";
            }
            if(location == ''){
                location = "''";
            }
            if(gender == ''){
                gender = "''";
            }
            if(relationship_status == ''){
                relationship_status = "''";
            }
            if(political == ''){
                political = "''";
            }

            var query = '';

















                var conditions = {
                    'User': {
                        'query': query
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
                }).done(function (result) {

                    if (result != "") {
                        var decodeObjReturn = Base64.decode(result);

                        var convertedReturn = (JSON.parse(decodeObjReturn));
                        if(convertedReturn.length>1){
                            var foto;
                            var foto2;
                            for (var i = 0; i < 2; i++) {
                                for (var n = 0; n < 2; n++) {
                                    var aleatorio = Math.floor(Math.random() * convertedReturn.length);
                                    var aleatorio2 = Math.floor(Math.random() * convertedReturn.length);

                                    while (aleatorio == aleatorio2) {
                                        aleatorio2 = Math.floor(Math.random() * convertedReturn.length);
                                    }
                                }

                                var exibirRetorno = convertedReturn[aleatorio];
                                var exibirRetorno2 = convertedReturn[aleatorio2];

                                if(exibirRetorno.Offer.photo!= "") {
                                    foto = exibirRetorno.Offer.photo;

                                }else{
                                    foto =icons+'ImagemIndisponivel2.png';
                                }
                                if(exibirRetorno2.Offer.photo!= "") {
                                    foto2 = exibirRetorno2.Offer.photo;

                                }else{
                                    foto2 =icons+'ImagemIndisponivel2.png';
                                }


                                var cookie = JSON.stringify(exibirRetorno.Offer.id);
                                var cookie2 = JSON.stringify(exibirRetorno2.Offer.id);
                                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);
                                var valorComDesconto2 = (exibirRetorno2.Offer.value / 100) * (100 - exibirRetorno2.Offer.percentage_discount);
                                var arredondado = valorComDesconto.toFixed(2);
                                var arredondado2 = valorComDesconto2.toFixed(2);
                                var linha = monetary(arredondado);
                                var linha2 = monetary(arredondado2);


                            }

                            var price = monetary(exibirRetorno.Offer.value);
                            var price2 = monetary(exibirRetorno2.Offer.value);
                            var offertitle = (exibirRetorno.Offer.title);
                            var offertitle2 = (exibirRetorno2.Offer.title);

                            if (offertitle.length > limitarcaracteres) {
                                offertitle = (offertitle.substring(0, limitarcaracteres)) + "...";
                            }
                            if (offertitle2.length > limitarcaracteres) {
                                offertitle2 = (offertitle2.substring(0, limitarcaracteres)) + "...";
                            }
                            var oferta1 = '';
                            var oferta2 = '';





                            if (exibirRetorno.Offer.percentage_discount != 0) {
                                oferta1 = " <img src=" + foto + " class='imagem' id='foto' onclick='clickOffer(" + cookie + ")' id='imageServiceHome2'><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle + "</div><div class='oferta1olderprice'> De " + price + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha + "</div></div>";

                                $("#imageServiceHomeId2").append(oferta1);

                            } else {
                                oferta1 = " <img src=" + foto + " class='imagem' id='foto' onclick='clickOffer(" + cookie + ")' id='imageServiceHome2'><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha + "</div></div>";

                                $("#imageServiceHomeId2").append(oferta1);

                            }




                            if (exibirRetorno2.Offer.percentage_discount != 0) {
                                oferta2 = "<img src=" + foto2 + " class='imagem' id='foto2' onclick='clickOffer(" + cookie2 + ")' id='imageServiceHome2'><div id='value2' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle2 + "</div><div class='oferta1olderprice'> De " + price2 + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie2 + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha2 + "</div></div>";

                                $("#imageServiceHomeId").append(oferta2);
                            } else {

                                oferta2 = "<img src=" + foto2 + " class='imagem' id='foto2' onclick='clickOffer(" + cookie2 + ")' id='imageServiceHome2'><div id='value2' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle2 + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie2 + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha2 + "</div></div>";
                                $("#imageServiceHomeId").append(oferta2);

                            }
                        }else{
                            var foto;




                                var exibirRetorno = convertedReturn[0];


                                if(exibirRetorno.Offer.photo!= "") {
                                    foto = exibirRetorno.Offer.photo;

                                }else{
                                    foto =icons+'ImagemIndisponivel2.png';
                                }



                                var cookie = JSON.stringify(exibirRetorno.Offer.id);

                                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

                                var arredondado = valorComDesconto.toFixed(2);

                                var linha = monetary(arredondado);





                            var price = monetary(exibirRetorno.Offer.value);

                            var offertitle = (exibirRetorno.Offer.title);

                            if (offertitle.length > limitarcaracteres) {
                                offertitle = (offertitle.substring(0, limitarcaracteres)) + "...";
                            }

                            var oferta1 = '';






                            if (exibirRetorno.Offer.percentage_discount != 0) {
                                oferta1 = " <img src=" + foto + " class='imagem' id='foto' onclick='clickOffer(" + cookie + ")' id='imageServiceHome2'><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle + "</div><div class='oferta1olderprice'> De " + price + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha + "</div></div>";

                                $("#imageServiceHomeId2").append(oferta1);

                            } else {
                                oferta1 = " <img src=" + foto + " class='imagem' id='foto' onclick='clickOffer(" + cookie + ")' id='imageServiceHome2'><div id='value' class='offerinfo'><div class='offerinfoback'></div><div class='offertitle'>" + offertitle + "</div><div id='oferta1' class='oferta1' onclick='clickOffer(" + cookie + ")'> <span class='offerprice'><sup>Por</sup></span> " + linha + "</div></div>";

                                $("#imageServiceHomeId2").append(oferta1);

                            }

                        }






                    }
                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });

    }else{

        var query = 'SELECT * FROM offers Offer WHERE company_id = 99999 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and status = "ACTIVE" ORDER BY begins_at DESC';
        var conditions = {
            'User': {
                'query' :query
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
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = (JSON.parse(decodeObjReturn));


            var textoHtml = " ";
            var textoHtml2 = " ";
            for (var i = 0; i < convertedReturn.length; i++) {
                var exibirRetorno = convertedReturn[i];
                var cookie = JSON.stringify(exibirRetorno);
                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);
                var arredondado = valorComDesconto.toFixed(2);
                var linha = arredondado.replace(".", ",");
                var linhaparcels = monetary(arredondado/12);
                meuLog(linha);
                var id = exibirRetorno.Offer.id;
                var discount = exibirRetorno.Offer.percentage_discount;
                var title = exibirRetorno.Offer.title;
                if (title.length > limitarcaracteres) {
                    title = (title.substring(0, limitarcaracteres)) + "...";
                }
                if (title.length > limitarcaracteres) {
                    title = (title.substring(0, limitarcaracteres)) + "...";
                }
                var photo='';
                if(exibirRetorno.Offer.photo != ""){
                    photo = exibirRetorno.Offer.photo;
                }
                else{
                    photo =icons+"ImagemIndisponivel2.png";
                }
                var value =  exibirRetorno.Offer.value;

                if(discount == 0){
                    textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer("+cookie+")' src='" + photo + "'/></div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src=icons+'card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer("+cookie+")'/>  </div>";
                    textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'></span><div class='offerParcelsdetail'>" + 'em até '+exibirRetorno.Offer.parcels_quantity+'x no cartão de crédito' + "</div><img src=icons+'card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/></div></div>";
                    // textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'> à vista</span><div class='offerParcelsdetail'>" + 'ou em até 12x de ' + linhaparcels + "</div><img src=icons+'card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/> <button  class='compartilhardouradodetail fb-share-button' data-href='http://www.'+ip+'/jezzy-mobile/public_html/' data-layout='link'/></div></div>";
                } else {
                    textoHtml += "<div id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer("+cookie+")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%'+ "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src=icons+'card_offfer_dark.png'  class='iconCardCheckout' onclick='clickOffer("+cookie+")'/>  </div>";
                    textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value+ "</div><div id='circle' class='offer_circledetail'>" + discount + '%'+ "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'></span><div class='offerParcelsdetail'>" + 'em até '+exibirRetorno.Offer.parcels_quantity+'x no cartão de crédito'+"</div><img src=icons+'card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/></div></div>";
                    //textoHtml2 += "<div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer("+cookie+")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value+ "</div><div id='circle' class='offer_circledetail'>" + discount + '%'+ "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'> à vista</span><div class='offerParcelsdetail'>" + 'ou em até 12x de ' + linhaparcels + "</div><img src=icons+'card_offfer_dark.png'  class='iconCardCheckoutdetail' onclick='clickOffer("+cookie+")'/> <button  class='compartilhardouradodetail fb-share-button' data-href='http://www.'+ip+'/jezzy-mobile/public_html/' data-file-upload-preview='http://192.168.1.200/Ariany_F.png' data-layout='link'/></div></div>";
                }

            }

            $("#offerDisplay").append(textoHtml);

            $("#normal").click(function(){
                $("#offerDisplay").html(textoHtml);
            });

            $("#detail").click(function(){
                $("#offerDisplay").html(textoHtml2);
            });


        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        });
    }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

    }*/

function Click(id){

    var conditions = {
        'Company': {
            'conditions':{
                'Company.id':id
            }

        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://'+api+'/companies/get/first/' + createToken();


    $.ajax({
        method: "POST",
        url: url,
        data: postData,
        async: false
    }).done(function (result) {
        if(result!= ""){
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = (JSON.parse(decodeObjReturn));

            $.cookieStorage.remove('Company');

            $.cookieStorage.set(convertedReturn);

            if ($.cookieStorage.isSet('Company')) {
                    window.location.href = "bussiness_detail.html";
            } else {
                generateModalAlert("Erro ao salvar Cookie");
                $('#mymodal').modal('show');
            }
        }


    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
function PreencheCompany(){
    //console.log(JSON.parse(localStorage.getItem('FavCompany')).id);
    if(JSON.parse(localStorage.getItem('FavCompany'))== null && JSON.parse(localStorage.getItem('FavCompany'))== undefined){

    var query = "SELECT * FROM companies_users WHERE user_id  = "+$.cookieStorage.get('User').id +" and status = 'ACTIVE'";

    var conditionsD = {
        'General': {
            'query' : query
        }
    };

    var postDataD = JSON.stringify(conditionsD);
    postDataD = {
        'params': postDataD
    };

    var urlD = 'https://'+api+'/General/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: urlD,
        data: postDataD
    }).done(function (result) {

        if (result == "ImE6MDp7fSI=") {
            var nocompaniesfollow = utf8_decode('Você ainda não tem um salão favorito!');
            $("#endSchedule").append('<span onclick="OpenModal();">'+nocompaniesfollow+'</span>');
        } else {
            var objReturnss = JSON.parse(JSON.stringify(result));
            var decodeObjReturnss = Base64.decode(objReturnss);
            var convertedReturnss = unserialize(JSON.parse(decodeObjReturnss));
            for (var i = 0; i < convertedReturnss.length; i++) {
                idcompanie = convertedReturnss[i];
                idcompanielast = idcompanie.companies_users.company_id;
            }
            var query = "SELECT * FROM favorites_companies WHERE  user_id  = "+$.cookieStorage.get('User').id + ";" ;

            var conditionsD = {
                'General': {
                    'query' : query
                }
            };

            var postDataD = JSON.stringify(conditionsD);
            postDataD = {
                'params': postDataD
            };

            var urlD = 'https://'+api+'/General/get/query/' + createToken();

            $.ajax({
                method: "POST",
                url: urlD,
                data: postDataD,
                async: false
            }).done(function (result) {

                if (result == "ImE6MDp7fSI=") {
                    var conditionsCompany = {
                        'Company': {
                            'conditions': {
                                'Company.id': idcompanielast
                            }
                        }
                    };

                    var postDataCompany = JSON.stringify(conditionsCompany);

                    postDataCompany = {
                        'params': postDataCompany
                    };

                    var urlCompany = 'https://' +api + '/companies/get/first/' + createToken();

                    $.ajax({
                        method: "POST",
                        url: urlCompany,
                        data: postDataCompany
                    }).done(function (result) {

                        var objReturnCompany = JSON.parse(JSON.stringify(result));
                        var decodeObjReturnCompany = Base64.decode(objReturnCompany);
                        var convertedReturnCompany = (JSON.parse(decodeObjReturnCompany));
                       // $.cookieStorage.set(convertedReturnCompany);

                        localStorage.setItem("FavCompany", (JSON.stringify(convertedReturnCompany.Company)));

                        if (JSON.parse(localStorage.getItem('FavCompany')).status != 'INACTIVE') {
                            var logo = JSON.parse(localStorage.getItem('FavCompany')).logo;
                            var infoCompany;

                            var abertura = (JSON.parse(localStorage.getItem('FavCompany')).open_hour).split(":");
                            var fechamento = (JSON.parse(localStorage.getItem('FavCompany')).close_hour).split(":");
                            var diasabertura = JSON.parse(localStorage.getItem('FavCompany')).work_days;
                            if (diasabertura == "seg,ter,qua,qui,sex") {
                                diasabertura = "Seg a Sex";
                            } else if (diasabertura == "ter,qua,qui,sex,sab,dom") {
                                diasabertura = "Ter a Dom";
                            } else if (diasabertura == "seg,ter,qua,qui,sex,sab,dom") {
                                diasabertura = "Todos os Dias";
                            } else if (diasabertura == "ter,qua,qui,sex,sab") {
                                diasabertura = "Ter a Sab";
                            } else if (diasabertura == "qua,qui,sex,sab,dom") {
                                diasabertura = "Qua a Dom";
                            } else if (diasabertura == "qui,sex,sab,dom") {
                                diasabertura = "Qui a Dom";
                            } else if (diasabertura == "sex,sab,dom") {
                                diasabertura = "Sex a Dom";
                            } else if (diasabertura == "sab,dom") {
                                diasabertura = "Sab e Dom";
                            } else if (diasabertura == "seg,ter,qua") {
                                diasabertura = "Seg a Qua";
                            }
                            else if (diasabertura == "seg,ter,qua") {
                                diasabertura = "Seg a Qua";
                            } else if (diasabertura == "seg,ter,qua") {
                                diasabertura = "Seg a Qua";
                            }
                            if(diasabertura== null){
                                diasabertura = 'Todos os Dias';
                            }
                            infoCompany = "<div onclick=Click(\'" + JSON.parse(localStorage.getItem('FavCompany')).id + "\')><span class='companyname'>" + JSON.parse(localStorage.getItem('FavCompany')).fancy_name + "</span></br><span>" + JSON.parse(localStorage.getItem('FavCompany')).phone + "</span></br><span>" + JSON.parse(localStorage.getItem('FavCompany')).address + ", " + JSON.parse(localStorage.getItem('FavCompany')).number + "</span><br><span>" + JSON.parse(localStorage.getItem('FavCompany')).city + " - " + JSON.parse(localStorage.getItem('FavCompany')).state + "</span><br><span>" + diasabertura + "</span><br><span>" + abertura[0] + ":" + abertura[1] + "h - " + fechamento[0] + ":" + fechamento[1] + "h" + "</span></div>";
                            $("#endSchedule").append(infoCompany);

                        } else {
                            generateModalAlert("Salão favorito atualmente inativo no jezzy!");
                            $('#mymodal').modal('show');
                            window.location.href = "business_follow.html";
                        }


                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });
                } else {

                    var objReturns = JSON.parse(JSON.stringify(result));
                    var decodeObjReturns = Base64.decode(objReturns);
                    var convertedReturns = unserialize(JSON.parse(decodeObjReturns));

                    var idcompanie = 0;


                    for (var i = 0; i < convertedReturns.length; i++) {
                        idcompanie = convertedReturns[i];

                        idcompanielastss = idcompanie.favorites_companies.company_id;
                    }
                    var j = '';

                    for(var g=0; g<convertedReturnss.length;g++){

                        j +=" " + convertedReturnss[g].companies_users.company_id;
                    }
                    var ko = j.split(" ");
                    if(ko.indexOf(idcompanielastss)!=-1){
                        var conditionsCompany = {
                            'Company': {
                                'conditions': {
                                    'Company.id': idcompanielastss
                                }
                            }
                        };

                        var postDataCompany = JSON.stringify(conditionsCompany);

                        postDataCompany = {
                            'params': postDataCompany
                        };

                        var urlCompany = 'https://' +api + '/companies/get/first/' + createToken();

                        $.ajax({
                            method: "POST",
                            url: urlCompany,
                            data: postDataCompany
                        }).done(function (result) {

                            var objReturnCompany = JSON.parse(JSON.stringify(result));
                            var decodeObjReturnCompany = Base64.decode(objReturnCompany);
                            var convertedReturnCompany = (JSON.parse(decodeObjReturnCompany));
                           // $.cookieStorage.set(convertedReturnCompany);

                            localStorage.setItem('FavCompany', JSON.stringify(convertedReturnCompany.Company));

                            if (JSON.parse(localStorage.getItem('FavCompany')).status != 'INACTIVE') {
                                var logo = JSON.parse(localStorage.getItem('FavCompany')).logo;
                                var infoCompany;

                                var abertura = (JSON.parse(localStorage.getItem('FavCompany')).open_hour).split(":");
                                var fechamento = (JSON.parse(localStorage.getItem('FavCompany')).close_hour).split(":");
                                var diasabertura = JSON.parse(localStorage.getItem('FavCompany')).work_days;
                                if (diasabertura == "seg,ter,qua,qui,sex") {
                                    diasabertura = "Seg a Sex";
                                } else if (diasabertura == "ter,qua,qui,sex,sab,dom") {
                                    diasabertura = "Ter a Dom";
                                } else if (diasabertura == "seg,ter,qua,qui,sex,sab,dom") {
                                    diasabertura = "Todos os Dias";
                                } else if (diasabertura == "ter,qua,qui,sex,sab") {
                                    diasabertura = "Ter a Sab";
                                } else if (diasabertura == "qua,qui,sex,sab,dom") {
                                    diasabertura = "Qua a Dom";
                                } else if (diasabertura == "qui,sex,sab,dom") {
                                    diasabertura = "Qui a Dom";
                                } else if (diasabertura == "sex,sab,dom") {
                                    diasabertura = "Sex a Dom";
                                } else if (diasabertura == "sab,dom") {
                                    diasabertura = "Sab e Dom";
                                } else if (diasabertura == "seg,ter,qua") {
                                    diasabertura = "Seg a Qua";
                                }
                                else if (diasabertura == "seg,ter,qua") {
                                    diasabertura = "Seg a Qua";
                                } else if (diasabertura == "seg,ter,qua") {
                                    diasabertura = "Seg a Qua";
                                }
                                if(diasabertura== null){
                                    diasabertura = 'Todos os Dias';
                                }
                                infoCompany = "<div onclick=Click(\'" + JSON.parse(localStorage.getItem('FavCompany')).id + "\')><span class='companyname'>" + JSON.parse(localStorage.getItem('FavCompany')).fancy_name + "</span></br><span>" + JSON.parse(localStorage.getItem('FavCompany')).phone + "</span></br><span>" + JSON.parse(localStorage.getItem('FavCompany')).address + ", " + JSON.parse(localStorage.getItem('FavCompany')).number + "</span><br><span>" + JSON.parse(localStorage.getItem('FavCompany')).city + " - " + JSON.parse(localStorage.getItem('FavCompany')).state + "</span><br><span>" + diasabertura + "</span><br><span>" + abertura[0] + ":" + abertura[1] + "h - " + fechamento[0] + ":" + fechamento[1] + "h" + "</span></div>";
                                $("#endSchedule").append(infoCompany);

                            } else {
                                generateModalAlert("Salão favorito atualmente inativo no jezzy!");
                                $('#mymodal').modal('show');
                                window.location.href = "business_follow.html";
                            }
                        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });
                    }else{
                        var conditionsCompany = {
                            'Company': {
                                'conditions': {
                                    'Company.id': idcompanielast
                                }
                            }
                        };

                        var postDataCompany = JSON.stringify(conditionsCompany);

                        postDataCompany = {
                            'params': postDataCompany
                        };

                        var urlCompany = 'https://' +api + '/companies/get/first/' + createToken();

                        $.ajax({
                            method: "POST",
                            url: urlCompany,
                            data: postDataCompany
                        }).done(function (result) {

                            var objReturnCompany = JSON.parse(JSON.stringify(result));
                            var decodeObjReturnCompany = Base64.decode(objReturnCompany);
                            var convertedReturnCompany = (JSON.parse(decodeObjReturnCompany));
                            //$.cookieStorage.set(convertedReturnCompany);
                            localStorage.setItem('FavCompany', JSON.stringify(convertedReturnCompany.Company));

                            if (JSON.parse(localStorage.getItem('FavCompany')).status != 'INACTIVE') {
                                var logo = JSON.parse(localStorage.getItem('FavCompany')).logo;
                                var infoCompany;

                                var abertura = (JSON.parse(localStorage.getItem('FavCompany')).open_hour).split(":");
                                var fechamento = (JSON.parse(localStorage.getItem('FavCompany')).close_hour).split(":");
                                var diasabertura = JSON.parse(localStorage.getItem('FavCompany')).work_days;
                                if (diasabertura == "seg,ter,qua,qui,sex") {
                                    diasabertura = "Seg a Sex";
                                } else if (diasabertura == "ter,qua,qui,sex,sab,dom") {
                                    diasabertura = "Ter a Dom";
                                } else if (diasabertura == "seg,ter,qua,qui,sex,sab,dom") {
                                    diasabertura = "Todos os Dias";
                                } else if (diasabertura == "ter,qua,qui,sex,sab") {
                                    diasabertura = "Ter a Sab";
                                } else if (diasabertura == "qua,qui,sex,sab,dom") {
                                    diasabertura = "Qua a Dom";
                                } else if (diasabertura == "qui,sex,sab,dom") {
                                    diasabertura = "Qui a Dom";
                                } else if (diasabertura == "sex,sab,dom") {
                                    diasabertura = "Sex a Dom";
                                } else if (diasabertura == "sab,dom") {
                                    diasabertura = "Sab e Dom";
                                } else if (diasabertura == "seg,ter,qua") {
                                    diasabertura = "Seg a Qua";
                                }
                                else if (diasabertura == "seg,ter,qua") {
                                    diasabertura = "Seg a Qua";
                                } else if (diasabertura == "seg,ter,qua") {
                                    diasabertura = "Seg a Qua";
                                }
                                if(diasabertura== null){
                                    diasabertura = 'Todos os Dias';
                                }
                                infoCompany = "<div onclick=Click(\'" + JSON.parse(localStorage.getItem('FavCompany')).id + "\')><span class='companyname'>" + JSON.parse(localStorage.getItem('FavCompany')).fancy_name + "</span></br><span>" + JSON.parse(localStorage.getItem('FavCompany')).phone + "</span></br><span>" + JSON.parse(localStorage.getItem('FavCompany')).address + ", " + JSON.parse(localStorage.getItem('FavCompany')).number + "</span><br><span>" + JSON.parse(localStorage.getItem('FavCompany')).city + " - " + JSON.parse(localStorage.getItem('FavCompany')).state + "</span><br><span>" + diasabertura + "</span><br><span>" + abertura[0] + ":" + abertura[1] + "h - " + fechamento[0] + ":" + fechamento[1] + "h" + "</span></div>";
                                $("#endSchedule").append(infoCompany);

                            } else {
                                generateModalAlert("Salão favorito atualmente inativo no jezzy!");
                                $('#mymodal').modal('show');
                                window.location.href = "business_follow.html";
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
    }else{


        if (JSON.parse(localStorage.getItem('FavCompany')).status != 'INACTIVE') {
            var logo = JSON.parse(localStorage.getItem('FavCompany')).logo;
            var infoCompany;

            var abertura = (JSON.parse(localStorage.getItem('FavCompany')).open_hour).split(":");
            var fechamento = (JSON.parse(localStorage.getItem('FavCompany')).close_hour).split(":");
            var diasabertura = JSON.parse(localStorage.getItem('FavCompany')).work_days;
            if (diasabertura == "seg,ter,qua,qui,sex") {
                diasabertura = "Seg a Sex";
            } else if (diasabertura == "ter,qua,qui,sex,sab,dom") {
                diasabertura = "Ter a Dom";
            } else if (diasabertura == "seg,ter,qua,qui,sex,sab,dom") {
                diasabertura = "Todos os Dias";
            } else if (diasabertura == "ter,qua,qui,sex,sab") {
                diasabertura = "Ter a Sab";
            } else if (diasabertura == "qua,qui,sex,sab,dom") {
                diasabertura = "Qua a Dom";
            } else if (diasabertura == "qui,sex,sab,dom") {
                diasabertura = "Qui a Dom";
            } else if (diasabertura == "sex,sab,dom") {
                diasabertura = "Sex a Dom";
            } else if (diasabertura == "sab,dom") {
                diasabertura = "Sab e Dom";
            } else if (diasabertura == "seg,ter,qua") {
                diasabertura = "Seg a Qua";
            }
            else if (diasabertura == "seg,ter,qua") {
                diasabertura = "Seg a Qua";
            } else if (diasabertura == "seg,ter,qua") {
                diasabertura = "Seg a Qua";
            }
            if(diasabertura== null){
                diasabertura = 'Todos os Dias';
            }
            infoCompany = "<div onclick=Click(\'" + JSON.parse(localStorage.getItem('FavCompany')).id + "\')><span class='companyname'>" + JSON.parse(localStorage.getItem('FavCompany')).fancy_name + "</span></br><span>" + JSON.parse(localStorage.getItem('FavCompany')).phone + "</span></br><span>" + JSON.parse(localStorage.getItem('FavCompany')).address + ", " + JSON.parse(localStorage.getItem('FavCompany')).number + "</span><br><span>" + JSON.parse(localStorage.getItem('FavCompany')).city + " - " + JSON.parse(localStorage.getItem('FavCompany')).state + "</span><br><span>" + diasabertura + "</span><br><span>" + abertura[0] + ":" + abertura[1] + "h - " + fechamento[0] + ":" + fechamento[1] + "h" + "</span></div>";
            $("#endSchedule").append(infoCompany);

        } else {
            generateModalAlert("Salão favorito atualmente inativo no jezzy!");
            $('#mymodal').modal('show');
            window.location.href = "business_follow.html";
        }
    }
}
function OpenModal(){
    var salao = 'salão';
    var servicos = 'serviço.';
    var voce = 'Você';
    var saloes = 'salões';
    $.dialog({
        title: 'Sem '+utf8_decode(saloes)+' favoritos.</br>'+utf8_decode(voce)+' precisa seguir um '+utf8_decode(salao)+'</br>para agendar um '+utf8_decode(servicos),
        content: '<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><button class="btn" onclick="mudatela(\'bussiness_list.html\');">Seguir um '+utf8_decode(salao)+' existente</button></br></br><button class="btn" onclick="mudatela(\'formcontactcompany.html\');" >Indicar meu '+utf8_decode(salao)+'</button>',
        animation: 'zoom',
        closeIcon:false,
        closeAnimation: 'scale',
        animationBounce: 1.5,
        backgroundDismiss:true,
        theme: 'supervan',
        keyboardEnabled: true

    });
}
function monetary(value){
    return 'R$ ' +  parseFloat(value).toFixed(2).replace('.',',');
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

    var query = "SELECT * FROM schedules WHERE user_id = " + $.cookieStorage.get('User').id + " and status= 1 and schedules.date >= DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%d')  ORDER BY schedules.id DESC";

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

        if(result == 'ImE6MDp7fSI=') {
            document.getElementById("date").innerHTML = "";
        } else {
            var objReturns = JSON.parse(JSON.stringify(result));
            var decodeObjReturns = Base64.decode(objReturns);
            var convertedReturns = unserialize(JSON.parse(decodeObjReturns));

            var datamaisprox = new moment();
            var dataano  = datamaisprox.get('year');
            var datames = datamaisprox.get('month');
            var datadia = datamaisprox.get('date');
            for(var i=0;i<convertedReturns.length;i++){
                var data = new Date(convertedReturns[i].schedules.date);
                var hours = convertedReturns[i].schedules.time_begin;
                data =  moment(data).add(1, 'days');
                data =  moment(data).add(1, 'month');

                var ano = data.get('year');
                    var mes = data.get('month');
                        var dia = data.get('date');



                if(ano>=dataano){
                   if(mes>=datames){
                       if(dia+1>=datadia) {
                            datamaisprox[i] = data;
                        }
                    }
                }else {
                    datamaisprox = " ";
                }

                if(datamaisprox[i] != undefined && datamaisprox[i] != " "){
                    if(datamaisprox[i]>datamaisprox[i-1]){

                    }else {
                        var meses = datamaisprox[i].get('month');
                        str_month = new String(meses);
                        if (str_month.length < 2)
                            str_month = 0 + str_month;
                        var minutos = (hours.split(":"))[1];
                        var hour = (hours.split(":"))[0];
                        var dias = datamaisprox[i].get('date');
                        dias = dias;
                        str_minutos = new String(minutos);
                        if (str_minutos.length < 2)
                            str_minutos = 0 + str_minutos;
                        document.getElementById("date").innerHTML = "<div onclick= \'window.location.href=\"schedules_display.html\"\'>"+dias + "/" + str_month + "<br>" + hour +':' + str_minutos ;
                    }
                } else{

                    document.getElementById("date").innerHTML = "";
                }
            }


        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
/*function TrocaFrase(){

    var textos = [  "Confira as novidades</br>do seu salão!",
                    "Compre pelo app e</br>receba na sua casa!",
                    "Produtos recomendados</br>para você!"];


    var aleatorio = Math.floor(Math.random() * textos.length);
    document.getElementsByClassName("offerServiceTexts")[0].innerHTML= (textos[aleatorio]);



}*/
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



//variáveis globais
var limitarcaracteres = 32;
var j = 1;
var Ofertas = new Array;
var OfertasPerfil = new Array;
var cont2 = 10;
var coont2 = 10;
var cont3Perfil = 6;
var coont3Perfil = 6;
var visualizacao = 2;
var page = 3;
var tam = 0;
var tam2 = 0;
var Filtros = new Array;
var locationss = $.cookieStorage.get('facebook_profiles').location;
var gender = $.cookieStorage.get('facebook_profiles').gender;
var ajax_offers_services = '';
var ajax_click_offer_statistics = '';
var ajax_select_offers_public = '';
var ajax_select_offers_perfil = '';
var ajax_offers_filters = '';
var ajax_offers_categories = '';
var ajax_offers_subcategories = '';
var ajax_offers_show_find = '';
var typeFilter = '';
var filterline = '';
var contttt = 0;
var Ofertas = '';
var ckoDiv = '';
var contador = 0;
var filtrinhos = new Array;
var religion = $.cookieStorage.get('facebook_profiles').religion;
var locationss = $.cookieStorage.get('facebook_profiles').location;
var gender = $.cookieStorage.get('facebook_profiles').gender;
var relationship_status = $.cookieStorage.get('facebook_profiles').relationship_status;
var political = $.cookieStorage.get('facebook_profiles').political;
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
$(document).ready(function() {
	document.getElementById("userName").innerText = $.cookieStorage.get('User').name;//adiciona nome do usuario no menu lateral
	// adiciona a visualização em grade
    var pageselecionado = $("#perfil");
    pageselecionado.checked = true;
    pageselecionado.addClass('active');
    pageselecionado.addClass('hover');
    pageselecionado.click();

	if(localStorage.getItem("Ofertas")!=null){
        Ofertas = JSON.parse(localStorage.getItem("Ofertas"));
      // //console.log(Ofertas);// pegando ofertas carregadas na tela home.php
        cont2 = Ofertas.length;
    }
	
	if(localStorage.getItem("OfertasPerfil")!=null){
        OfertasPerfil = JSON.parse(localStorage.getItem("OfertasPerfil")); // pegando ofertas de perfil carregadas na tela home.php
        cont3Perfil = OfertasPerfil.length;
    }

    //verifica a visualização inicial
   
	 
    $(".container").fadeOut(300, function () {
        //verifyFiltersOrOffers();
		 $("#filtro").click(); //torna a tela filtros a tela inicial
    });
    //funções de clique
	$('#notify').click(function (){
        window.location.href = 'notifications.html';
    });
	 $("#userName").click(function (){
        window.location.href = 'my_profile.html';
    });
	$("#detail").click(function(){
		visualizacao = 2;
		verifyFiltersOrOffers();
	});
	$("#filtro").click(function(){
        typeFilter = 'filter';
		page = 2;
		$(".container").fadeOut(300, function () {
            var scrolling =  $(".container").animate({
                scrollTop: 0,
                duration: 2
            }, 1, function(){
                verifyFiltersOrOffers();
                scrolling.stop();
                scrolling.finish();
            });
        });
	});
	 $("#normal").click(function(){
		visualizacao = 1;
		verifyFiltersOrOffers();
	 });
    $("#perfil").click(function(){
        page = 3;
        visualizacao = 2;
		$("#detail")[0].checked = true;
        $(".container").fadeOut(300, function () {
            var scrolling =  $(".container").animate({
                scrollTop: 0,
                duration: 2
            }, 1, function(){
                verifyFiltersOrOffers();
                scrolling.stop();
                scrolling.finish();
            });
        });
    });
    $("#normals").click(function(){
        page = 1;
        visualizacao = 1;
		$("#normal")[0].checked = true;
		$(".container").fadeOut(300, function () {
            var scrolling =  $(".container").animate({
                scrollTop: 0,
                duration: 2
            }, 1, function(){
                verifyFiltersOrOffers();
                scrolling.stop();
                scrolling.finish();
            });
        });
    });
	//funções de remover cookieStorage desnecessário vindo de outras paginas
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
	
	
	// função scroll da tela
	 $(window).on("scroll", function() {
	
        var scrollHeight = $(document).height();

        var scrollPosition = $(window).height() + $(window).scrollTop();

		// verifica se a barra de scroll está na posição desejada
        if($(window).scrollTop()+$(window).height() > $(document).height() -100){
            //
            if(contttt == 0){

					if(page!=2||page==2&&typeFilter!='filter'&&typeFilter!='branddisplay'&&typeFilter!='brands'&&typeFilter!='product'&&typeFilter!='service'&&typeFilter!='problems'&&typeFilter!='otherprofile'&&typeFilter!='brandoffers'&&typeFilter!='ampoule'&&typeFilter!='spray'&&typeFilter!='shampoo'&&typeFilter!='conditionare'&&typeFilter!='oil'&&typeFilter!='kit'&&typeFilter!='cream'&&typeFilter!='mask'&&typeFilter!='finisher'&&typeFilter!='modeler'&&typeFilter!='leavein'&&typeFilter!='pomade'&&typeFilter!='gel'&&typeFilter!='mousse'&&typeFilter!='problemssss'&&typeFilter!='problems'){
                        //sendRequest(); // preenche ofertas contidas no vetor e não preenchidas
                        verifyFiltersOrOffers();
                        PesquisarOfertas(); // pesquisa por mais ofertas
                        contttt  = 1; // adiciona um numero ao contador
                     //   seeLoading(); // exibe loading
                    }
            }

        }
    });
	
});
//função verificar filtros ou ofertas
function verifyFiltersOrOffers(){
   //console.log(page);
	switch(page){
		case 1:verifyExibition();
		    break;
		case 2:filtersExibition();
            break;
        case 3:verifyExibition();
            break;
	}
}
// função Exibir Filtros
function filtersExibition(){
    var view = $(".drinkcard-dd");
    for(var f = 0;f<view.length;f++){
        view[f].style.display = 'none';
    } //ESCONDE ESCOLHA DE VISUALIZAÇÃO GRADE OU LISTA
    $("#offersdisplaytitle").removeClass('col-xs-12');
    $("#offersdisplaytitle").addClass('col-xs-10');
    $("#offersdisplaytitle").innerText = 'ENCONTRE';
    $("#offersdisplaytitle").innerHTML = 'ENCONTRE';
    $("#offersdisplaytitle").html('ENCONTRE');

        if(navigator.appVersion.indexOf("iPhone")!=-1) {
            $("#offerDisplay").html('');
            $("#offerDisplay").append('<div id="find" class=""><div class="" onclick="nextStep(\'brand\');"><img class="filterArea" src="img/divs/Marcas-1.jpg"></div><div class="" onclick="nextStep(\'product\');"><img class="filterArea" src="img/divs/Produtos.jpg"></div><div class="" onclick="nextStep(\'service\');"><img class="filterArea" src="img/divs/Servicos.jpg"></div><div class="" onclick="nextStep(\'problems\');"><img class="filterArea " src="img/divs/Tratamentos.jpg"></div><div class="hide" onclick="nextStep(\'otherprofile\');"><img class="filterArea" src="img/divs/Outros-Perfis.jpg"></div></div>');
        }else{
            $("#offerDisplay").html('');
            $("#offerDisplay").append('<div id="find" class="finds"><div class="" onclick="nextStep(\'brand\');"><img class="filterArea" src="img/divs/Marcas-1.jpg"></div><div class="" onclick="nextStep(\'product\');"><img class="filterArea" src="img/divs/Produtos.jpg"></div><div class="" onclick="nextStep(\'service\');"><img class="filterArea" src="img/divs/Servicos.jpg"></div><div class="" onclick="nextStep(\'problems\');"><img class="filterArea" src="img/divs/Tratamentos.jpg"></div><div class="hide" onclick="nextStep(\'otherprofile\');"><img class="filterArea"  src="img/divs/Outros-Perfis.jpg"></div></div>');
        }

    $(".container").fadeIn(50);
        var scrolling =  $(".container").animate({
            scrollTop: 0,
            duration: 10
        }, 1, function(){

            scrolling.stop();
            scrolling.finish();
        });



}
// função verificar exibição
function verifyExibition(){
    $("#offerDisplay").html('');
        var view = document.getElementsByClassName("drinkcard-dd");
        for (var f = 0; f < view.length; f++) {
            view[f].style.display = '';
        }//MOSTRA ESCOLHA DE VISUALIZAÇÃO GRADE OU LISTA

   //console.log(page);
        switch (page) {
            case 1:
                $(".container").fadeIn(50);
                $("#offersdisplaytitle").innerText = 'OFERTAS';
                $("#offersdisplaytitle").innerHTML = 'OFERTAS';
                $("#offersdisplaytitle").html('OFERTAS');
                $("#offersdisplaytitle").removeClass('col-xs-12');
                $("#offersdisplaytitle").removeClass('col-xs-8');
                $("#offersdisplaytitle").addClass('col-xs-6');

                break;
            case 2:
                $(".container").fadeIn(50);
                $("#offersdisplaytitle").removeClass('col-xs-12');
                $("#offersdisplaytitle").addClass('col-xs-10');
                $("#offersdisplaytitle").innerText = 'ENCONTRE';
                $("#offersdisplaytitle").innerHTML = 'ENCONTRE';
                $("#offersdisplaytitle").html('ENCONTRE');

                break;
            case 3:
                $(".container").fadeIn(50);
                $("#offersdisplaytitle").innerText = 'PARA VOCÊ';
                $("#offersdisplaytitle").innerHTML = 'PARA VOCÊ';
                $("#offersdisplaytitle").html('PARA VOCÊ');

                break;
        }

   //console.log(visualizacao);
	 switch(visualizacao){
		 case 1:exibiçãoGrade(page);
		 break;
		 case 2:exibiçãoLista(page);
		 break;
	 }
	
}
//função exibição em lista
function exibiçãoLista(page){
   //console.log(page);
	switch(page){
        case 1:offersPublic();
            break;
        case 3:offersPerfil();
            break;

    }
	//função para ofertas do perfil
	function offersPerfil(){
        if(OfertasPerfil!='') {
            for (var i = 0; i < OfertasPerfil.length; i++) {
                if(OfertasPerfil[i].Offer.id != null){

                var exibirRetorno = OfertasPerfil[i];
                var cookie = JSON.stringify(exibirRetorno.Offer.id);
                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

                var arredondado = valorComDesconto.toFixed(2);

                var linha = arredondado.replace(".", ",");


                meuLog(linha);

                var id = exibirRetorno.Offer.id;
                var discount = Math.round(exibirRetorno.Offer.percentage_discount);
                var title = exibirRetorno.Offer.title;
                var urlbackground = '';
                var photo = '';
				
                if (exibirRetorno.Offer.photo != ""  && exibirRetorno.Offer.photo != 'UPLOAD_ERROR' ) {
                    var photinha = exibirRetorno.Offer.photo;
                    var phota = photinha.split('offers/');
                    photo = phota[0]+'offers/mini-'+phota[1];

                    if(photo.indexOf('png') != -1){
                        urlbackground = '';
                    }
                }else {
                    photo = icons + "ImagemIndisponivel2.png";
                    urlbackground = '';
                }
                var value = exibirRetorno.Offer.value;

                var avista = (' ');

                if (exibirRetorno.Offer.parcels != 'INACTIVE') {

                    var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                    var linhaparcels = monetary(arredondado / quantidadeparcels);

                        if(exibirRetorno.Offer.company_id == 99999){
                            if (discount == 0) {
                                $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\");height:100%; background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");

                            } else {
                                $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");

                            }
                        }else{
                            if (discount == 0) {
                                $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");

                            } else {
                                $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");

                            }
                        }

                } else {
                    if(exibirRetorno.Offer.company_id == 99999){
                        if (discount == 0) {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");

                        } else {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");

                        }
                    }else{
                        if (discount == 0) {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'>   <img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");

                        } else {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'>   <img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");

                        }
                    }

                }
            }


            }
        }else{
            $("#offerDisplay").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Sem ofertas para o seu perfil</div>');
        }

	}

	//função para ofertas publicas
	function offersPublic(){

        for (var i = 0; i < Ofertas.length; i++) {
            var exibirRetorno = Ofertas[i];

            var cookie = JSON.stringify(exibirRetorno.Offer.id);
            var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

            var arredondado = valorComDesconto.toFixed(2);

            var linha = arredondado.replace(".", ",");


            meuLog(linha);

            var id = exibirRetorno.Offer.id;
            var discount = Math.round(exibirRetorno.Offer.percentage_discount);
            var title = exibirRetorno.Offer.title;
            var urlbackground = '';
            var photo='';

            if(exibirRetorno.Offer.photo != "" && exibirRetorno.Offer.photo != 'UPLOAD_ERROR'  ){
                var photinha = exibirRetorno.Offer.photo;
                var phota = photinha.split('offers/');
                photo = phota[0]+'offers/mini-'+phota[1];

                if(photo.indexOf('png') != -1){
                    urlbackground = '';
                }
            }
            else{
                photo =icons+"ImagemIndisponivel2.png";
                urlbackground = '';
            }
            var value = exibirRetorno.Offer.value;

            var avista =  (' ');
            if(exibirRetorno.Offer.parcels != 'INACTIVE'){
                var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                var linhaparcels = monetary(arredondado / quantidadeparcels);
                if(exibirRetorno.Offer.company_id == 99999){
                    if (discount == 0) {
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }else{
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }
                }else{
                    if (discount == 0) {
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'> <img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }else{
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'> <img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }

                }

            }else{
                if(exibirRetorno.Offer.company_id == 99999){
                    if (discount == 0) {
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }else{
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }
                }else{
                    if (discount == 0) {
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }else{
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }
                }

            }
        }

	}
}
//função exibição em grade
function exibiçãoGrade(page){
    switch(page){
        case 1:offersPublic();
            break;
        case 3:offersPerfil();
            break;

    }
	//função para ofertas do perfil
	function offersPerfil() {
        if (OfertasPerfil != '') {
            for (var i = 0; i < OfertasPerfil.length; i++) {
                if(OfertasPerfil[i].Offer.id !=null){
                    var exibirRetorno = OfertasPerfil[i];


                var cookie = JSON.stringify(exibirRetorno.Offer.id);
                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

                var arredondado = valorComDesconto.toFixed(2);

                var linha = arredondado.replace(".", ",");


                meuLog(linha);

                var id = exibirRetorno.Offer.id;
                var discount = Math.round(exibirRetorno.Offer.percentage_discount);
                var title = exibirRetorno.Offer.title;
                var urlbackground = '';
                var photo = '';
				
                if (exibirRetorno.Offer.photo != "" && exibirRetorno.Offer.photo != 'UPLOAD_ERROR' && exibirRetorno.Offer.photo != null  ) {
                    var photinha = exibirRetorno.Offer.photo;
                    var phota = photinha.split('offers/');
                    photo = phota[0]+'offers/mini-'+phota[1];

                    if(photo.indexOf('png') != -1){
                        urlbackground = '';
                    }
                }else {
                    photo = icons + "ImagemIndisponivel2.png";
                    urlbackground = '';
                }

                var value = exibirRetorno.Offer.value;

                var avista = (' ');

                if (exibirRetorno.Offer.parcels != 'INACTIVE') {
                    var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                    var linhaparcels = monetary(arredondado / quantidadeparcels);
                    if(exibirRetorno.Offer.company_id == 99999){
                        if (discount == 0) {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        } else {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        }
                    }else{
                        if (discount == 0) {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        } else {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        }
                    }

                }else{
                    if(exibirRetorno.Offer.company_id == 99999){
                        if (discount == 0) {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        } else {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        }
                    }else{
                        if (discount == 0) {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        } else {
                            $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        }
                    }

                }
                }





            }
        }else{
            $("#offerDisplay").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Sem ofertas para o seu perfil</div>');
        }
    }
	//função para ofertas publicas
	function offersPublic(){


        for (var i = 0; i < Ofertas.length; i++) {
            var exibirRetorno = Ofertas[i];

            var cookie = JSON.stringify(exibirRetorno.Offer.id);
            var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

            var arredondado = valorComDesconto.toFixed(2);

            var linha = arredondado.replace(".", ",");


            meuLog(linha);

            var id = exibirRetorno.Offer.id;
            var discount = Math.round(exibirRetorno.Offer.percentage_discount);
            var title = exibirRetorno.Offer.title;
            var urlbackground = '';
            var photo='';
	
            if (exibirRetorno.Offer.photo != "" && exibirRetorno.Offer.photo != 'UPLOAD_ERROR' ) {
                var photinha = exibirRetorno.Offer.photo;
                var phota = photinha.split('offers/');
                photo = phota[0]+'offers/mini-'+phota[1];

                if(photo.indexOf('png') != -1){
                    urlbackground = '';
                }
            }else {
                photo = icons + "ImagemIndisponivel2.png";
                urlbackground = '';
            }
            var value = exibirRetorno.Offer.value;
           //console.log(exibirRetorno.Offer.company_id);
            var avista =  (' ');
            if(exibirRetorno.Offer.parcels != 'INACTIVE'){
                var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                var linhaparcels = monetary(arredondado / quantidadeparcels);
                if(exibirRetorno.Offer.company_id == 99999){

                    if (discount == 0) {
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay'  style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }else{
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div>  </div>");
                    }
                }else{
                    if (discount == 0) {
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div ><img class='offerImageDisplay'  style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }else{
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div>  </div>");
                    }

                }

            }else{
                if(exibirRetorno.Offer.company_id  == 99999){
                    if (discount == 0) {
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }else{
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay'  style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/> </div> </div>");
                    }
                }else{
                    if (discount == 0) {
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    }else{
                        $("#offerDisplay").append("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div ><img class='offerImageDisplay'  style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/> </div> </div>");
                    }
                }

            }
        }
	}
}
// função clique na oferta(id da oferta)
function clickOffer(offer){

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


    ajax_click_offer_statistics = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function(result) {
        if(result != "ImE6MDp7fSI=") {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
            for(var i=0; i<convertedReturn.length;i++){


                var cliques = (convertedReturn[i].offers_statistics.details_click)/1 + 1;

                var query2 = 'UPDATE offers_statistics SET details_click = '+cliques+' WHERE offer_id = ' + offer;

                var conditions2 = {
                    'General':{
                        'query':query2
                    }
                };

                var postData2 = JSON.stringify(conditions2);

                postData2 = {
                    'params': postData2
                };
                var url2 = 'https://'+api+'/General/get/query/' + createToken();


                $.ajax({
                    method: "POST",
                    url: url2,
                    data: postData2
                }).done(function(result) {
                    if(result == "ImE6MDp7fSI=") {
                        var query2 = 'SELECT title, id, company_id, value, parcels_quantity FROM offers Offer WHERE id = ' + offer;

                        var conditions2 = {
                            'User':{
                                'query':query2
                            }
                        };

                        var postData2 = JSON.stringify(conditions2);

                        postData2 = {
                            'params': postData2
                        };
                        var url2 = 'https://'+api+'/users/get/query/' + createToken();


                        $.ajax({
                            method: "POST",
                            url: url2,
                            data: postData2
                        }).done(function(result) {
                            if(result != "") {
                                var objReturn = JSON.parse(JSON.stringify(result));
                                var decodeObjReturn = Base64.decode(objReturn);
                                var convertedReturn = (JSON.parse(decodeObjReturn));
                                for(var i=0; i<convertedReturn.length;i++) {
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

                        }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(errorThrown);
                        });

                    }

                }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                });
            }
        }else{
            var query2 = 'INSERT INTO offers_statistics (details_click, offer_id) VALUES (1, '+offer+')';

            var conditions2 = {
                'General':{
                    'query':query2
                }
            };

            var postData2 = JSON.stringify(conditions2);

            postData2 = {
                'params': postData2
            };
            var url2 = 'https://'+api+'/General/get/query/' + createToken();


            $.ajax({
                method: "POST",
                url: url2,
                data: postData2
            }).done(function(result) {
                if(result == "ImE6MDp7fSI=") {
                    var query2 = 'SELECT title, id, company_id, value FROM offers Offer WHERE id = ' + offer;

                    var conditions2 = {
                        'General':{
                            'query':query2
                        }
                    };

                    var postData2 = JSON.stringify(conditions2);

                    postData2 = {
                        'params': postData2
                    };
                    var url2 = 'https://'+api+'/General/get/query/' + createToken();


                    $.ajax({
                        method: "POST",
                        url: url2,
                        data: postData2
                    }).done(function(result) {
                        if(result != "ImE6MDp7fSI=") {
                            var objReturn = JSON.parse(JSON.stringify(result));
                            var decodeObjReturn = Base64.decode(objReturn);
                            var convertedReturn = unserialize(JSON.parse(decodeObjReturn));
                            for(var i=0; i<convertedReturn.length;i++) {
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

                    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(errorThrown);
                    });
					
                }
            }).error(function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
        }

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

}
// função base64
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
// função pesquisar novas ofertas
function PesquisarOfertas(){

    //enviar parametros para portal api e utilizar retorno no lugar de convertedReturne
    //cont2+1 //variavel para a 'partir de'
    //coont2  //variavel para 'quantas'

    $.ajax({
        type: "POST",
        data:{
            aPartirDe: (cont2/1),
            quantidade:coont2,
            user_id: $.cookieStorage.get('User').id
        },
        url: "https://"+ip+"/jezzy-portal/Utils/offerByLimit",
        success: function(result){
			
            if(result != '' && result != null && result != 'null'){
			///if(result == ''){
                var objReturn = JSON.parse(JSON.stringify(result));
                var convertedReturne = (JSON.parse(objReturn));
               //console.log(convertedReturne);
                var tamanho = Ofertas.length + convertedReturne.length;
                var tamanhoVetorOffers = Ofertas.length;
                tam2 = Ofertas.length;
               //console.log(Ofertas);
                for (var i = Ofertas.length; i < tamanho; i++) {

                    Ofertas[i] = convertedReturne[i - tamanhoVetorOffers];

                }

                //sendRequest();
                cont2  = cont2 + 10;
                contttt  = 0;
                //location.reload();
            }


        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert("Houve algume erro no processamento dos dados dessa compra, atualize a pÃ¡gina e tente novamente!");
            alert(errorThrown);
        }
    });





    /*
        var query = '';
        var queryPerfil = '';
            query = 'SELECT DISTINCT Offer.id, Offer.title, Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels, Offer.parcels_quantity FROM offers_users RIGHT OUTER JOIN offers Offer ON Offer.id = offers_users.offer_id WHERE offers_users.user_id = ' + $.cookieStorage.get('User').id + ' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.company_id != 99999 and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE" and Offer.public ="ACTIVE" or  Offer.company_id = 99999 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.status = "ACTIVE" and Offer.public ="ACTIVE" ORDER BY Offer.id DESC LIMIT '+(cont2+1)+','+(coont2)+';';

            var conditions = {
                'User': {
                    'query': query
                }
            };

            var postData = JSON.stringify(conditions);

            postData = {
                'params': postData
            };
            var url = 'https://' + api + '/users/get/query/' + createToken();



        ajax_select_offers_public = $.ajax({
                method: "POST",
                url: url,
                data: postData
            }).done(function (result) {
                if (result != '') {
                    var objReturn = JSON.parse(JSON.stringify(result));
                    var decodeObjReturn = Base64.decode(objReturn);
                    var convertedReturne = (JSON.parse(decodeObjReturn));

                    var tamanho = Ofertas.length + convertedReturne.length;
                    var tamanhoVetorOffers = Ofertas.length;
                    tam2 = Ofertas.length;

                    for (var i = Ofertas.length; i < tamanho; i++) {

                        Ofertas[i] = convertedReturne[i - tamanhoVetorOffers];

                    }

                        cont2  = cont2 + 8;



                }

            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });
    */

    queryPerfil = 'SELECT DISTINCT Offer.id, Offer.title, Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels_quantity,  Offer.company_id FROM offers_users INNER JOIN offers Offer ON Offer.id = offers_users.offer_id RIGHT OUTER JOIN offers_filters ON offers_filters.offer_id = Offer.id WHERE  offers_users.user_id = ' + $.cookieStorage.get('User').id +'  and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE" and Offer.public ="INACTIVE" and offers_filters.gender = "'+ gender+'" and offers_filters.religion = '+ religion+' and offers_filters.political = '+ political+' and offers_filters.location = '+locationss+' and offers_filters.relationship_status = '+ relationship_status+' and Offer.company_id !=99999 or offers_users.user_id = ' + $.cookieStorage.get('User').id +' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE" and Offer.public ="INACTIVE" and offers_filters.gender = "'+ gender+'" and offers_filters.religion = '+ religion+' and offers_filters.political = '+ political+' and offers_filters.location = '+locationss+' and offers_filters.relationship_status = '+ relationship_status+' and Offer.company_id = 99999  ORDER BY Offer.id DESC LIMIT ' +(cont3Perfil+1)+ ',' +coont3Perfil+';';


	console.log(queryPerfil);

    var conditionsPerfil = {
        'User': {
            'query': queryPerfil
        }
    };

    var postDataPerfil = JSON.stringify(conditionsPerfil);

    postDataPerfil = {
        'params': postDataPerfil
    };
    var urlPerfil = 'https://' + api + '/users/get/query/' + createToken();

    ajax_select_offers_perfil = $.ajax({
        method: "POST",
        url: urlPerfil,
        data: postDataPerfil
    }).done(function (result) {
        if (result != '') {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            var tamanho = OfertasPerfil.length + convertedReturne.length;
            var tamanhoVetorOffers = OfertasPerfil.length;
            tam3 = OfertasPerfil.length;

            for (var i = OfertasPerfil.length; i < tamanho; i++) {

                OfertasPerfil[i] = convertedReturne[i - tamanhoVetorOffers];
            }

            cont3Perfil  = cont3Perfil + 6;

        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

	

}
// função filter
function Filter(select, filter){
    var cookie = '';
    if($.cookieStorage.isSet('OfferFilters')){
        cookie = $.cookieStorage.get('OfferFilters');
    }
    var filtro = select.value;
    var filtromestre = filter;

    filtrinhos[contador] = {'Filtro': filtro, 'FiltroMestre': filtromestre};

    contador++;

    Filtros = JSON.stringify(filtrinhos);

    $.cookieStorage.set('OfferFilters', filtrinhos);

    if($("#"+filtromestre).length){
       $("#"+filtromestre).html('<button type="button" class="close" data-dismiss="alert" id="fechar" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+filtro);
        $("#filtros").val('1');
        $("#Filtro2").val('1');
        $("#botao").remove();
        $("#offerDisplay").append('<button id="botao" class="btn btn-info btn-block">Pesquisar</button>');
    }else{
        $("#offerDisplay").append('<div id="offerfilter"><div id="'+filtromestre+'" class="alert alert-info alert-dismissible fade in" role="alert"><button type="button" id="fechar" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+filtro+'</div></div>');
        $("#filtros").val('1');
        $("#Filtro2").val('1');
        $("#botao").remove();
        $("#offerDisplay").append('<button id="botao" class="btn btn-info btn-block">Pesquisar</button>');
    }

    /*
    var query = '';
    query = 'SELECT DISTINCT '+filtro+' filter FROM offers_filters WHERE '+filtro+' != "";';
    var conditions = {
        'User': {
            'query': query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();

    $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));




        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
*/
}
// função filtrar
function Filtrar(select){
    var filtro = select.value;
   //
    $("#Filtro2").remove();

    var query = '';
    query = 'SELECT DISTINCT '+filtro+' filter FROM offers_filters WHERE '+filtro+' != "" ;';
    var conditions = {
        'User': {
            'query': query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();

    ajax_offers_filters = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            if($("#offerfilter").length){
                $("#offerfilter").before('<select onchange="Filter(this,\''+filtro+'\');" class="form-control" id="Filtro2"><option value="1" selected disabled>Selecione uma opção</option></select>');
            }else{
                $("#offerDisplay").append('<select onchange="Filter(this,\''+filtro+'\');" class="form-control" id="Filtro2"><option value="1" selected disabled>Selecione uma opção</option></select>');
            }
            for(var i=0;i<convertedReturne.length;i++){
                $("#Filtro2").append('<option value='+convertedReturne[i].offers_filters.filter+'>'+convertedReturne[i].offers_filters.filter+'</option>');

            }

        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });




}
// função mostrar loading
/*
function seeLoading(){

    var query = '';
    query = 'SELECT count(DISTINCT Offer.id, Offer.title, Offer.photo, Offer.percentage_discount, Offer.value, Offer.parcels, Offer.parcels_quantity) num FROM offers_users RIGHT OUTER JOIN offers Offer ON Offer.id = offers_users.offer_id WHERE offers_users.user_id = ' + $.cookieStorage.get('User').id + ' and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.company_id != 99999 and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.status = "ACTIVE" and Offer.public ="ACTIVE" or  Offer.company_id = 99999 and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d")  and Offer.status = "ACTIVE" and Offer.public ="ACTIVE";';

    var conditions = {
        'User': {
            'query': query
        }
    };

    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();



    ajax_select_offers_public = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturne = (JSON.parse(decodeObjReturn));


        if((Ofertas.length/1) == convertedReturne[0][0].num/1){
            $("#divloading").addClass('hide');
        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
};*/

//função preenche problemas
function preencheproblemas(){

    typeFilter = 'problems';
    var query = '';
    query = 'SELECT application FROM offers_characteristics;';
    var conditions = {
        'User': {
            'query': query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();

    ajax_offers_categories = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            $("#find").html('');
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            var categories = (convertedReturne[0].offers_characteristics.application);
            var cat = categories.split(';');
            var plural = '';
            var type = '';
            var imageDiv = '';
            var HTMLProductsFilter = '';
            var img = 'https://'+ip+'/jezzy-mobile/public_html/img/';
            for(var i=0; i<cat.length;i++){
                type = cat[i];

                switch(type){
                    case 'anti-dandruf':
                        plural = "ANTI-CASPA";
                        imageDiv = img+'divs/Anticaspa.jpg';
                        break;
                    case 'anti-hairloss':
                        plural = 'ANTI-QUEDA';
                        imageDiv = img+'divs/Antiqueda.jpg';
                        break;
                    case 'curls activation':
                        plural = 'ATIVADOR DE CACHOS';
                        imageDiv = img+'divs/Antivador-de-Cachos.jpg';
                        break;
                    case 'anti-frizz/defrizzer':
                        plural = 'DEFRIZANTE';
                        imageDiv = img+'divs/Defrizzante.jpg';
                        break;
                    case 'progressive-brush':
                        plural = 'ESCOVA PROGRESSIVA';
                        imageDiv = img+'divs/Escova%20Progressiva.jpg';
                        break;
                    case 'hydration/nutrition':
                        plural = 'HIDRATAÇÃO';
                        imageDiv = img+'divs/Hidratacao-nutricao.jpg';
                        break;
                    case 'cleaning':
                        plural = "LIMPEZA";
                        imageDiv = img+'divs/Limpeza.jpg';
                        break;
                    case 'thermal-protection':
                        plural = "PROTEÇÃO TÉRMICA";
                        imageDiv = img+'divs/Protecaotermica.jpg';
                        break;
                    case 'solar-protection':
                        plural = "PROTEÇÃO SOLAR";
                        imageDiv = img+'divs/Protecaosolar.jpg';
                        break;
                    case 'capillary-reconstruction':
                        plural = "RECONSTRUÇÃO CAPILAR";
                        imageDiv = img+'divs/Reconstrucao.jpg';
                        break;
                    case 'hair ends repair':
                        plural = "REPARAÇÃO DE PONTAS";
                        imageDiv = img+'divs/Reparacaodepontas.jpg';
                        break;
                    case 'unsalted-treatment':
                        plural = "TRATAMENTO SEM SAL";
                        imageDiv = img+'divs/Tratamentosemsal.jpg';
                        break;
                }


                if(type != ''){
                   HTMLProductsFilter += '<div  filterAreaList2" id="'+type+'" onclick="preencheproblemasofertas(\''+type+'\')"><div class="col-xs-6"><div id="oferta2" class="oferta2"><img style="max-width:100%!important;" src = \"'+imageDiv+'\"></div><div class="offerinfo"><div class="offerinfoback"></div><span class="offerprice" id="offerprices2">'+plural+'</span></div></div></div>';
                    //HTMLProductsFilter += '<div class="col-xs-12 filterAreaList2" id="'+type+'" onclick="preencheproblemasofertas(\''+type+'\')"style="padding:20px!important;">'+plural+'</div>';
                }


            }

            $("#find").html('<div class="col-xs-12">'+HTMLProductsFilter+'</div>').hide().fadeIn(200);


        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}


// função preenche produtos
function preencheproducts(){
    var query = '';
    query = 'SELECT product_categories FROM offers_characteristics;';
    var conditions = {
        'User': {
            'query': query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();

    ajax_offers_categories = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            $("#find").html('');
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            var categories = (convertedReturne[0].offers_characteristics.product_categories);
            var cat = categories.split(';');
            var plural = '';
            var type = '';
            var imageDiv = '';
            var HTMLProductsFilter = '';
            var img = 'https://'+ip+'/jezzy-mobile/public_html/img/';
            for(var i=0; i<cat.length;i++){
                type = cat[i];

                switch(type){
                    case 'shampoo':
                        plural = "shampoo's";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---shampoos.jpg';
                        break;
                    case 'conditionare':
                        plural = 'condicionadores';
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---condicionadores.jpg';
                        break;
                    case 'mask':
                        plural = 'máscaras';
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---mascaras.jpg';
                        break;
                    case 'finisher':
                        plural = 'finalizadores';
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---finalizadores.jpg';
                        break;
                    case 'modeler':
                        plural = 'modeladores';
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---modeladores.jpg';
                        break;
                    case 'oil':
                        plural = 'óleos';
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---oleos.jpg';
                        break;
                    case 'kit':
                        plural = "kit's";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---kits.jpg';
                        break;
                    case 'ampoule':
                        plural = "ampolas";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---ampolas.jpg';
                        break;
                    case 'cream':
                        plural = "cremes";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---cremes.jpg';
                        break;
                    case 'leavein':
                        plural = "leave-in";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---leavein.jpg';
                        break;
                    case 'pomade':
                        plural = "pomadas";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---pomadas.jpg';
                        break;
                    case 'spray':
                        plural = "spray's";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---spray.jpg';
                        break;
                    case 'gel':
                        plural = "gel";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---gels.jpg';
                        break;
                    case 'mousse':
                        plural = "mousses";
                        imageDiv = img+'divs/jezzy----Offers---categoria-de-produtos---mousses.jpg';
                        break;
                }

                if(type != ''){
                    HTMLProductsFilter += '<div class="col-xs-12 filterAreaList2" id="'+type+'" onclick="nextStep(\''+type+'\')"><img style="max-width:100%!important;" src = \"'+imageDiv+'\"></div>';
                }


            }

                $("#find").html(HTMLProductsFilter).hide().fadeIn(200);


        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
// função preenche marcas
function preenchebrand(){
    $(".togglebar").css('border-bottom','0');
    var query = '';
    query = 'SELECT * FROM providers WHERE status = "ACTIVE";';
    var conditions = {
        'User': {
            'query': query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();

    ajax_offers_categories = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            $("#find").html('');
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            var brandies = '';

            for(var i=0;i<convertedReturne.length;i++){
                var Brand = convertedReturne[i].providers.id;
                var BrandFancyName = convertedReturne[i].providers.fancy_name;
                if(Brand != null && Brand != 'undefined' && Brand != ' '&& Brand != ''){
                    Brand = Brand.replace("'", "\'");
                    var imgbrandfancyname = '';

                    switch(BrandFancyName){
                        case 'L\'Oreal Professionnel':imgbrandfancyname = 'loreal.png';
                            break;
                        case 'LOreal Professionnel':imgbrandfancyname = 'loreal.png';
                            break;
                        case 'Schwarzkopf Professional': imgbrandfancyname = 'schwarzkopf.png';
                            break;
                        case 'Senscience': imgbrandfancyname = 'senscience.png';
                            break;
                        case 'Kerastase': imgbrandfancyname = 'kerastase.png';
                            break;
                        case 'Redken': imgbrandfancyname = 'redken.png';
                            break;
                    }

                    brandies += '<div onclick="SearchLine(\''+Brand+'\')" style="border-bottom: 1px solid lightgrey;border-top: 1px solid lightgrey;"><img style="width:50%;margin-left:25%;" src="img/brands/'+(imgbrandfancyname)+'"></div>';
                        typeFilter = 'branddisplay';

                }

            }

            var plural = '';
            var type = '';
            var imageDiv = '';
            var HTMLProductsFilter = '';
            var img = 'https://'+ip+'/jezzy-mobile/public_html/img/';


            $("#find").html(brandies).hide().fadeIn(200);


        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
// função procura linha de produtos(marca)
function SearchLine(brand){

    filterline = brand;
    var query = '';

    query = 'SELECT fancy_name FROM providers WHERE id = "'+brand+'";';

    var conditions = {
        'User': {
            'query': query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();

    ajax_offers_categories = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            $("#find").html('');
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            var lines = '';

            for(var i=0;i<convertedReturne.length;i++){

                var BrandFancyName = convertedReturne[i].providers.fancy_name;


                query = 'SELECT DISTINCT line FROM offers WHERE brand = "'+BrandFancyName+'" and offers.status = "ACTIVE" and offers.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and offers.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") ORDER BY line ASC;;';

                var conditions = {
                    'User': {
                        'query': query
                    }
                };
                var postData = JSON.stringify(conditions);

                postData = {
                    'params': postData
                };
                var url = 'https://' + api + '/users/get/query/' + createToken();

                ajax_offers_categories = $.ajax({
                    method: "POST",
                    url: url,
                    data: postData
                }).done(function (result) {
                    $("#offersdisplaytitle").removeClass('col-xs-6');
                    $("#offersdisplaytitle").addClass('col-xs-8');
                    $("#offersdisplaytitle").css('margin-left','10%');
                    $(".togglebar").css('border-bottom','1px solid lightgrey');
                    $("#offersdisplaytitle").html('LINHAS DE PRODUTOS');
                    if (result != '') {
                        $("#find").html('');
                        var objReturn = JSON.parse(JSON.stringify(result));
                        var decodeObjReturn = Base64.decode(objReturn);
                        var convertedReturne = (JSON.parse(decodeObjReturn));
                        var lines = '';

                        for(var i=0;i<convertedReturne.length;i++){

                            var BrandFancyName = convertedReturne[i].offers.line;
                            if(BrandFancyName != null && BrandFancyName != 'undefined' && BrandFancyName != ' '&& BrandFancyName != ''){

                                lines += '<div onclick="SearchOffersLine(\''+BrandFancyName+'\');" style="color:#999933;text-align:center;font-family:\'Open Sans\';border-bottom: 1px solid lightgrey;padding:6%;font-weight:600;font-size:1.1em;">'+(BrandFancyName)+'</div>';
                            }

                        }


                        var plural = '';
                        var type = '';
                        var imageDiv = '';
                        var HTMLProductsFilter = '';
                        var img = 'https://'+ip+'/jezzy-mobile/public_html/img/';

                        if(lines!=''){
                            $("#find").html(lines).hide().fadeIn(200);
                            typeFilter = 'brands';
                        }



                    }else{
                        $("#find").html('<div class="info-text"><span class="glyphicon glyphicon-exclamation-sign" style="padding-right:7%;padding-top:7%;padding-left:0%;width:10%;"></span>Sem produtos para a marca selecionada</div>').hide().fadeIn(200);
                        typeFilter = 'brands';
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
// função procura produtos por linha(linha)
function SearchOffersLine(line){

    var query = '';
    query = 'SELECT * FROM offers Offer WHERE Offer.line = "'+line+'" and Offer.status = "ACTIVE"  and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") ORDER BY Offer.line ASC;';
	
    var conditions = {
        'User': {
            'query': query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();

    ajax_offers_categories = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            $("#find").html('');
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            var brandies = '';
            var texto = '';
            for(var i=0;i<convertedReturne.length;i++) {
                var exibirRetorno = convertedReturne[i];


                var cookie = JSON.stringify(exibirRetorno.Offer.id);
                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

                var arredondado = valorComDesconto.toFixed(2);

                var linha = arredondado.replace(".", ",");
				var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;

                meuLog(linha);

                var id = exibirRetorno.Offer.id;
                var discount = Math.round(exibirRetorno.Offer.percentage_discount);
                var title = exibirRetorno.Offer.title;

                var photo = '';
			
                if (exibirRetorno.Offer.photo != "" ) {
                    photo = exibirRetorno.Offer.photo;
                }
                else {
                    photo = icons + "ImagemIndisponivel2.png";
                }
                var value = exibirRetorno.Offer.value;

                var avista = (' ');
                var urlbackground = '';
                if (exibirRetorno.Offer.photo != "" && exibirRetorno.Offer.photo != 'UPLOAD_ERROR' ) {
                    var photinha = exibirRetorno.Offer.photo;
                    var phota = photinha.split('offers/');
                    photo = phota[0]+'offers/mini-'+phota[1];

                    if(photo.indexOf('png') != -1){
                        urlbackground = '';
                    }
                }else {
                    photo = icons + "ImagemIndisponivel2.png";
                    urlbackground = '';
                }

                if (discount == 0) {
					
					//  texto += ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay'  style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
					texto+=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\");height:100%; background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
					
                }else{
                    //texto += ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div>  </div>");
                    texto += ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                }

                //texto += " <div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";
            }

            typeFilter = 'brandoffers';
            $("#find").html(texto).hide().fadeIn(200);
            $("#offersdisplaytitle").removeClass('col-xs-8');
            $("#offersdisplaytitle").addClass('col-xs-6');
            $("#offersdisplaytitle").css('margin-left','15%');
            $("#offersdisplaytitle").removeClass('col-xs-12');
            $("#offersdisplaytitle").addClass('col-xs-10');
            $("#offersdisplaytitle").html('ENCONTRE');


        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
//função preencher ofertas de problemas
function preencheproblemasofertas(problema){
    typeFilter = 'problemssss';
    var query = 'SELECT * FROM offers Offer INNER JOIN offers_questions ON Offer.id = offers_questions.offer_id INNER JOIN offers_extra_infos ON Offer.id = offers_extra_infos.offer_id WHERE offers_extra_infos.offer_type = "PRODUCT" and Offer.status = "ACTIVE" and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and offers_questions.application LIKE "%'+problema+'%";';
   //console.log(query);
    var conditions = {
        'User': {
            'query': query
        }
    };
    var postData = JSON.stringify(conditions);

    postData = {
        'params': postData
    };
    var url = 'https://' + api + '/users/get/query/' + createToken();

    ajax_offers_subcategories = $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '') {
            $("#find").html('');
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = (JSON.parse(decodeObjReturn));
            var textoHtml = '';
            for (var i = 0; i < convertedReturne.length; i++) {
                var exibirRetorno = convertedReturne[i];


                var cookie = JSON.stringify(exibirRetorno.Offer.id);
                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);
				var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                var arredondado = valorComDesconto.toFixed(2);

                var linha = arredondado.replace(".", ",");


                meuLog(linha);

                var id = exibirRetorno.Offer.id;
                var discount = Math.round(exibirRetorno.Offer.percentage_discount);
                var title = exibirRetorno.Offer.title;

                var photo = '';
		
                if (exibirRetorno.Offer.photo != ""  ) {
                    photo = exibirRetorno.Offer.photo;
                }
                else {
                    photo = icons + "ImagemIndisponivel2.png";
                }
                var value = exibirRetorno.Offer.value;

                var avista = (' ');



                var urlbackground = '';
                if (exibirRetorno.Offer.photo != "" && exibirRetorno.Offer.photo != 'UPLOAD_ERROR' ) {
                    var photinha = exibirRetorno.Offer.photo;
                    var phota = photinha.split('offers/');
                    photo = phota[0]+'offers/mini-'+phota[1];

                    if(photo.indexOf('png') != -1){
                        urlbackground = '';
                    }
                }else {
                    photo = icons + "ImagemIndisponivel2.png";
                    urlbackground = '';
                }

                if (discount == 0) {
					 var texto = ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    //var texto = ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay'  style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
                }else{
					 var texto = ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                    //var texto = ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div>  </div>");
                }



               // var texto = " <div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'    class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                $("#find").append(texto);
                $("#find").fadeIn(300, function(){

                    $("#find")[0].style.display = 'block'; //MOSTRAR DIV

                }); //MOSTRAR DIV
            }


        }else{
            $("#find").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Sem produtos para o filtro escolhido</div>');
            $("#find").fadeIn(300, function(){
                $("#find")[0].style.display = 'block'; //MOSTRAR DIV

            }); //MOSTRAR DIV
        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        // alert(errorThrown);
    });
}
// função pegar categoria
function getCategories(type){
        typeFilter = type;

    if(type == 'brand'){

        preenchebrand();


    }else if(type == 'product'){

            preencheproducts();


        }else if(type != 'product' && type!= 'service' && type!= 'problems' && type!= 'otherprofile'){

            var query = '';
            query = 'SELECT * FROM offers Offer INNER JOIN offers_questions ON Offer.id = offers_questions.offer_id INNER JOIN offers_extra_infos ON Offer.id = offers_extra_infos.offer_id WHERE offers_extra_infos.offer_type = "PRODUCT" and Offer.status = "ACTIVE" and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and offers_questions.product_categories LIKE "%'+type+'%";';

            var conditions = {
                'User': {
                    'query': query
                }
            };
            var postData = JSON.stringify(conditions);

            postData = {
                'params': postData
            };
            var url = 'https://' + api + '/users/get/query/' + createToken();

            ajax_offers_subcategories = $.ajax({
                method: "POST",
                url: url,
                data: postData
            }).done(function (result) {
                if (result != '') {
                    $("#find").html('');
                    var objReturn = JSON.parse(JSON.stringify(result));
                    var decodeObjReturn = Base64.decode(objReturn);
                    var convertedReturne = (JSON.parse(decodeObjReturn));
                    var textoHtml = '';
                    for (var i = 0; i < convertedReturne.length; i++) {
                        var exibirRetorno = convertedReturne[i];


                        var cookie = JSON.stringify(exibirRetorno.Offer.id);
                        var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);
						var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                        var arredondado = valorComDesconto.toFixed(2);

                        var linha = arredondado.replace(".", ",");


                        meuLog(linha);

                        var id = exibirRetorno.Offer.id;
                        var discount = Math.round(exibirRetorno.Offer.percentage_discount);
                        var title = exibirRetorno.Offer.title;

                        var photo = '';
			
                        if (exibirRetorno.Offer.photo != "" ) {
                            photo = exibirRetorno.Offer.photo;
                        }
                        else {
                            photo = icons + "ImagemIndisponivel2.png";
                        }
                        var value = exibirRetorno.Offer.value;

                        var avista = (' ');


                        var urlbackground = '';
                        if (exibirRetorno.Offer.photo != "" && exibirRetorno.Offer.photo != 'UPLOAD_ERROR'  ) {
                            var photinha = exibirRetorno.Offer.photo;
                            var phota = photinha.split('offers/');
                            photo = phota[0]+'offers/mini-'+phota[1];

                            if(photo.indexOf('png') != -1){
                                urlbackground = '';
                            }
                        }else {
                            photo = icons + "ImagemIndisponivel2.png";
                            urlbackground = '';
                        }

                        if (discount == 0) {
                            //var texto = ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay'  style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right; right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div></div>");
							var texto = ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        }else{
                           // var texto = ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div><div   style='position: absolute; bottom: 0%;float: right;right: 0%;'><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/></div>  </div>");
						    var texto = ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        }


                        //var texto = " <div id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  onclick='clickOffer(" + cookie + ")'/></div></div>";

                        $("#find").append(texto);
                        $("#find").fadeIn(300, function(){

                            $("#find")[0].style.display = 'block'; //MOSTRAR DIV

                        }); //MOSTRAR DIV
                    }


                }else{
                    $("#find").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Sem produtos para o filtro escolhido</div>');
                    $("#find").fadeIn(300, function(){
                        $("#find")[0].style.display = 'block'; //MOSTRAR DIV

                    }); //MOSTRAR DIV
                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
               // alert(errorThrown);
            });
        }else if(type == 'service'){


            query = 'SELECT * FROM offers Offer INNER JOIN offers_users ON offers_users.offer_id = Offer.id INNER JOIN offers_extra_infos ON offers_extra_infos.offer_id = Offer.id INNER JOIN offers_services ON offers_services.offer_id = Offer.id INNER JOIN services ON services.id = offers_services.service_id INNER JOIN subclasses ON services.subclasse_id  = subclasses.id INNER JOIN classes ON subclasses.classe_id = classes.id WHERE offers_extra_infos.offer_type = "SERVICE" and offers_users.user_id = ' + $.cookieStorage.get('User').id + ' and Offer.status = "ACTIVE" and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") GROUP BY Offer.title ORDER BY Offer.id';

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

            ajax_offers_services = $.ajax({
                method: "POST",
                url: url,
                data: postData
            }).done(function (result) {

                if (result != "ImE6MDp7fSI=") {
                    $("#find").html('');
                    var objReturn = JSON.parse(JSON.stringify(result));
                    var decodeObjReturn = Base64.decode(objReturn);
                    var convertedReturne = unserialize(JSON.parse(decodeObjReturn));
                    var textoHtml = '';
                    for (var i = 0; i < convertedReturne.length; i++) {
                        var exibirRetorno = convertedReturne[i];



                        $("#find").append('<div class="col-xs-12 filterAreaList" onclick="nextStepOffers(\''+exibirRetorno.Offer.title+'\');">' + (exibirRetorno.subclasses.name).toUpperCase() + '</div>').hide().fadeIn(200, function () {
                           // $("#find")[0].style.display = 'block'; //MOSTRAR DIV
                        });


                    }
                }else{

                    $("#find").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Sem serviços</div>');
                    $("#find").fadeIn(300, function(){
                        $("#find")[0].style.display = 'block'; //MOSTRAR DIV
                    }); //MOSTRAR DIV
                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            });

        }else if(type == 'problems'){
        /*
            $("#find").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Em construção</div>');
            $("#find").fadeIn(300, function(){
                $("#find")[0].style.display = 'block'; //MOSTRAR DIV

            }); //MOSTRAR DIV*/

        preencheproblemas();

        }else if(type == 'otherprofile'){
            $("#find").html('<div class="col-xs-12 info-text"><span class="glyphicon glyphicon-exclamation-sign"></span>Em construção</div>');
            $("#find").fadeIn(300, function(){
                $("#find")[0].style.display = 'block'; //MOSTRAR DIV

            }); //MOSTRAR DIV
        }
}
// função proximo passo ofertas
function nextStepOffers(title){

    var view = $(".drinkcard-dd");
   //console.log(view);
    for(var f = 0;f<view.length;f++){
        view[f].style.display = 'none';
    }
    typeFilter = 'gobacktoservices';
    var query = 'SELECT * FROM offers Offer WHERE Offer.title  = "'+title + '" and Offer.begins_at <= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") and Offer.ends_at >= DATE_FORMAT(CURRENT_TIMESTAMP, "%Y-%m-%d") ';
   //console.log(query);
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

   ajax_offers_show_find= $.ajax({
        method: "POST",
        url: url,
        data: postData
    }).done(function (result) {
        if (result != '"ImE6MDp7fSI="') {
            $("#find").html('');
            var objReturn = JSON.parse(JSON.stringify(result));
            var decodeObjReturn = Base64.decode(objReturn);
            var convertedReturne = unserialize(JSON.parse(decodeObjReturn));
           //console.log(convertedReturne);
            var textoHtml12 = '';
            var textoHtml13 = '';
            for (var i = 0; i < convertedReturne.length; i++) {
                var exibirRetorno = convertedReturne[i];

                var cookie = JSON.stringify(exibirRetorno.Offer.id);
                var valorComDesconto = (exibirRetorno.Offer.value / 100) * (100 - exibirRetorno.Offer.percentage_discount);

                var arredondado = valorComDesconto.toFixed(2);

                var linha = arredondado.replace(".", ",");


                meuLog(linha);

                var id = exibirRetorno.Offer.id;
                var discount = Math.round(exibirRetorno.Offer.percentage_discount);
                var title = exibirRetorno.Offer.title;

                var photo = '';

                var urlbackground = '';
				
                if (exibirRetorno.Offer.photo != "" && exibirRetorno.Offer.photo != 'UPLOAD_ERROR' ) {
                    var photinha = exibirRetorno.Offer.photo;
                    var phota = photinha.split('offers/');
                    photo = phota[0]+'offers/mini-'+phota[1];

                    if(photo.indexOf('png') != -1){
                        urlbackground = '';
                    }
                }else {
                    photo = icons + "ImagemIndisponivel2.png";
                    urlbackground = '';
                }
                var value = exibirRetorno.Offer.value;

                var avista = (' ');

               //console.log(exibirRetorno.Offer.parcels);
                if(exibirRetorno.Offer.parcels != 'INACTIVE'){
                    var quantidadeparcels = exibirRetorno.Offer.parcels_quantity;
                    var linhaparcels = monetary(arredondado / quantidadeparcels);
                   //console.log(exibirRetorno.Offer.company_id);
                    if(exibirRetorno.Offer.company_id == 99999){
                            if (discount == 0) {
                                textoHtml12 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                                textoHtml13 += ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\");height:100%; background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                            }else{
                                textoHtml12 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                                textoHtml13 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                            }
                        }else{
                            if (discount == 0) {
                                textoHtml12 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'> <img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                                textoHtml13 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                            }else{
                                textoHtml12 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'> <img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                                textoHtml13 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                            }

                        }

                    }else {
                    if (exibirRetorno.Offer.company_id == 99999) {
                        if (discount == 0) {
                            textoHtml12 += ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\"" + urlbackground + "\"); background-size:contain; background-repeat: no-repeat;' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                            textoHtml13 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        } else {
                            textoHtml12 += ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\"" + urlbackground + "\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                            textoHtml13 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        }
                    } else {
                        if (discount == 0) {
                            textoHtml12 += ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\"" + urlbackground + "\"); background-size:contain; background-repeat: no-repeat;' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                            textoHtml13 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'>   <img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        } else {
                            textoHtml12 += ("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail'  style='height:100%;background-image:url(\"" + urlbackground + "\"); background-size:contain; background-repeat: no-repeat;'  onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>" + avista + "</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                            textoHtml13 +=("<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'>   <img style='top:0%;float:left;width: 12%;position: absolute;' src='img/icons/seta_oferta_salao.png'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><div style='width: 48%;height: 200px;overflow: hidden;position: relative;'><img class='offerImageDisplaydetail' style='height:100%;background-image:url(\""+urlbackground+"\"); background-size:contain; background-repeat: no-repeat;'   onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;' class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>");
                        }
                    }

                }

/*
                    if (discount == 0) {
                        textoHtml12 += "<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                        textoHtml13 += "<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito'  + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                    } else {
                        textoHtml12 += "<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='img/icons/carrinho_branco.png' style='background-color:#999933;'    class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                        textoHtml13 += "<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + 'em até '+quantidadeparcels+'x no cartão de crédito' +"</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'   class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                    }
                }else{
                    if (discount == 0) {
                        textoHtml12 += "<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><br/><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='img/icons/carrinho_branco.png' style='background-color:#999933;'    class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                        textoHtml13 += "<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'    class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                    } else {
                        textoHtml12 += "<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-6 borderRight offerImageDisplay2'><div ><img class='offerImageDisplay' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/></div><div id='circle' class='offer_circle'>" + discount + '%' + "<br>OFF</div><br/><div class='offerOldPrice'>" + 'R$' + value + "</div><div class='offerNewPrice'>" + 'R$' + linha + "</div> <img src='img/icons/carrinho_branco.png' style='background-color:#999933;'    class='iconCardCheckout' onclick='clickOffer(" + cookie + ")'/>  </div>";
                        textoHtml13 += "<div onclick='clickOffer(" + cookie + ")' id='" + id + "'class='col-xs-12detail borderRight offerImageDisplay2detail'><div class='offer_bodydetail'><span class='titulodetail'>" + title + "</span><img class='offerImageDisplaydetail col-xs-6' onclick='clickOffer(" + cookie + ")' src='" + photo + "'/><div class='offerOldPricedetail'>" + 'De: R$' + value + "</div><div id='circle' class='offer_circledetail'>" + discount + '%' + "<br>OFF</div><div class='offerNewPricedetail'>" + 'Por: R$' + linha + "</div><span class='offerNewPrice2detail'>"+avista+"</span><div class='offerParcelsdetail'>" + "</div><img src='img/icons/carrinho_branco.png' style='background-color:#999933;'  class='iconCardCheckoutdetail' onclick='clickOffer(" + cookie + ")'/></div></div>";

                    }
                }

 */

            }
           //console.log(textoHtml12);
            $("#find").append(textoHtml12).hide().fadeIn(200, function () {
                var view = document.getElementsByClassName("drinkcard-dd");
               //console.log(view);
                for(var f = 0;f<view.length;f++){
                    view[f].style.display = 'none';
                }
                $("#find")[0].style.display = 'block'; //MOSTRAR DIV

            });
            $("#normal").click(function() {
                $(".container").fadeOut(300, function () {
                    if($("#filtro")[0].checked == true){
                        $("#offerDisplay").html(textoHtml12);
                        $("#offersdisplaytitle").removeClass('col-xs-12');
                        $("#offersdisplaytitle").addClass('col-xs-10');
                        $("#offersdisplaytitle").innerText = 'ENCONTRE';
                        $("#offersdisplaytitle").innerHTML = 'ENCONTRE';
                        $("#offersdisplaytitle").html('ENCONTRE');
                    }
                    $(".container").fadeIn(50);
                    var scrolling =  $(".container").animate({
                        scrollTop: 0,
                        duration: 10
                    }, 1, function(){

                        scrolling.stop();
                        scrolling.finish();
                    });
                    visualizacao = 1;
                });
            });
            $("#detail").click(function(){
                $(".container").fadeOut(300, function () {
                    if($("#filtro")[0].checked == true) {
                        $("#offerDisplay").html(textoHtml13);
                        $("#offersdisplaytitle").removeClass('col-xs-12');
                        $("#offersdisplaytitle").addClass('col-xs-10');
                        $("#offersdisplaytitle").innerText = 'ENCONTRE';
                        $("#offersdisplaytitle").innerHTML = 'ENCONTRE';
                        $("#offersdisplaytitle").html('ENCONTRE');
                    }
                    $(".container").fadeIn(50);
                    var scrolling =  $(".container").animate({
                        scrollTop: 0,
                        duration: 10
                    }, 1, function(){

                        scrolling.stop();
                        scrolling.finish();
                    });
                    visualizacao = 2;
                });
            });
        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
// função proximo passo
function nextStep(type){
    $("#find").fadeOut(300, function(){
        getCategories(type);
    });

}
// função convertToUnicodeCharacterSet(valor)
function convertToUnicodeCharacterSet(value) {
    if(value == "à")
        return "\u00E1";
}
// função MeuLog
function meuLog(msg) {
    div = document.body;

}
// função createToken
function createToken() {
    var arraySend = {
        'secureNumbers': Math.floor(new Date().getTime() / 1000)
    };
    var json = JSON.stringify(arraySend);
    return Base64.encode(json);
}
// função unserialize
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
// função generateModalAlert
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
// função json_encode
function json_encode (mixed_val) {
    //       discuss at: http://phpjs.org/functions/json_encode/
    //      original by: Public Domain (http://www.json.org/json2.js)
    // reimplemented by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Michael White
    //         input by: felix
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //        example 1: json_encode('Kevin');
    //        returns 1: '"Kevin"'

    /*
     http://www.JSON.org/json2.js
     2008-11-19
     Public Domain.
     NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
     See http://www.JSON.org/js.html
     */
    var retVal, json = this.window.JSON
    try {
        if (typeof json === 'object' && typeof json.stringify === 'function') {
            // Errors will not be caught here if our own equivalent to resource
            retVal = json.stringify(mixed_val)
            //  (an instance of PHPJS_Resource) is used
            if (retVal === undefined) {
                throw new SyntaxError('json_encode')
            }
            return retVal
        }

        var value = mixed_val

        var quote = function (string) {
            var escapable =
                /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
            var meta = {
                // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            }

            escapable.lastIndex = 0
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a]
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0)
                    .toString(16))
                    .slice(-4)
            }) + '"' : '"' + string + '"'
        }

        var str = function (key, holder) {
            var gap = ''
            var indent = '    '
            // The loop counter.
            var i = 0
            // The member key.
            var k = ''
            // The member value.
            var v = ''
            var length = 0
            var mind = gap
            var partial = []
            var value = holder[key]

            // If the value has a toJSON method, call it to obtain a replacement value.
            if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                value = value.toJSON(key)
            }

            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return quote(value)

                case 'number':
                    // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null'

                case 'boolean':
                case 'null':
                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.
                    return String(value)

                case 'object':
                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.
                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.
                    if (!value) {
                        return 'null'
                    }
                    if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource &&
                        value instanceof window.PHPJS_Resource)) {
                        throw new SyntaxError('json_encode')
                    }

                    // Make an array to hold the partial results of stringifying this object value.
                    gap += indent
                    partial = []

                    // Is the value an array?
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.
                        length = value.length
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null'
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind +
                        ']' : '[' + partial.join(',') + ']'
                        gap = mind
                        return v
                    }

                    // Iterate through all of the keys in the object.
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value)
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v)
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                    '{' + partial.join(',') + '}'
                    gap = mind
                    return v
                case 'undefined':
                // Fall-through
                case 'function':
                // Fall-through
                default:
                    throw new SyntaxError('json_encode')
            }
        }

        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str('', {
            '': value
        })

    } catch (err) {
        // Todo: ensure error handling above throws a SyntaxError in all cases where it could
        // (i.e., when the JSON global is not available and there is an error)
        if (!(err instanceof SyntaxError)) {
            throw new Error('Unexpected error type in json_encode()')
        }
        this.php_js = this.php_js || {}
        // usable by json_last_error()
        this.php_js.last_error_json = 4
        return null
    }
}
// função voltar
function volta(){
	  
    if(page == 2){

        if(typeFilter != 'product' && typeFilter!= 'service' && typeFilter!= 'problems' && typeFilter!= 'otherprofile' && typeFilter!= 'brand' && typeFilter != 'branddisplay'){
            if(typeFilter == 'filter'){
                window.history.go(-1);
            }else if(typeFilter == 'brands'){
                preenchebrand();
            }else if(typeFilter == 'brandoffers') {

                SearchLine(filterline);

            }else if(typeFilter == 'problemssss'){
                preencheproblemas();
                typeFilter = 'problems';
            }else if(typeFilter == 'gobacktoservices'){
                getCategories('service');
            }else{
                preencheproducts();
                typeFilter =  'product';
            }

        }else{
            $("#filtro").click();
        }

    }else{
        window.history.go(-1);
    }

}







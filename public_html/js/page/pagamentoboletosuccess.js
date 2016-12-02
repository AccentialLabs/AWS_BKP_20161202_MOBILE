/**
 * Created by Ariany on 29/09/2016.
 */
$(document).ready(function() {
    if($.cookieStorage.isSet('PaymentSuccess')){
        var paymentinfos = ($.cookieStorage.get('PaymentSuccess'));

        var email = paymentinfos.email;
        var transaction =  paymentinfos.transaction;

        if(paymentinfos.productype == 'PRODUCT') {
            var titleserv = "<b>Produto:</b> "+paymentinfos.title + "</br>";


        }else{
            var titleserv = "<b>Serviço:</b> "+paymentinfos.title + "</br>";

        }
        var total_value = paymentinfos.total_value;
        var dn = paymentinfos.dn;
        var payment_method_id = paymentinfos.payment_method_id;
        var uniqid = paymentinfos.uniqid;
        var new_format = paymentinfos.new_format;


        payment_method_id = '73';
        if(payment_method_id == '73'){
            payment_method_id = 'Boleto';
        }else if(payment_method_id == '5'){
            payment_method_id = 'MasterCard';
        }else if(payment_method_id == '7'){
            payment_method_id = 'American Express';
        }else if(payment_method_id == '8'){
            payment_method_id = 'Diners';
        }else if(payment_method_id == '10'){
            payment_method_id = 'Elo';
        }else if(payment_method_id == '15'){
            payment_method_id = 'Hiper';
        }else if(payment_method_id == '3'){
            payment_method_id = 'Visa';
        }


        $("#uniqid").html(uniqid);
        $("#new_format").html(new_format);
        $("#emails").html(email);
        $("#transaction").html(transaction);
        $("#titleserv").html(titleserv);
        $("#total_value").html(total_value);
        $("#dn").html(dn);
        $("#payment_method_id").html(payment_method_id);


		console.log(paymentinfos)

		//$("#id").val(paymentinfos.boletoofferid);
        $("#email").val(paymentinfos.boletoemail);
        $("#offertype").val(paymentinfos.boletooffertype);
        $("#frete").val(paymentinfos.boletoresultfrete2);
        $("#desconto").val(paymentinfos.boletodesconto);
        $("#valortotal").val(paymentinfos.boletototalvalue);
        $("#salao").val(paymentinfos.boletosalao);
        $("#title").val(paymentinfos.boletotitle);
        $("#district").val(paymentinfos.boletodistrict);
        $("#zip_code").val(paymentinfos.boletozipcode);
        $("#city").val(paymentinfos.boletocity);
        $("#address").val(paymentinfos.boletoaddress);
        $("#complement").val(paymentinfos.boletocomplement);
        $("#number").val(paymentinfos.boletonumber);
        $("#state").val(paymentinfos.boletostate);
        $("#id").val(paymentinfos.boletoofferid);
        $("#password").val(paymentinfos.boletolink);
		$("#salaoaddress").val(paymentinfos.salaoaddress);
		$("#salaocomplement").val(paymentinfos.salaocomplement);
		$("#salaocity").val(paymentinfos.salaocity);
		$("#salaodistrict").val(paymentinfos.salaodistrict);
		$("#salaostate").val(paymentinfos.salaostate);
		$("#salaozip_code").val(paymentinfos.salaozip_code);
		$("#salaonumber").val(paymentinfos.salaonumber);
		$("#workdays").val(paymentinfos.workdays);
		$("#open_hour").val(paymentinfos.open_hour);
		$("#end_hour").val(paymentinfos.end_hour);
		
		


    }

});
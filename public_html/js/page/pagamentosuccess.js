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




        $("#email").html(email);
        $("#transaction").html(transaction);
        $("#titleserv").html(titleserv);
        $("#total_value").html(total_value);
        $("#dn").html(dn);
        $("#payment_method_id").html(payment_method_id);

    }

});
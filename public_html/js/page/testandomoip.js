/**
 * Created by Ariany on 28/09/2016.
 */

$(document).ready(function () {



    $.ajax({
        method: "GET",
        url: "https://sandbox.moip.com.br/v2/orders",
        data:{
            Authorization: "Basic SFJFT1RPSEpPNElZUVJPMjRBRVVVTVE4OVpRMTEzUk46U1BUUTJYUllTN1dISlVLUUtIMjVUQzk1N0gwM0xJNFpXS0xDTzBDTA==",
            token: 'HREOTOHJO4IYQRO24AEUUMQ89ZQ113RN',
            key:'SPTQ2XRYS7WHJUKQKH25TC957H03LI4ZWKLCO0CL'

        }
    }).done(function(result) {

        alert(result);

    }).error(function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });


});
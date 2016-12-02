/**
 * Created by Ariany on 12/08/2016.
 */
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

        }

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);

    });
}
function volta(){
	window.history.go(-1);
}
function SaveInfoHairProfile(){
    var hairtype = document.getElementsByName('hairtype');
    var hairtypetext = '';
    var hairtypeelement = '';
    var chemistrytypetext = '';
    for(var i=0; i<hairtype.length;i++){
        hairtypeelement = hairtype[i];
        if(hairtypeelement.checked == true){

            if(hairtypeelement.value == 'straight' || hairtypeelement.value == 'wavy/curly/kcc' || hairtypeelement.value == 'blond/grey'){
                hairtypetext += hairtypeelement.value+';';
            }else{
                chemistrytypetext += hairtypeelement.value+';';
            }

        }

    }


    if(chemistrytypetext == '' && hairtypetext == ''){
        chemistrytypetext = 'normal;';
    }
    if($.cookieStorage.get('facebook_profiles').chemistry != chemistrytypetext || $.cookieStorage.get('facebook_profiles').hair_type !== hairtypetext){
    var query = 'UPDATE facebook_profiles SET hair_type = "'+hairtypetext+'", chemistry = "'+chemistrytypetext+'" WHERE user_id = ' + $.cookieStorage.get('User').id;

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
        setFBprofile();
        window.location.href = 'my_profile.html';

    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
    });

    }else{
        generateModalAlert('Não foram feitas alterações');
        $('#mymodal').modal('show');
        window.location.href = 'my_profile.html';
    }
}
$(document).ready(function () {
    if($.cookieStorage.isSet('User')){

    }else{

        window.location.href = 'index.html';

    }
    document.getElementById("userName").innerText = $.cookieStorage.get('User').name;
    var query = "SELECT * FROM facebook_profiles WHERE user_id = " + $.cookieStorage.get('User').id ;
    var conditions={
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
    }).done(function(result) {
        var objReturn = JSON.parse(JSON.stringify(result));
        var decodeObjReturn = Base64.decode(objReturn);
        var convertedReturn = unserialize(JSON.parse(decodeObjReturn));

        $.cookieStorage.set(convertedReturn[0]);

        var hair_profile = $.cookieStorage.get('facebook_profiles').hair_type;
        var chemistry_profile = $.cookieStorage.get('facebook_profiles').chemistry;

        var hairtype = document.getElementsByName('hairtype');
        var hairtypename = '';
        var hairprofilename = '';
        var hairtypeelement = '';
        for(var i=0; i<hairtype.length;i++){
            hairtypename = (hairtype[i].value);
            hairtypeelement = hairtype[i];

            var hair_profile_split = hair_profile.split(';');
            var chemistry_split = chemistry_profile.split(';');

            for(var a=0;a<hair_profile_split.length;a++){
                hairprofilename = (hair_profile_split[a]);
               //console.log(hairprofilename);
                if(hairprofilename == hairtypename){
                    hairtypeelement.checked = true;
                }
            }
            for(var c=0;c<chemistry_split.length;c++){
                hairprofilename = (chemistry_split[c]);
               //console.log(hairprofilename);

                if(hairprofilename == hairtypename){
                    hairtypeelement.checked = true;
                }
            }

        }
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);

    });

});

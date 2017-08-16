/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady(){
    //do nothing for now
}

$(document).on("pageshow",function(){
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
    if($("#contactsList").length ===1){
        $("body").addClass('ui-disabled').css("background","#000");
        $.mobile.loading("show");
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var filter = ["displayName","phoneNumbers"];
        navigator.contacts.find(filter,onSuccess,onError,options);
    }else if($("#addContact").length === 1){
        bindAddContactEvents();
    }
}) ;

function onSuccess(contacts){
    var html = "" ;
    for(var i = 0; i < contacts.length; i++){
        if($.trim(contacts[i].displayName).length != 0 || $.trim(contacts[i].nickName).length != 0){
            html += '<li>' ;
            html += '<h2>' + contacts[i].displayName ? contacts[i].displayName : contacts[i].nickName + '</h2>' ;
            if(contacts[i].phoneNumbers){
                html += '<ul class="innerlsv" data-role="listview" data-insert="true">' ;
                html += '<li><h3> Phone Numbers </h3> </li>' ;
                for(var j = 0; j < contacts[i].phoneNumbers.length; j++){
                    html += "<li> Type : " + contacts[i].phoneNumbers[j].type + "<br/>" +
                            "Value: "+ contacts[i].phoneNumbers[j].value + "<br/>" +
                            "Prefered: "+ contacts[i].phoneNumbers[j].pref + "</li>" ;
                    
                }
                html += "<ul/>" ;
            }
            html += '</li>' ;
        }
    }
    if(contacts.length === 0){
        html = '<li data-role="collapsible" data-iconpos="right" data-shadow="false">' ;
        html += '<h2> No Contacts </h2>' ;
        html += '<label> No Contacts Listed </label>' ;
        html += '</li>' ;
    }
    //
    $("#contactsList").html(html);
    $("#contactList").listview().listview('refresh');
    $(".innerlsv").listview().listview('refresh');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}
function onError(contactError){
    alert('Opps Something went wrong!!');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}
//function to bind and create contacts
function bindAddContactEvents(){
    $("#addContact").on("click",function(){
       var name = $.trim($("#name").val()),
       number = $.trim($("#number").val()) ;
       //
       if(name.length === 0){
           alert("Please enter a valid Name");
           return false;
       }
       if(number.length === 0){
           alert("Please enter valid phone number");
           return false;
       }
       //
       var contact = navigator.contacts.create();
       contact.displayName = name;
       contact.nickname = name ;
       
       var phoneNumbers = []
       phoneNumbers[0] = new ContactField('mobile',number,true);
       contact.phoneNumbers = phoneNumbers ;
       //
       contact.save(createSuccess,createError);
    });
}

function createSuccess(){
    alert("Contact has been successfully addedd !");
}
function createError(){
    alert("Ooops Something is wrong. Try again later");
}

function resetPage(){
    $("#name").val("") ;
    $("#number").val("");
}

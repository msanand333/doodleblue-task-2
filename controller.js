const viewContacts = document.querySelector('.contacts');
const viewMessage = document.querySelector('.message');
const viewCallLog = document.querySelector('.callLog');
const viewContactList = document.querySelector('.contact-list');
const viewMessageThreads = document.querySelector('.message-threads');
const viewIndividualThread = document.querySelector('.individual-thread');
const viewCalls = document.querySelector('.call-log');
const goBack = document.querySelector('.back');
let show = false;
var triggeringElement = "";


//*************************************************************************** */
//***********************PARENT DATA ARRAY********************************** */
//**************************************************************************** */

let contactDetails = [{
        userId: 0,
        name: "tyler",
        profileImage: "/img/tyler.jpg",
        emailId: "tyler@google.com",
        message: [], //"The things you own end up owning you!",
        callTimings: []
    },

    {
        userId: 1,
        name: "joker",
        profileImage: "/img/joker.jpg",
        emailId: "joker@google.com",
        message: ["Lets put a smile on that face!"],
        callTimings: []
    },
    {
        userId: 2,
        name: "keyser",
        profileImage: "/img/keyser.jpg",
        emailId: "keyser@google.com",
        message: ["the greatest trick the devil ever pulled was convincing the world that he didn't exist!"],
        callTimings: []
    },
    {
        userId: 3,
        name: "jordan",
        profileImage: "/img/jordan.jpg",
        emailId: "jordan@google.com",
        message: ["I've got the guts to die. What I want to know is, have you got the guts to live?"],
        callTimings: []
    }
];
//************************************************************************************************************* */
//***********************************************SINGLE-PAGE FUNCTIONALITY********************************************* */
//************************************************************************************************************* */

function remove_class() {
    viewContactList.classList.remove('hide', 'show');
    viewMessageThreads.classList.remove('hide', 'show');
    viewIndividualThread.classList.remove('hide', 'show');
    viewCalls.classList.remove('hide', 'show');
}

//************************************************************************************************************* */
//***********************************************SINGLE-PAGE FUNCTIONALITY********************************************* */
//************************************************************************************************************* */
function get_date_time() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return {
        date: date,
        time: time
    };
}





//************************************************************************************************************* */
//********************************FUNCTION FOR VIEWING HOMEPAGE(CONTACT-LIST)********************************************* */
//************************************************************************************************************* */

$(document).ready(homepage);
$(document).ready(function() {
    $("#first").hide();
});
viewContacts.addEventListener('click', homepage);
goBack.addEventListener('click', homepage);

function homepage() {

    remove_class();
    if (!show) {
        viewContactList.classList.add('show');
        viewMessageThreads.classList.add('hide');
        viewIndividualThread.classList.add('hide');
        viewCalls.classList.add('hide');
        let contactList = "";
        contactDetails.forEach(contact => {

            contactList += `<div class="my-contacts"> <div class="row justify-content-around">
    <div class="col-xs-2 image">
        <img class="rounded-circle" src="${contact.profileImage}" alt="" height="50" width="50">

    </div>

    <div class=" col-xs-2 contact-details">
        <h6>${contact.name}</h6>
        <h6 style="font-size:0.7rem">${contact.emailId}</h6>
    </div>

    <div class=" col-xs-8 action justify-content-around">
        <button data-userCode="${contact.userId}" type="button" class="btn btn-primary btn-sm make-call"><i data-userCode="${contact.userId}" class="fas fa-phone"></i></button>
        <button data-userCode="${contact.userId}" type="button" class="btn btn-danger btn-sm send-message" data-toggle="modal" data-target="#myModal-1"><i data-userCode="${contact.userId}" class="fas fa-envelope"></i></button>
        <button data-userCode="${contact.userId}" type="button" class="btn btn-primary btn-sm delete-contact"><i data-userCode="${contact.userId}" class="far fa-trash-alt"></i></button>
        <button data-userCode="${contact.userId}" type="button" class="btn btn-danger btn-sm edit-contact" data-toggle="modal" data-target="#myModal-3"><i data-userCode="${contact.userId}" class="fas fa-user-edit"></i></button>
    </div>

</div></div>`;

        });

        $("#cl").html(contactList);

        const sendMessage = document.querySelectorAll(".send-message");
        for (let i = 0; i < sendMessage.length; i++) {

            sendMessage[i].addEventListener('click', message_box);

        }

        const deleteContact = document.querySelectorAll(".delete-contact");
        for (let i = 0; i < deleteContact.length; i++) {

            deleteContact[i].addEventListener('click', delete_contact);

        }

        const makeCall = document.querySelectorAll(".make-call");
        for (let i = 0; i < makeCall.length; i++) {

            makeCall[i].addEventListener('click', make_call);

        }

        const editContact = document.querySelectorAll(".edit-contact");
        for (let i = 0; i < editContact.length; i++) {

            editContact[i].addEventListener('click', edit_box);

        }

    }



}


//******************************************************************************************************** */
//*************************************FUNCTION FOR DELETING CONTACT*****************************************/
//******************************************************************************************************** */
function update_Div() {
    console.log("update div triggered");
    //$('#cl').load(document.URL + ' #cl');
    homepage();
}

function delete_contact(evt) {
    console.log("delete triggered");
    contactDetails.forEach(contact => {
        if (contact.userId == evt.target.getAttribute('data-userCode')) {
            var index = contactDetails.indexOf(contact);
            contactDetails.splice(index, 1);
        }
    });
    console.log(contactDetails);
    update_Div();

}
//******************************************************************************************************** */
//*************************************IMAGE-BASE64 CONVERTER*****************************************/
//******************************************************************************************************** */
var img = "";

function readURL(input) {
    console.log("readURL triggered");
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#falseinput').attr('src', e.target.result);
            img = e.target.result;
            console.log(`${img}`);

        }
        reader.readAsDataURL(input.files[0]);
    }
}
//******************************************************************************************************** */
//*************************************FUNCTION FOR ADDING NEW CONTACT*****************************************/
//******************************************************************************************************** */

function add_contact() {
    var name = $("#name").val();
    var email = $("#email").val();
    var image = img;
    var uid = contactDetails[contactDetails.length - 1].userId + 1;
    //var msg=[];
    //var time=[];
    var newContact = {
        userId: uid,
        name: name,
        profileImage: image,
        emailId: email,
        message: [], //"The things you own end up owning you!",
        callTimings: []
    }
    contactDetails.push(newContact);
    console.log(contactDetails);
    homepage();
    $("#name").val("");
    $("#email").val("");
    img = "";

}

//*********************************************************************************************************** */
//*******************************************FUNCTION FOR EDITING CONTACT**************************************** */
//*********************************************************************************************************** */
function edit_box(evt) {
    triggeringElement = evt.target.getAttribute('data-userCode');
}

function edit_contact() {
    var newName = $("#new-name").val();
    var newEmail = $("#new-email").val();
    var newImage = img;
    contactDetails.forEach(contact => {
        if (contact.userId == triggeringElement) {
            if (newName != "") {
                contact.name = newName;
            }
            if (newEmail != "") {
                contact.emailId = newEmail;
            }
            if (newImage != "") {
                contact.profileImage = newImage;
            }




        }
    });
    $("#new-name").val("");
    $("#new-email").val("");
    img = "";
    update_Div();

}




//*********************************************************************************************************** */
//*******************************************FUNCTION FOR MAKING CALL**************************************** */
//*********************************************************************************************************** */

var order = 0;
var count = 0;

function make_call(evt) {
    console.log("make call triggered");


    contactDetails.forEach(contact => {
        if (contact.userId == evt.target.getAttribute('data-userCode')) {

            var dt = {
                date: get_date_time().date,
                time: get_date_time().time
            };
            contact.callTimings.push(dt);
            console.log(contact.callTimings);
            // var cl = `<li>${contact.name}(${contact.callTimings.length}) ${contact.callTimings[contact.callTimings.length-1].time}</li>`;
            console.log(cl);
            if (evt.target.getAttribute('data-userCode') == order) {
                $("#first").show();
                count++;
                var cl = `<div class="col-xs-9">${contact.name}(${count})</div><div class="col-xs-3">${contact.callTimings[contact.callTimings.length-1].time}</div>`;
                $("#clg>div:first").html(cl);
                //$("#clg").prepend(cl);
                console.log(cl);
                //$("#clg").prepend(cl);
            } else {
                count = 1;
                // $("#first").hide();
                var cl = `<div class="row justify-content-between first"><div class="col-xs-9">${contact.name}(1)</div><div class="col-xs-3">${contact.callTimings[contact.callTimings.length-1].time}</div></div>`;
                $("#clg").prepend(cl);
                order = evt.target.getAttribute('data-userCode');
                console.log(cl);
            }


            console.log(order);

        }

    });




}





//******************************************************************************************************** */
//*************************************FUNCTION FOR SENDING MESSAGE*****************************************/
//******************************************************************************************************** */


function message_box(evt) {
    $('textarea#message-input').val("");
    triggeringElement = evt.target.getAttribute('data-userCode');
    console.log(evt.target.getAttribute('data-userCode'));
}

function send() {

    var yourMessage = $('textarea#message-input').val();
    console.log("hello world");

    if (yourMessage != null) {

        contactDetails.forEach(contact => {
            if (contact.userId == triggeringElement) {
                contact.message.splice(0, 0, yourMessage); // add message to contact object

            }
        });
    }
    console.log(contactDetails);

}

//************************************************************************************************** */
//*************************FUNCTION FOR VIEWING MESSAGE THREADs******************************* *********/
//**************************************************************************************************** */


viewMessage.addEventListener('click', view_Message_Threads);

function view_Message_Threads() {
    remove_class();
    if (!show) {
        viewContactList.classList.add('hide');
        viewMessageThreads.classList.add('show');
        viewIndividualThread.classList.add('hide');
        viewCalls.classList.add('hide');
        let messageThreads = "";
        contactDetails.forEach(contact => {
            if (contact.message.length != 0) {
                messageThreads += `<div class="d-flex justify-content-around vmt">${contact.name}<button data-userId="${contact.userId}" type="button" class="btn btn-primary thread" >View</button></div></br>`;
            }
        });
        $("#threads").html(messageThreads);
        const selectedThread = document.querySelectorAll(".thread");
        for (let i = 0; i < selectedThread.length; i++) {

            selectedThread[i].addEventListener('click', view_individual_thread);

        }
    }
}

//*********************************************************************************************************** */
//*************************FUNCTION FOR VIEWING INDIVIDUAL MESSAGE THREAD******************************* */
//******************************************************************************************************* */


function view_individual_thread(evt) {
    remove_class();
    if (!show) {
        viewContactList.classList.add('hide');
        viewMessageThreads.classList.add('hide');
        viewIndividualThread.classList.add('show');
        viewCalls.classList.add('hide');
        let yourMessages = "";
        console.log("level1 triggered");
        console.log(evt.target.getAttribute('data-userId'));

        contactDetails.forEach(contact => {
            if (contact.userId == evt.target.getAttribute('data-userId')) {
                contact.message.forEach(message => {
                    yourMessages += `<div class="vit">${message}</div></br>`;
                });

            }
        });

        $("#i-thread").html(yourMessages);
    }
}

//*********************************************************************************************************** */
//*******************************************FUNCTION FOR VIEWING CALL-LOG**************************************** */
//*********************************************************************************************************** */
viewCallLog.addEventListener('click', view_call_log);

function view_call_log() {
    remove_class();
    if (!show) {
        console.log("calllog triggered");
        viewContactList.classList.add('hide');
        viewMessageThreads.classList.add('hide');
        viewIndividualThread.classList.add('hide');
        viewCalls.classList.add('show');

    }

}
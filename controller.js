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
    return dateTime;
}





//************************************************************************************************************* */
//********************************FUNCTION FOR VIEWING HOMEPAGE(CONTACT-LIST)********************************************* */
//************************************************************************************************************* */

$(document).ready(homepage);
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
    <div class="col-sm-4 image">
        <img class="img-fluid" src="${contact.profileImage}" alt="" height="100" width="200">

    </div>

    <div class=" col-sm-4 contact-details">
        <h4>${contact.name}</h4>
        <h6>${contact.emailId}</h6>
    </div>

    <div class=" col-sm-4 action justify-content-around">
        <button data-userCode="${contact.userId}" type="button" class="btn btn-primary make-call"><i data-userCode="${contact.userId}" class="fas fa-phone "></i></button>
        <button data-userCode="${contact.userId}" type="button" class="btn btn-danger send-message" data-toggle="modal" data-target="#myModal-1"><i data-userCode="${contact.userId}" class="fas fa-envelope"></i></button>
        <button data-userCode="${contact.userId}" type="button" class="btn btn-primary delete-contact"><i data-userCode="${contact.userId}" class="far fa-trash-alt"></i></button>
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
//*************************************FUNCTION FOR ADDING NEW CONTACT*****************************************/
//******************************************************************************************************** */
function add_contact() {

}
//*********************************************************************************************************** */
//*******************************************FUNCTION FOR MAKING CALL**************************************** */
//*********************************************************************************************************** */
function make_call(evt) {
    console.log("make call triggered");

    contactDetails.forEach(contact => {
        if (contact.userId == evt.target.getAttribute('data-userCode')) {

            var dt = get_date_time();
            contact.callTimings.push(dt);
            console.log(contact.callTimings);

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
                messageThreads += `<li>${contact.name}<span>&emsp;&emsp;<button data-userId="${contact.userId}" type="button" class="btn btn-primary thread" >View</button></span></li></br>`;
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
                    yourMessages += `<li>${message}</li></br>`;
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
        var yourCallLog = "";
        var timings = "";
        contactDetails.forEach(contact => {
            if (contact.callTimings != null) {
                contact.callTimings.forEach(time => {
                    timings += `<li>${time}</li></br>`;
                });
                yourCallLog += `<h1>${contact.name}</h1>
                <ul style="list-style-type: square">
                    ${timings}
                </ul></br>`
                timings = "";
            }

        });
        $("#clg").html(yourCallLog);
    }

}
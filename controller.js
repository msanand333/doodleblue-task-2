const viewContacts = document.querySelector('.contacts');
const viewMessage = document.querySelector('.message');
const viewContactList = document.querySelector('.contact-list');
const viewMessageThreads = document.querySelector('.message-threads')
const viewIndividualThread = document.querySelector('.individual-thread')
const viewCallLog = document.querySelector('.callLog');
const goBack = document.querySelector('.back');
let show = false;


let contactDetails = [{
        userId: 0,
        name: "tyler",
        profileImage: "/img/tyler.jpg",
        emailId: "tyler@google.com",
        message: [] //"The things you own end up owning you!"
    },

    {
        userId: 1,
        name: "joker",
        profileImage: "/img/joker.jpg",
        emailId: "joker@google.com",
        message: ["Lets put a smile on that face!"]
    },
    {
        userId: 2,
        name: "keyser",
        profileImage: "/img/keyser.jpg",
        emailId: "keyser@google.com",
        message: ["the greatest trick the devil ever pulled was convincing the world that he didn't exist!"]
    },
    {
        userId: 3,
        name: "jordan",
        profileImage: "/img/jordan.jpg",
        emailId: "jordan@google.com",
        message: ["I've got the guts to die. What I want to know is, have you got the guts to live?"]
    }
];

//************************************************************************************************************* */
//********************************FUNCTION FOR VIEWING HOMEPAGE********************************************* */
//************************************************************************************************************* */

$(document).ready(homepage);
viewContacts.addEventListener('click', homepage);
goBack.addEventListener('click', homepage);

function homepage() {
    viewContactList.classList.remove('hide', 'show');
    viewMessageThreads.classList.remove('hide', 'show');
    viewIndividualThread.classList.remove('hide', 'show');
    if (!show) {
        viewContactList.classList.add('show');
        viewMessageThreads.classList.add('hide');
        viewIndividualThread.classList.add('hide');
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
        <button  type="button" class="btn btn-primary"><i data-userCode="${contact.userId}" class="fas fa-phone call"></i></button>
        <button  type="button" class="btn btn-danger"><i data-userCode="${contact.userId}" class="fas fa-envelope send-message"></i></button>
    </div>

</div></div>`;

        });

        $("#cl").html(contactList);

        const sendMessage = document.querySelectorAll(".send-message");
        for (let i = 0; i < sendMessage.length; i++) {

            sendMessage[i].addEventListener('click', send);

        }
    }



}
//******************************************************************************************************** */
//*************************************FUNCTION FOR SENDING MESSAGE*****************************************/
//******************************************************************************************************** */


function send(evt) {


    console.log("hello world");
    console.log(evt.target.getAttribute('data-userCode'));
    console.log(evt.target.getAttribute('data-userCode'));
    var yourMessage = prompt("Please enter your message");
    if (yourMessage != null) {
        // add message to contact object
        contactDetails.forEach(contact => {
            if (contact.userId == evt.target.getAttribute('data-userCode')) {
                contact.message.splice(0, 0, yourMessage);

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
    viewContactList.classList.remove('hide', 'show');
    viewMessageThreads.classList.remove('hide', 'show');
    viewIndividualThread.classList.remove('hide', 'show');
    if (!show) {
        viewContactList.classList.add('hide');
        viewMessageThreads.classList.add('show');
        viewIndividualThread.classList.add('hide');
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

    //*********************************************************************************************************** */
    //*************************FUNCTION FOR VIEWING INDIVIDUAL MESSAGE THREAD******************************* */
    //******************************************************************************************************* */


    function view_individual_thread(evt) {
        viewContactList.classList.remove('hide', 'show');
        viewMessageThreads.classList.remove('hide', 'show');
        viewIndividualThread.classList.remove('hide', 'show');
        if (!show) {
            viewContactList.classList.add('hide');
            viewMessageThreads.classList.add('hide');
            viewIndividualThread.classList.add('show');
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


}
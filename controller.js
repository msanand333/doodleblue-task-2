const viewContacts = document.querySelector('.contacts');
const viewMessage = document.querySelector('.message');
const viewCallLog = document.querySelector('.callLog');
const goBack = document.querySelector('.back');


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
//<button data-userId="" type="button" class="btn btn-primary">View</button>
//class="d-flex justify-content-around"








//********************************FUNCTION FOR VIEWING CONTACTLIST********************************************* */
//window.onload(view_Contacts);
$(document).ready(homepage);
//viewContacts.addEventListener('click', view_Contacts);
//goBack.addEventListener('click', view_Contacts);
//window.addEventListener('load', view_contacts);

function homepage() {
    let contactList = "";
    contactDetails.forEach(contact => {

        contactList += `<div class="my-contacts"> <div class="row justify-content-around">
    <div class="col-sm-4 image">
        <img src="${contact.profileImage}" alt="" height="100" width="200">

    </div>

    <div class=" col-sm-4 contact-details">
        <h4>${contact.name}</h4>
        <h6>${contact.emailId}</h6>
    </div>

    <div class=" col-sm-4 action justify-content-around">
        <button data-userId="${contact.userId}" type="button" class="btn btn-primary"><i class="fas fa-phone call"></i></button>
        <button data-userId="${contact.userId}" type="button" class="btn btn-danger"><i class="fas fa-envelope send-message"></i></button>
    </div>

</div></div>`;

    });

    $("#cl").append(contactList);

    //var conta = document.getElementById('cl');
    //conta.appendChild(contactList);
    /* var node = document.createElement("div"); // 
     var textnode = document.createTextNode(contactList); // 
     node.appendChild(textnode); // Append the text to <li>
     document.getElementById("cl").appendChild(node);*/

}



//***********************FUNCTION FOR VIEWING MESSAGE ********************************************************/


viewContacts.addEventListener('click', view_Contacts);


function view_Contacts() {
    let contactView = "";
    contactDetails.forEach(contact => {

        contactView += `<div><div class="row justify-content-around">
    <div class="col-sm-4 image">
        <img src="${contact.profileImage}" alt="" height="100" width="200">

    </div>

    <div class=" col-sm-4 contact-details">
        <h4>${contact.name}</h4>
        <h6>${contact.emailId}</h6>
    </div>

    <div class=" col-sm-4 action justify-content-around">
        <button data-userId="${contact.userId}" type="button" class="btn btn-primary"><i class="fas fa-phone call"></i></button>
        <button data-userId="${contact.userId}" type="button" class="btn btn-danger"><i class="fas fa-envelope send-message"></i></button>
    </div>

</div>`;

    });

    $("#cl").html(contactView);

    //var conta = document.getElementById('cl');
    //conta.appendChild(contactList);
    /* var node = document.createElement("div"); // 
     var textnode = document.createTextNode(contactList); // 
     node.appendChild(textnode); // Append the text to <li>
     document.getElementById("cl").appendChild(node);*/


}


//*************************FUNCTION FOR VIEWING MESSAGE THREADs******************************* */

viewMessage.addEventListener('click', view_Message_Threads);

function view_Message_Threads() {
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


//*************************FUNCTION FOR VIEWING INDIVIDUAL MESSAGE THREAD******************************* */

//let chicken = true;

function view_individual_thread(evt) {
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

    //selectedThread.dataset.userId
}
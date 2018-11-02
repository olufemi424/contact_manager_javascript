// LISTEN FOR A SUBMIT BUTTON FROM FORM
document.getElementById("myForm").addEventListener("submit", saveContact);

// SAVE CONTACT FUNCTION
function saveContact(e) {
  // GET THE FORM VALUES FROM THE DOM AND SET THEM TO A VARIABLE
  var contactName = document.getElementById("name").value;
  var contactEmail = document.getElementById("email").value;
  var contactPhone = document.getElementById("phone").value;
  var contactAddress = document.getElementById("address").value;

  if (!validateForm(contactName, contactEmail, contactAddress)) {
    return false;
  }

  //CREATE A contacts OBJECT living in the save contact function
  var contact = {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    address: contactAddress
  };

  // TEST IF LOCAL STORAGE STATUS
  if (localStorage.getItem("contacts") === null) {
    //INITIALIZE THE ARRAY
    var contacts = [];
    //ADD TO ARRAY //if the local storage is empty, push contact to the empty space
    contacts.push(contact);
    //SET TO LOCAL STORAGE (set to string)
    localStorage.setItem("contacts", JSON.stringify(contacts));
  } else {
    //get contacts from local storage
    var contacts = JSON.parse(localStorage.getItem("contacts"));

    //ADD CONTACT from the contact object submitted to the local storage, adding it to the contacts that are already there
    console.log(contact.id);
    contacts.push(contact);

    //Re-SET TO LOCAL STORAGE (set to string)
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  //REFETCH CONTACTS
  fetchContacts();

  // console.log(contacts);
  //PREVENT FORM FROM SUBMITTING
  e.preventDefault();
}

function deleteContact(email) {
  //GET CONTACTS FROM LOCAL STORAGE
  var contacts = JSON.parse(localStorage.getItem("contacts"));

  //LOOP THRU CONTACTS
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].email == email) {
      // REMOVE FROM ARRAY OF CONTACTS IN THE STORAGE
      contacts.splice(i, 1);
    }
  }
  //Re-SET TO LOCAL STORAGE (set to string)
  localStorage.setItem("contacts", JSON.stringify(contacts));
  fetchContacts();
}

//FETCH CONTACTS
//fect contacts on window load
window.onload = fetchContacts();
function fetchContacts() {
  //GET CONTACTS FROM LOCAL STORAGE
  var contacts = JSON.parse(localStorage.getItem("contacts"));

  //GET OUTPUT RESULT
  var contactsResult = document.getElementById("contactResults");
  //BUILD CONTACTS OUTPUT
  contactsResult.innerHTML = "";

  for (var i = 0; i < contacts.length; i++) {
    var name = contacts[i].name;
    var email = contacts[i].email;
    var phone = contacts[i].phone;
    var address = contacts[i].address;

    contactsResult.innerHTML += `<div class="card my-2 p-3">
                        <h4>${name}
                        <a onclick = "deleteContact('${email}')" target = "_blank" class="btn badge badge-danger ml-5">Delete </a><a class="btn badge badge-primary ml-2">Edit </a></h4>
                        <p class="lead">${email}</p>
                        <p class="lead">${phone} </p>
                        <p class="lead">${address}</p>
                        
                    </div>`;
  }
}

// VALIDATION

function validateForm(contactName, contactEmail, contactPhone) {
  if (!contactName || !contactEmail || !contactPhone) {
    alert("Pls fill in the form");
    return false;
  } else {
    return true;
  }
}
//////////////////////////////

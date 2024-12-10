const apiUrl = 'http://localhost:3000/api/members';
let editMemberId = null;

function fetchMembers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayMembers(data); // Call the new display function
        });
}

function displayMembers(members) {
    let membersList = document.getElementById('membersList');
    membersList.innerHTML = ''; // Clear existing members

    members.forEach(member => {
        let memberItem = document.createElement('div');
        memberItem.innerHTML = `
            <p>
                <strong>Name:</strong> ${member.name}<br />
                <strong>Age:</strong> ${member.age}<br />
                <strong>Gender:</strong> ${member.gender}<br />
                <strong>Phone:</strong> ${member.phone}<br />
                <strong>Email:</strong> ${member.email}<br />
                <strong>Membership Type:</strong> ${member.membershipType}<br />
                <button onclick="editMember(${member.id})">Edit</button>
                <button onclick="deleteMember(${member.id})">Delete</button>
            </p>
            <hr />
        `;
        membersList.appendChild(memberItem);
    });
}
    
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^\+?\d{10,15}$/;

    function addOrUpdateMember (){
        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let gender = document.getElementById('gender').value;
        let phone = document.getElementById('phone').value;
        let email = document.getElementById('email').value;
        let membershipType = document.getElementById('membershipType').value;

        if (!name || !age || !gender || !phone || !email || !membershipType) {
            alert("All fields are required.");
            return false;
        }
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid phone number with 10-15 digits.");
            return false;
        }
        let transaction = db.transaction(["members"], "readwrite");
        let store = transaction.objectStore("members");

        if (editMemberId !== null) {
            let getRequest = store.get(editMemberId);
            getRequest.onsuccess = function () {
                let member = getRequest.result;
                member.name = name;
                member.age = parseInt(age);
                member.gender = gender;
                member.phone = phone;
                member.email = email;
                member.membershipType = membershipType;
                store.put(member);
                editMemberId = null;
             };
            } else {
                let newMember = {
                    name: name,
                    age: parseInt(age),
                    gender: gender,
                    phone: phone,
                    email: email,
                    membershipType: membershipType
                };
                store.add(newMember);
            }
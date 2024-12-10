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

    function addOrUpdateMember (){
        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let gender = document.getElementById('gender').value;
        let phone = document.getElementById('phone').value;
        let email = document.getElementById('email').value;
        let membershipType = document.getElementById('membershipType').value;
        let newMember = {
            name: name,
            age: age,
            gender: gender,
            phone: phone,
            email: email,
            membershipType: membershipType,
        };
    
        if (editingMemberId) {
            // If editing an existing member, send PUT request
            fetch(`${apiUrl}/${editingMemberId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMember),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Member updated:', data);
                    editingMemberId = null; // Clear the editing ID
                    clearForm(); // Clear the form after update
                    fetchMembers(); // Refresh the member list
                });
        } else {
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMember),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Member added:', data);
                    clearForm(); // Clear the form after adding
                    fetchMembers(); // Refresh the member list
                });
        }
    }
    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('gender').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('membershipType').value = '';
    }
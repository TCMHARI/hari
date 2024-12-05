let editMemberId = null;
let db;

document.addEventListener("DOMContentLoaded", function () {
    let request = indexedDB.open("memberDatabase", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("members")) {
            db.createObjectStore("members", { keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Database opened successfully");
        renderMembers();
    };

    request.onerror = function (event) {
        console.error("Database error: ", event.target.errorCode);
    };

    
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
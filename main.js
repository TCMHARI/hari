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
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
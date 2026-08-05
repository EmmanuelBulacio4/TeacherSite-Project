import { displayDates } from "./date.mjs";
displayDates(); 

let counter = 0;
window.addEventListener('DOMContentLoaded', function() {
    const label = document.querySelector("strong");
    const rev = localStorage.getItem("opinions-did"); 
    if ((parseInt(rev) === 0) || (rev === NaN) || (rev === null)){ 
        counter++;                          
        localStorage.setItem("opinions-did", counter);
        label.textContent = counter;
    }
    else {
        counter = parseInt(rev);
        counter ++;
        localStorage.setItem("opinions-did", counter);
        label.textContent = counter;
    }
});



//Info brom broser tab

const teacherRev = new URLSearchParams(window.location.search);

document.querySelector('#message').innerHTML = `
    <p>You rated us with ${teacherRev.get('punctuation')} stars!!!</p>
    <p>We shall improve our service with you review: <p>
    <p>"${teacherRev.get('wreview')}"</p>`

export function displayDates() {
    const today = new Date();
    const year = today.getFullYear();
    
    const yearElement = document.querySelector("#currentyear");
    if (yearElement) yearElement.textContent = year;

    let lastModification = new Date(document.lastModified);
    const modifiedElement = document.getElementById("lastModified");
    if (modifiedElement) {
        modifiedElement.textContent = lastModification.toLocaleDateString("en-US");
    }
}
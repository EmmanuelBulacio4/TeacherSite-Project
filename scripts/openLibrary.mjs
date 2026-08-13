export async function searchBooks(query) {
    const resultsList = document.getElementById("resultsListBook");
    const spinner = document.getElementById("spinner");
    const searchButton = document.getElementById("searchButton");

    resultsList.innerHTML = "";
    spinner.classList.remove("hidden");
    searchButton.disabled = true;

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();


        if (!data.docs || data.docs.length === 0) {
            resultsList.innerHTML = '<li>No books found. Try again.</li>';
            return;
        }

        data.docs.forEach(book => {
            const title = book.title || "No title";
            const author = book.author_name ? book.author_name.join(', ') : "Unknown Author";
            const year = book.first_publish_year || "No year info";
            const coverImg = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                : 'images/nocover.jpg';

            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.marginBottom = '12px';
            li.innerHTML = `
            <img src="${coverImg}" alt="${title}" style="width: 45px; height: 60px; margin-right: 12px; object-fit: cover;">
            <div>
                <strong>${title}</strong> (${year})<br>
                <small>Author: ${author}</small>
            </div>`;

            resultsList.appendChild(li);
        });

    } catch (error) {
        console.error('Error querying Open Library:', error);
        resultsList.innerHTML = '<li>Error while looking for your book</li>';
    } finally {
        spinner.classList.add("hidden");
        searchButton.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const bookInput = document.getElementById('bookInput');

    if (searchButton && bookInput) {
        searchButton.addEventListener('click', () => {
            const query = bookInput.value.trim();
            if (query !== '') {
                searchBooks(query);
            }
        });

        bookInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = bookInput.value.trim();
                if (query !== '') {
                    searchBooks(query);
                }
            }
        });
    }
});
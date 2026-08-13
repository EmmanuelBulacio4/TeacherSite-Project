async function buscarLibros(query) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '<li>Buscando...</li>';

    // Construimos la URL con el término codificado
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        resultsList.innerHTML = '';

        if (data.docs.length === 0) {
            resultsList.innerHTML = '<li>No se encontraron libros.</li>';
            return;
        }

        // Recorremos cada libro devuelto
        data.docs.forEach(book => {
            const title = book.title || 'Sin título';
            const author = book.author_name ? book.author_name.join(', ') : 'Autor desconocido';
            const year = book.first_publish_year || 'Año N/A';

            // Portada del libro (si tiene cover_i)
            const coverImg = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                : 'https://via.placeholder.com/40x60?text=No+Cover';

            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.marginBottom = '12px';
            li.innerHTML = `
            <img src="${coverImg}" alt="${title}" style="width: 45px; height: 60px; margin-right: 12px; object-fit: cover;">
            <div>
                <strong>${title}</strong> (${year})<br>
                <small>Autor: ${author}</small>
            </div>`;
            resultsList.appendChild(li);
        });

    } catch (error) {
        console.error('Error al consultar Open Library:', error);
        resultsList.innerHTML = '<li>Ocurrió un error al realizar la búsqueda.</li>';
    }
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query.trim() !== '') {
        buscarLibros(query);
    }
});

// JSON DEVUELTO POR LA API
// {
//     "numFound": 1420,
//         "start": 0,
//             "numFoundExact": true,
//                 "docs": [
//                     {
//                         "key": "/works/OL82586W",
//                         "title": "Harry Potter and the Philosopher's Stone",
//                         "author_name": [
//                             "J. K. Rowling"
//                         ],
//                         "first_publish_year": 1997,
//                         "isbn": [
//                             "9780747532699",
//                             "0747532699"
//                         ],
//                         "cover_i": 10521270,
//                         "language": [
//                             "eng",
//                             "spa"
//                         ]
//                     }
//                 ]
// }
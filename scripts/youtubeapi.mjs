

export async function findVideos(query) {

    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value;
        if (query.trim() !== '') {
            findVideos(query);
        }
    });

    const API_KEY = "AIzaSyAaszrGAhGYmyn8DXt9zkCO5J4A-2FkShY";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=6&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const resultsList = document.getElementById('resultsList');
        resultsList.innerHTML = '';

        data.items.forEach(item => {
            const videoTitle = item.snippet.title;
            const videoId = item.id.videoId;
            const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
            const thumbnailUrl = item.snippet.thumbnails.default.url;

            const li = document.createElement('li');
            li.style.marginBottom = '10px';
            li.innerHTML = `
            <img src="${thumbnailUrl}" alt="${videoTitle}" style="vertical-align: middle; margin-right: 10px;">
            <a href="${videoUrl}" target="_blank"><strong>${videoTitle}</strong></a>`;
            resultsList.appendChild(li);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}


// JSON
// {
//     "kind": "youtube#videoListResponse",
//     "etag": "a_1b2c3d4e5f...",
//     "pageInfo": {
//         "totalResults": 1,
//         "resultsPerPage": 1
//     },
//     "items": [
//         {
//             "kind": "youtube#video",
//             "etag": "x_9y8z7w6v...",
//             "id": "dQw4w9WgXcQ",
//             "snippet": {              //video metadata!!! 
//                 "publishedAt": "2009-10-25T06:57:33Z",
//                 "channelId": "UCuAXFkgai1x3BNIT4J92mcA",
//                 "title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
//                 "description": "The official video for “Never Gonna Give You Up” by Rick Astley...",
//                 "thumbnails": {
//                     "default": {
//                         "url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
//                         "width": 120,
//                         "height": 90
//                     },
//                     "high": {
//                         "url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
//                         "width": 480,
//                         "height": 360
//                     }
//                 },
//                 "channelTitle": "Rick Astley",
//                 "tags": ["Rick Astley", "Never Gonna Give You Up", "Pop"],
//                 "categoryId": "10",
//                 "liveBroadcastContent": "none",
//                 "defaultAudioLanguage": "en"
//             },
//             "statistics": {
//                 "viewCount": "1550123400",
//                 "likeCount": "17203400",
//                 "favoriteCount": "0",
//                 "commentCount": "2103400"
//             }
//         }
//     ]
// };


// kind: Identifica el tipo de recurso que devolvió la API.

// items: array of videos.

// id: (video ID, channel or paylist)
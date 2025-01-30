const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => filterResults(result, searchTerm));
}

function filterResults(result, searchTerm) {
    const filteredResult = result.filter(artist => artist.name.toLowerCase().startsWith(searchTerm));
    displayResults(filteredResult);
}

function displayResults(result) {
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    if (result.length > 0) {
        const element = result[0];
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
        resultArtist.classList.remove('hidden');
        resultPlaylist.classList.add("hidden");
    } else {
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
    }
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
        return;
    }
    
    requestApi(searchTerm);
});
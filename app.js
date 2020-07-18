let currentLocation = window.location;
let search = currentLocation.search;
console.log(search)
let trackName = document.getElementById("track-name")
let artists = document.getElementById("artists")
const clientId = "fbb75d3e11e44656917e9c6a9a9a301d";
const clientSecret = "9a94271741d547d9a365bf6327363156";
const encodedAuthString = btoa(clientId + ":" + clientSecret);
const songId = "7ytR5pFWmSjzHJIeQkgog4";

function getTrackName() {
    let formattedTrackName = search.replace("?", "")
    return formattedTrackName
}

function main() {
    fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: 'grant_type=client_credentials',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${encodedAuthString}`
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            fetch(`https://api.spotify.com/v1/search?q=${getTrackName()}`, {
                    headers: {
                        'Authorization': "Bearer " + data.access_token
                    }
                })
                .then(function(resp) {
                    return resp.json()
                })
                .then(function(data) {
                    trackName.innerHTML = data.tracks.items[0].name
                    artistsObj = data.tracks.items[0].artists
                    let artistsArray = [artistsObj.length]
                    for (let i = 0; i < artistsObj.length; i++) {
                        artistsArray[i] = data.tracks.items[0].artists[i].name
                    }
                    artists.innerHTML = artistsArray.join(", ")
                })
        })
}
console.log("hey")
main()
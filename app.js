const fetch = require("node-fetch");
const clientId = "fbb75d3e11e44656917e9c6a9a9a301d"
const clientSecret = "9a94271741d547d9a365bf6327363156"
const encodedAuthString = new Buffer(clientId + ":" + clientSecret).toString("base64");
songId = "7ytR5pFWmSjzHJIeQkgog4"

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
        console.log(data.access_token)

        fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
                headers: {
                    'Authorization': "Bearer " + data.access_token
                }
            })
            .then(function(resp) {
                return resp.json()
            })
            .then(function(data) {
                console.log(data.popularity)
            })
    })
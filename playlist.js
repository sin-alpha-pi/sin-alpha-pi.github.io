const clientId = "fbb75d3e11e44656917e9c6a9a9a301d";
const clientSecret = "9a94271741d547d9a365bf6327363156";
const encodedAuthString = btoa(clientId + ":" + clientSecret);

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
            var accessToken = data.access_token;
        });
}

function userAuth() {
    fetch(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=playlist-modify-private&state=34fFs29kd09`, { mode: 'cors' })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            console.log(data)
        })
}
main()
userAuth()
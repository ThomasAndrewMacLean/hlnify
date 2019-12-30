const ENDPOINT = 'https://b8egcrl0be.execute-api.eu-west-1.amazonaws.com/live';
const BUCKET = 'https://hlnify.s3-eu-west-1.amazonaws.com/';
const id = document.location.hash.replace('#', '');

fetch(BUCKET + id + '.txt')
    .then(x => x.text())
    .then(imageData => {
        document.getElementById('foto').src = imageData;
    });

fetch(ENDPOINT + '?id=' + id)
    .then(x => x.json())
    .then(y => {
        document.getElementById('title').innerText = y.title.S;
        document.getElementById('auteur').innerText = y.auteur.S;
        document.getElementById('datum').innerText = y.datum.S;
        document.getElementById('bron').innerText = y.bron.S;
        document.getElementById('facebook').innerText = y.facebook.S;
        document.getElementById('commentaren').innerText =
            y.commentaren.S + ' reacties';
    });

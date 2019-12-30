const ENDPOINT = 'https://b8egcrl0be.execute-api.eu-west-1.amazonaws.com/live';

const titleInput = document.getElementById('title-input');
const title = document.getElementById('title');

titleInput.addEventListener('keyup', () => {
    title.innerText = titleInput.value;
});

const auteurInput = document.getElementById('auteur-input');
const auteur = document.getElementById('auteur');

auteurInput.addEventListener('keyup', () => {
    auteur.innerText = auteurInput.value;
});

const datumInput = document.getElementById('datum-input');
const datum = document.getElementById('datum');
const options = { year: 'numeric', month: 'long', day: 'numeric' };

datumInput.addEventListener('change', () => {
    datum.innerText = new Date(datumInput.value).toLocaleDateString(
        'nl-be',
        options
    );
});

const bronInput = document.getElementById('bron-input');
const bron = document.getElementById('bron');

bronInput.addEventListener('keyup', () => {
    bron.innerText = 'Bron: ' + bronInput.value;
});

const facebookInput = document.getElementById('facebook-input');
const facebook = document.getElementById('facebook');

facebookInput.addEventListener('change', () => {
    facebook.innerText = facebookInput.value;
});

const commentarenInput = document.getElementById('commentaren-input');
const commentaren = document.getElementById('commentaren');

commentarenInput.addEventListener('change', () => {
    commentaren.innerText = commentarenInput.value + ' reacties';
});

const fotoInput = document.getElementById('foto-input');
const foto = document.getElementById('foto');

function readFile() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();

        FR.addEventListener('load', function(e) {
            foto.src = e.target.result;
            localStorage.setItem('base64Pic', e.target.result);
            console.log(e.target.result);
        });

        FR.readAsDataURL(this.files[0]);
    }
}

fotoInput.addEventListener('change', readFile);

const saveButton = document.getElementById('form');

saveButton.addEventListener('submit', e => {
    e.preventDefault();

    fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleInput.value,
            auteur: auteurInput.value,
            datum: new Date(datumInput.value).toLocaleDateString(
                'nl-be',
                options
            ),
            bron: bronInput.value,
            facebook: facebookInput.value,
            commentaren: commentarenInput.value,
            foto: localStorage.getItem('base64Pic')
        })
    })
        .then(y => y.json())
        .then(x => {
            window.location.href =
                window.location.origin + '/load#' + x.body.split('"').join('');
        });
});

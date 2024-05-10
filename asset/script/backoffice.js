const annoCorrente = new Date().getFullYear();
document.getElementById('anno').innerText = annoCorrente;

class Product {
    constructor(_name, _description, _brand, _imageUrl, _price ){
        this.name= _name;
        this.description= _description; 
        this.brand= _brand; 
        this.imageUrl= _imageUrl; 
        this.price= _price; 
     }
}

const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get('productId');
console.log('productId?', productId);

let productToModify;

const getProduct = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + productId, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjA5ZDgxODQ0MjAwMTUzNzU5NTQiLCJpYXQiOjE3MTUzMzUzMjUsImV4cCI6MTcxNjU0NDkyNX0.wZ3hfU8HAyPsKxQ-a1qRIcoyw6mdDXO4vjssqsD8jqo"
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            switch (response.status) {
                case 401:
                    throw new Error("Errore 401: Non autorizzato. Assicurati di avere le credenziali corrette.");
                case 403:
                    throw new Error("Errore 403: Accesso negato. Non hai i permessi per accedere a questa risorsa.");
                case 404:
                    throw new Error("Errore 404: Risorsa non trovata. Verifica l'URL e riprova.");
                case 500:
                    throw new Error("Errore 500: Errore interno del server. Riprova più tardi.");
                case 502:
                    throw new Error("Errore 502: Il server ha ricevuto una risposta non valida.");
                case 503:
                    throw new Error("Errore 503: Il server non è attualmente disponibile (sovraccarico o in manutenzione).");
                case 504:
                    throw new Error("Errore 504: Il server ha impiegato troppo tempo a rispondere.");
                default:
                    if (response.status >= 400 && response.status < 500) {
                        throw new Error(`Errore client ${response.status}: ${response.statusText}`);
                    } else if (response.status >= 500 && response.status < 600) {
                        throw new Error(`Errore server ${response.status}: ${response.statusText}`);
                    }
                    throw new Error(`${response.status}: ${response.statusText}`);
            }
        }
    })
    .then(product => {
        console.log('DETTAGLI RECUPERATI', product);
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('brand').value = product.brand;
        document.getElementById('imgUrl').value = product.imageUrl;
        document.getElementById('price').value = product.price;

        productToModify = product;
    })
    .catch((err) => {
        console.error("ERRORE!", err.message);
        alert(`An error occurred: ${err.message}`);
    });
};

if (productId) {
    getProduct();
    document.getElementsByClassName('btn-danger')[0].innerText = 'MODIFICA!';

    const buttonReset = document.createElement('button');
    buttonReset.textContent = 'Reset ';
    buttonReset.classList.add('bg-success', 'text-white', 'rounded', 'border-0');
    buttonReset.addEventListener('click', function () {
        if (confirm('Sei sicuro di voler resettare il form?')) {
            document.getElementById('productName').value = '';
            document.getElementById('productDescription').value = '';
            document.getElementById('brand').value = '';
            document.getElementById('imgUrl').value = '';
            document.getElementById('price').value = '';
        }
    });
    document.getElementById('containerButton').appendChild(buttonReset);
}

const submitProduct = function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('productName');
    const descriptionInput = document.getElementById('productDescription');
    const brandInput = document.getElementById('brand');
    const imgUrlInput = document.getElementById('imgUrl');
    const priceInput = document.getElementById('price');

    const productFromForm = new Product (
        nameInput.value,
        descriptionInput.value,
        brandInput.value, 
        imgUrlInput.value, 
        priceInput.value 
    );

    let URL = 'https://striveschool-api.herokuapp.com/api/product/';
    let methodToUse = 'POST';

    if (productId) {
        URL = `https://striveschool-api.herokuapp.com/api/product/${productToModify._id}`;
        methodToUse = 'PUT';
    }

    fetch(URL, {
        method: methodToUse,
        body: JSON.stringify(productFromForm),
        headers: {
            'Content-type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjA5ZDgxODQ0MjAwMTUzNzU5NTQiLCJpYXQiOjE3MTUzMzU5OTAsImV4cCI6MTcxNjU0NTU5MH0.I2gFbbRsgue74Lk093800JL4d9INqqCeJmkxAjZE0FM"
        },
    })
    .then((response) => {
        if (response.ok) {
            if (!productId) {
                alert(`Prodotto creato!`);
            } else {
                alert(`Prodotto modificato!`);
            }
        } else {
            throw new Error('Errore nel salvataggio della risorsa');
        }
    })
    .catch((err) => {
        console.error("ERRORE!", err.message);
        alert(`An error occurred: ${err.message}`);
    });
};

document.getElementById('myForm').addEventListener('submit', submitProduct);

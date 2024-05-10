const annoCorrente = new Date().getFullYear();
document.getElementById('anno').innerText = annoCorrente;

const urlParams = new URLSearchParams(location.search);
const productId = urlParams.get('productId');

const getProductData = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {

      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjA5ZDgxODQ0MjAwMTUzNzU5NTQiLCJpYXQiOjE3MTUzMzUzMjUsImV4cCI6MTcxNjU0NDkyNX0.wZ3hfU8HAyPsKxQ-a1qRIcoyw6mdDXO4vjssqsD8jqo"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        switch (response.status) {
          case 401:
            throw new Error(
              "Errore 401: Non autorizzato. Assicurati di avere le credenziali corrette."
            );
          case 403:
            throw new Error(
              "Errore 403: Accesso negato. Non hai i permessi per accedere a questa risorsa."
            );
          case 404:
            throw new Error(
              "Errore 404: Risorsa non trovata. Verifica l'URL e riprova."
            );
          case 500:
            throw new Error(
              "Errore 500: Errore interno del server. Riprova più tardi."
            );
          case 502:
            throw new Error(
              "Errore 502: Il server ha ricevuto una risposta non valida."
            );
          case 503:
            throw new Error(
              "Errore 503: Il server non è attualmente disponibile (sovraccarico o in manutenzione)."
            );
          case 504:
            throw new Error(
              "Errore 504: Il server ha impiegato troppo tempo a rispondere."
            );
          default:
            if (response.status >= 400 && response.status < 500) {
              throw new Error(
                `Errore client ${response.status}: ${response.statusText}`
              );
            } else if (response.status >= 500 && response.status < 600) {
              throw new Error(
                `Errore server ${response.status}: ${response.statusText}`
              );
            }
            throw new Error(`${response.status}: ${response.statusText}`);
        }
      }
    })
    .then((product) => {
      console.log('DETTAGLI RECUPERATI', product);
      document.getElementById('imageUrl').setAttribute('src', product.imageUrl);
      document.getElementById('name').innerText = product.name;
      document.getElementById('description').innerText = product.description;
      document.getElementById('brand').innerText = product.brand;
      document.getElementById('price').innerText = product.price + '€';
    })
    .catch((err) => {
      console.log('ERRORE', err);
    });
};

getProductData();

const deleteProduct = function () {
  // Chiedi conferma prima di eliminare il prodotto
  if (confirm('Sei sicuro di voler eliminare il prodotto?')) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjA5ZDgxODQ0MjAwMTUzNzU5NTQiLCJpYXQiOjE3MTUzMzUzMjUsImV4cCI6MTcxNjU0NDkyNX0.wZ3hfU8HAyPsKxQ-a1qRIcoyw6mdDXO4vjssqsD8jqo"
      }
    })
      .then((response) => {
        if (response.ok) {
          alert('Prodotto eliminato con successo');
          location.assign('index.html');
        } else {
          switch (response.status) {
            case 401:
              throw new Error(
                "Errore 401: Non autorizzato. Assicurati di avere le credenziali corrette."
              );
            case 403:
              throw new Error(
                "Errore 403: Accesso negato. Non hai i permessi per accedere a questa risorsa."
              );
            case 404:
              throw new Error(
                "Errore 404: Risorsa non trovata. Verifica l'URL e riprova."
              );
            case 500:
              throw new Error(
                "Errore 500: Errore interno del server. Riprova più tardi."
              );
            case 502:
              throw new Error(
                "Errore 502: Il server ha ricevuto una risposta non valida."
              );
            case 503:
              throw new Error(
                "Errore 503: Il server non è attualmente disponibile (sovraccarico o in manutenzione)."
              );
            case 504:
              throw new Error(
                "Errore 504: Il server ha impiegato troppo tempo a rispondere."
              );
            default:
              if (response.status >= 400 && response.status < 500) {
                throw new Error(
                  `Errore client ${response.status}: ${response.statusText}`
                );
              } else if (response.status >= 500 && response.status < 600) {
                throw new Error(
                  `Errore server ${response.status}: ${response.statusText}`
                );
              }
              throw new Error(`${response.status}: ${response.statusText}`);
          }
        }
      })
      .catch((err) => {
        console.error("ERRORE!", err.message);
        alert(`An error occurred: ${err.message}`);
      });
  }
};


const editButton = document.getElementById('edit-button');
editButton.addEventListener('click', function () {
  location.assign(`backoffice.html?productId=${productId}`)
});

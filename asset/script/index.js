//anno corrente sul footer

const annoCorrente = new Date().getFullYear()
document.getElementById('anno').innerText = annoCorrente

///spinner

window.addEventListener('load', () => {
  // Rimuovi il loader
  const loader = document.querySelector('.spinner-border');
  loader.parentNode.removeChild(loader);
});

//generiamo le card 

const generateConcertCards = function (correntArray){
    const row= document.getElementById('events-row')
    correntArray.forEach((product) => {
        const newCol= document.createElement('div')
            newCol.classList.add('col')
            newCol.innerHTML=`
            <div class="card h-100 d-flex flex-column">
              <img src="${product.imageUrl}" class="card-img-top" " alt="...">
              <div class="card-body d-flex flex-column justify-content-around">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text" id="descrizionePrimaPagina" >${product.description}</p>
                  <p class="card-text" >${product.brand}</p>
                  <p class="card-text fs-3 text fw-bold">${product.price}€</p>
                  <div class= d-flex justify-content-between>
                    <button class="border border-0 bg-white"><a href="product.html?productId=${product._id}" class="btn"  id=bottoneScopri>Scopri di più!</a></button>
                    <button class="border border-0 bg-white "><a href="Backoffice.html?productId=${product._id}" class="btn" id="bottomeModifica">Modifica</a></button>
                  </div>
               </div>
            </div>
            `
            row.appendChild(newCol)
    });

}

const getProduct = function () {
    //  recuperiamo la lista di eventi attualmente nel database
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {

      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZjA5ZDgxODQ0MjAwMTUzNzU5NTQiLCJpYXQiOjE3MTUzMzUzMjUsImV4cCI6MTcxNjU0NDkyNX0.wZ3hfU8HAyPsKxQ-a1qRIcoyw6mdDXO4vjssqsD8jqo"
      }
      })
      .then((response) => {
        if (response.ok) {
          console.log("OK", response);
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
      .then((array) => {
        console.log('ARRAY!', array)
        // creiamo le card per la landing page
        generateConcertCards(array)
      })
      .catch((err) => {
        console.error("ERRORE!", err.message);
        alert(`An error occurred: ${err.message}`);
      });
  }
  
  getProduct()
  
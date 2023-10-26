//Aggiunge un evento che si attiva quando il DOM viene caricato
//	e richiama la funzione onAllLoaded
document.addEventListener("DOMContentLoaded", onAllLoaded);

//Definizione di una funzione che prende in input un argomento
function onAllLoaded(event) {
	//Stampa in console un messaggio
	console.log("DOM loaded");
}
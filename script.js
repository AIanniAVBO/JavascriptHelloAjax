//Aggiunge un evento che si attiva quando il DOM viene caricato
//	e richiama la funzione onAllLoaded
document.addEventListener("DOMContentLoaded", onAllLoaded);
//Crea una variabile globale, quindi visibile in tutto il codice, di nome table
var table;
//Crea una variabile globale, in cui inserirà il paragrafo (p) con id demo
var demo;
//Definizione di una funzione che prende in input un argomento
function onAllLoaded(event) {
	//Stampa in console un messaggio
	console.log("DOM loaded");
	
	//Ricerca la table all'interno del DOM e la salva nella variabile creata in precedenza
	table = document.getElementById("wordsTable");
	//Ottiene un array con dentro tutti i figli di table aventi il come tag td
	let allTDs = table.getElementsByTagName('td');
	//Stampa tutti i td
	console.log(allTDs);
	
	//Salva il paragrafo con ID demo per fare in modo di poterlo modificare più avanti nel codice
	demo = document.getElementById("demo");
}

//Funzione da chiamare quando viene premuto su un TD
function tdClicked(event) {
	//Estrae il testo da TD
	let cellText = event.srcElement.innerText;
	//Lo concatena con il testo contenuto dentro demo facendo in modo che venga
	//	separato da uno spazio
	demo.innerText = [demo.innerText, cellText].join(" ");
}
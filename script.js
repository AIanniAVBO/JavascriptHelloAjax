//Aggiunge un evento che si attiva quando il DOM viene caricato
//	e richiama la funzione onAllLoaded
document.addEventListener("DOMContentLoaded", onAllLoaded);
//Crea una variabile globale, quindi visibile in tutto il codice, di nome table
var table;
//Crea una variabile globale, in cui inserirà il paragrafo (p) con id demo
var demo;

//Crea una variabile costante, che non può essere alterata, per rappresentare il numero di righe
const rows = 5;
//Crea una variabile costante, che non può essere alterata, per rappresentare il numero di colonne
const cols = 8;

//Definizione di una funzione che prende in input un argomento
function onAllLoaded(event) {
	//Stampa in console un messaggio
	console.log("DOM loaded");
	
	//Ricerca la table all'interno del DOM e la salva nella variabile creata in precedenza
	table = document.getElementById("wordsTable");
	
	//Salva il paragrafo con ID demo per fare in modo di poterlo modificare più avanti nel codice
	demo = document.getElementById("demo");
	
	//Ricerca il tasto resetButton e associa al click la funzione resetText
	document.getElementById("resetButton").addEventListener("click", resetText);
	
	//Crea una richiesta HTTP
	var xhttp = new XMLHttpRequest();
	//Indica che al termine della richiesta deve chiamare la funzione requestDone
	xhttp.onreadystatechange = requestDone;
	//Indica che vuole eseguire una richiesta GET all'URL dell'API dove passa
	//	come parametri (dopo il ?) la lingua italiana (lang=it) e il numero di parole
	//	che vuole in output (in questo caso righe X colonne)
	//	Il true alla fine significa che la richiesta è asincrona, quindi non
	//	blocca l'esecuzione, ma viene eseguita in un altro thread
	xhttp.open("GET", "https://random-word-api.herokuapp.com/word?lang=it&number=" + (rows * cols), true);
	//Invia la richiesta al server HTTP, quando la risposta sarà pronta 
	//	verrà chiamata la funzione requestDone, come impostato in precedenza
	xhttp.send();
}

//Funzione da chiamare quando viene premuto su un TD
function tdClicked(event) {
	//Estrae il testo da TD
	let cellText = event.srcElement.innerText;
	//Lo concatena con il testo contenuto dentro demo facendo in modo che venga
	//	separato da uno spazio
	demo.innerText = [demo.innerText, cellText].join(" ");
}

//Funzione che effettua imposta un testo vuoto dentro demo
function resetText() {
	//Imposta un testo vuoto dentro demo
	demo.innerText = "";
}

//Funzione che prende in input la dimensione di una tabella (righe e colonne) e
//	un array grande almeno rows*cols e copia tutto il suo
//	contenuto dentro la tabella presente nella variabile table
function composeTable(rows, cols, wordsArray) {
	//Per ogni riga
	for (let r = 0; r < rows; ++r) {
		//Crea una riga e l'aggiunge nella tabella, come argomento
		//	prende la posizione in cui si vuole inserire la riga
		//	dove -1 significa in coda (crea una nuova riga in basso)
		let row = table.insertRow(-1);
		//Per ogni colonna
		for (let c = 0; c < cols; ++c) {
			//Crea una cella e l'aggiunge alla riga creata poco prima
			//	la funzione prende come argomento la colonna in cui si
			//	vuole inserire la cella, dove -1 significa alla fine
			//	(aggiunge una nuova cella a destra)
			let cell = row.insertCell(-1);
			//Inserisce come contenuto della cella appena creata una
			//	parola presa dall'array, la moltiplicazione serve
			//	a saltare tutte le parole contenute nelle righe precedenti
			//	mentre c è l'indice della riga corrente
			cell.innerHTML = wordsArray[r*cols + c];
			//Aggiunge un evento alla cella appena creata che richiama la
			//	funzione scritta in precedenza che prendeva il testo della
			//	cello e lo andava a copiare dentro info
			cell.addEventListener("click", tdClicked);
		}
	}
}

//Funzione richiama al termine di una richiesta HTTP, in argomento viene
//	passata l'evento che ha generato la chiamata a funzione
function requestDone(eventDescription) {
	//Estrae la richiesta HTTP dall'evento dall'evento, che in
	//	questo caso rappresenta la sorgente stessa dell'evento
	let httpRequest = eventDescription.srcElement;
	//Se la richiesta è completata (stato 4) e la risposta ha restituito
	//	il codice di stato 200 OK
	if (httpRequest.readyState == 4 && httpRequest.status == 200) {
		//Viene effettuato il parsing della risposta
		//	(ci si aspetta un array contenente rows * cols parole)
		const wordsArray = JSON.parse(httpRequest.responseText);
		//Viene chiamata la funzione per creare le righe e le celle
		//	della tabella scritta in precedenza
		composeTable(rows, cols, wordsArray);
	} 
}
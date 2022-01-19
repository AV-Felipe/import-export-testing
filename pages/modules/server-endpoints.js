import { generateInvoiceRow } from "./elements-generators.js";

const outputInvoiceList = document.getElementById('invoiceList');

let currentList = [];

// GET - Get existing invoices
function loadInvoices(){
    outputInvoiceList.innerHTML = "";

    fetch('/database')
    .then(response => response.json())
    .then(data => {
        currentList = [];
        data.map(element =>{
            outputInvoiceList.innerHTML += generateInvoiceRow(element);
            currentList.push(element);
        })
    })
}

// POST - send a new invoice to the server
function sendNewInvoice(customerName, dueDateValue, invoiceValue, idValue, dateValue) {
    
    //create object with data to be passed as json
    const bodyData = {customer: customerName, dueDate: dueDateValue, value: invoiceValue, idNumber: idValue, issueDate: dateValue};

    //by default the fetch method perfoms a GET here we will make a post
    //for that we pass an object as the second argument in the fetch method
    // containing the desired http method, headers and body- view https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(`/database`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData) //generates the json from our object
    })
}

export {loadInvoices, sendNewInvoice, currentList};
import { invoice } from "./classes/invoice.js";
import { sendNewInvoice } from "./server-endpoints.js";

const inputFieldCustomerName = document.getElementById('customerName');
const inputFieldDueDate = document.getElementById('dueDate');
const inputFieldBaseValue = document.getElementById('baseValue');
const formInputInvoice = document.getElementById('invoiceInputForm');

//check if input fields are filled, add values to mock db and render them on page list
function saveInvoice () {

    //removes any alert message
    if(document.querySelector("#invoiceInputForm-newInvoiceData legend span")){
        document.querySelector("#invoiceInputForm-newInvoiceData legend span").remove();
    }

    //create new element on mockDB
    if(inputFieldCustomerName.value === "" || inputFieldDueDate.value === "" || inputFieldBaseValue.value === ""){
        document.querySelector("#invoiceInputForm-newInvoiceData legend").innerHTML += `<span class="alertMessage"> ! todos os campos devem ser preenchidos ! </span>`;
    }else{
        const newInvoice = new invoice(inputFieldCustomerName.value, inputFieldDueDate.value, Number(inputFieldBaseValue.value));
        console.log(newInvoice);
        sendNewInvoice(newInvoice.customer, newInvoice.dueDate, newInvoice.value, newInvoice.idNumber, newInvoice.issueDate);
        //invoiceDB.push(newInvoice);
        //outputInvoiceList.innerHTML += generateInvoiceRow(invoiceDB[invoiceDB.length - 1]);
        formInputInvoice.reset();
    }
    
}

export {saveInvoice};
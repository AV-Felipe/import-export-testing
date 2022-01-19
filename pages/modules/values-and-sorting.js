import {currentList} from './server-endpoints.js';
import { generateInvoiceRow } from './elements-generators.js';

const outputInvoiceList = document.getElementById('invoiceList');
const outputSalesTotal = document.getElementById('salesTotal');

//calculate the late fee for all elements
function getCurrentValues () {
    //debugger;
    outputInvoiceList.innerHTML = "";
    currentList.forEach(invoice => {
        outputInvoiceList.innerHTML += generateInvoiceRow(invoice);
    });

    let indexCounter = 0;
    currentList.map(oneInvoice => {
        const stringDueDate = new Date(`${oneInvoice.dueDate} 00:00:00`); //case we dont pass thee time, with date, we get an timezone difference in our parsed date
        const stringCurrentDate = new Date();
        console.log(stringDueDate);
        console.log(stringCurrentDate);

        if(stringDueDate < stringCurrentDate){
            //get the number of due days
            //console.log('atrasado');
            let daysLate = stringCurrentDate.getTime() - stringDueDate.getTime(); //converts the timestamp to unix date value (the result is in miliseconds)
            //console.log(daysLate);
            daysLate = Math.floor(daysLate / (1000 * 3600 * 24)); //converts to days, ignoring hour fractions
            //console.log(daysLate);

            if(daysLate > 0){
                const fineValue = 0.02 * oneInvoice.value;
                const interestValue = (0.001 * oneInvoice.value) * daysLate;
                const currentValue = oneInvoice.value + fineValue + interestValue;
                console.log(currentValue);

                let documentCurrentValueList = document.querySelectorAll('#invoiceList tr .invoiceCurrentValue');
                let documentLateFeeList = document.querySelectorAll('#invoiceList tr .invoiceLateFee');
                documentCurrentValueList[indexCounter].innerHTML = currentValue.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
                documentLateFeeList[indexCounter].innerHTML = (fineValue + interestValue).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
            }
            
        }else{
            console.log('em dia');
        }

        indexCounter++
    });
};


// Arrange invoices by customers name
//I could use the index value from the for each function, also i could implement a logic similar to the one used for the last element
//in handling all array elements
function sortByCustomerName () {
    //sort elements in the array
    currentList.sort(compareInvoiceNames);
    //console.log(currentList);

    //render array elements on page with total debt for each customer
    outputInvoiceList.innerHTML = "";

    let clientValue =[currentList[0].value]; //array, outside of the for each context, for managing the values for each customer
    currentList.forEach(invoice => {
        //debugger;

        //check if the current invoice customer is diferent from the previous, in which case creates a line for the total of
        //the previous customer, generates the total with the values from the clientValue array, and clear this array content
        //to store the values for the next customer
        if(currentList.indexOf(invoice) != 0){
            if(invoice.customer.toUpperCase() != currentList[currentList.indexOf(invoice)-1].customer.toUpperCase()){
                outputInvoiceList.innerHTML += `
                <tr class="newInvoice">
                    <td class="invoiceNumber"></td>
                    <td class="invoiceIssueDate"></td>
                    <td class="invoiceCustomer">${currentList[currentList.indexOf(invoice)-1].customer}</td>
                    <td class="invoiceMainValue">${clientValue.reduce((a,b) => {return(a+b);}).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</td>
                    <td class="invoiceDueDate"></td>
                    <td class="invoiceCurrentValue"></td>
                    <td class="invoiceLateFee"></td>
                </tr>
                `;
                clientValue = [];
                clientValue = [invoice.value];
            }else{
                clientValue.push(invoice.value);
            }
        }
        
        //checks if the current invoice is the last one, if so, generates the total line for the current customer
        if(currentList.indexOf(invoice) === (currentList.length -1)){
            outputInvoiceList.innerHTML += generateInvoiceRow(invoice);
            outputInvoiceList.innerHTML += `
                <tr class="newInvoice">
                    <td class="invoiceNumber"></td>
                    <td class="invoiceIssueDate"></td>
                    <td class="invoiceCustomer">${currentList[currentList.indexOf(invoice)].customer}</td>
                    <td class="invoiceMainValue">${clientValue.reduce((a,b) => {return(a+b);}).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</td>
                    <td class="invoiceDueDate"></td>
                    <td class="invoiceCurrentValue"></td>
                    <td class="invoiceLateFee"></td>
                </tr>
                `
        }else{
            outputInvoiceList.innerHTML += generateInvoiceRow(invoice);
        }
        
        
    });
}

//compare names sort function
function compareInvoiceNames (nameA, nameB) {
    if(nameA.customer.toUpperCase() < nameB.customer.toUpperCase()){
        return -1;
    }
    if (nameA.customer.toUpperCase() > nameB.customer.toUpperCase()){
        return 1;
    }

    return 0;
}


// sort invoices by due date
function sortByDueDate () {
    currentList.sort(compareInvoiceDate);
    console.log(currentList);

    outputInvoiceList.innerHTML = "";

    currentList.forEach(invoice => {
        outputInvoiceList.innerHTML += generateInvoiceRow(invoice);
    });
}

//compare date sort function
function compareInvoiceDate (dateA, dateB) {
    const a = new Date(`${dateA.dueDate} 00:00:00`);
    const b = new Date(`${dateB.dueDate} 00:00:00`);
    
    if(a < b) {
        return-1;
    }
    if(a > b) {
        return 1;
    }
    return 0;
}

//calculates the total of sales
function getTotalSales () {
    let totalSalesValue;
    let salesValueArray = currentList.map((a) => {
        return(a.value);
    });

    totalSalesValue = salesValueArray.reduce((a, b) => {
        return (a + b);
    });

    console.log(totalSalesValue);
    outputSalesTotal.innerHTML = totalSalesValue.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'});
}

export {getCurrentValues, sortByCustomerName, sortByDueDate, getTotalSales};
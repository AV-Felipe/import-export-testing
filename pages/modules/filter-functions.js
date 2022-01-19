import {currentList} from './server-endpoints.js';
import { generateInvoiceRow } from './elements-generators.js';

const outputInvoiceList = document.getElementById('invoiceList');

//Filter by value range

function filterByValueRange() {
    let filteredArray = currentList.filter(valueRangeChecker);

    function valueRangeChecker(element) {
        const minValue = document.getElementById('minimumValueFilter').value;
        const maxValue = document.getElementById('maximumValueFilter').value;

        if(element.value >= minValue && element.value <= maxValue) {
            return true;
        }else{
            return false;
        }
    }

    outputInvoiceList.innerHTML = "";

    filteredArray.forEach(element => {
        outputInvoiceList.innerHTML += generateInvoiceRow(element);
    });

}

//Filter by date range

function filterByDateRange() {
    let filteredArray = currentList.filter(dateRangeChecker);

    function dateRangeChecker(element) {
        //debugger;
        const minValue = document.getElementById('minimumDueDateFilter').value;
        const maxValue = document.getElementById('maximumDueDateFilter').value;

        const givenDate = new Date (`${element.dueDate} 00:00:00`);
        const minDate = new Date(`${minValue} 00:00:00`);
        const maxDate = new Date (`${maxValue} 00:00:00`);
        

        if(givenDate >= minDate && givenDate <= maxDate) {
            return true;
        }else{
            return false;
        }
    }

    outputInvoiceList.innerHTML = "";

    filteredArray.forEach(element => {
        outputInvoiceList.innerHTML += generateInvoiceRow(element);
    });
}

export {filterByValueRange, filterByDateRange};
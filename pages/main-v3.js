// IMPORTS
import { loadInvoices, currentList } from "./modules/server-endpoints.js";
import { saveInvoice } from "./modules/data-input.js";
import { displayFilterMenu } from "./modules/filter-modal.js";
import { filterByValueRange, filterByDateRange } from "./modules/filter-functions.js";
import { getCurrentValues, sortByCustomerName, sortByDueDate, getTotalSales } from "./modules/values-and-sorting.js";

// ELEMENTS
const buttonGetData = document.getElementById('fetch-data');
const buttonAddInvoice = document.getElementById('addInvoice');

const buttonFilterByValueRange = document.getElementById('invoiceTable-valueFilterField-filterButton');
const buttonFilterByDateRange = document.getElementById('invoiceTable-dueDateFilterField-filterButton');

const buttonUpdateValue = document.getElementById('updateValues');

const buttonGetTotalSales = document.getElementById('getTotalValue');

const tableHeaderName = document.getElementById('clientNameColumn');
const tableHeaderDueDate = document.getElementById('dueDateColumnTitle');

const tableContainer = document.getElementById('listSystem');

const dueDateModal = document.getElementById('invoiceTable-dueDateFilterField');
const dueDateColumnHeader = document.getElementById('dueDateColumnTitle');

const valueModal = document.getElementById('invoiceTable-valueFilterField');
const valueColumnHeader = document.getElementById('clientValueColumnTitle');

// EVENTS
buttonGetData.addEventListener('click', loadInvoices);
buttonAddInvoice.addEventListener('click', saveInvoice);

buttonFilterByValueRange.addEventListener('click', filterByValueRange);
buttonFilterByDateRange.addEventListener('click', filterByDateRange);

buttonUpdateValue.addEventListener('click', getCurrentValues);

tableHeaderName.addEventListener('click', sortByCustomerName);
tableHeaderDueDate.addEventListener('click', sortByDueDate);

buttonGetTotalSales.addEventListener('click', getTotalSales);

// FIRST RUN

loadInvoices();
console.log(currentList)

//for displaying the live search drop box
window.addEventListener('resize', ()=>{
    dueDateModal.style.left = dueDateColumnHeader.getBoundingClientRect().x + 'px';
    valueModal.style.left = valueColumnHeader.getBoundingClientRect().x + 'px';
});
tableContainer.addEventListener('scroll', ()=>{
    dueDateModal.style.left = dueDateColumnHeader.getBoundingClientRect().x + 'px';
    valueModal.style.left = valueColumnHeader.getBoundingClientRect().x + 'px';
});

/*
    Modules are local scoped, so anything declared within the module stays in the module
    the most adequate approach for calling functions on html elements interactions would be through 
    event listeners, but if we need to use an onclick hook, for instance, we can make the declaration
    a property of the window object - this will make the declaration global.
*/
window.displayFilterMenu = displayFilterMenu;
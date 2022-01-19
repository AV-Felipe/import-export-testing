function generateInvoiceRow (invoice) {
    return(
        `
        <tr class="newInvoice">
            <td class="invoiceNumber">${invoice.idNumber}</td>
            <td class="invoiceIssueDate">${invoice.issueDate}</td>
            <td class="invoiceCustomer">${invoice.customer}</td>
            <td class="invoiceMainValue">${invoice.value.toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})}</td>
            <td class="invoiceDueDate">${invoice.dueDate}</td>
            <td class="invoiceCurrentValue"></td>
            <td class="invoiceLateFee"></td>
        </tr>
        `
    );
};

export {generateInvoiceRow};
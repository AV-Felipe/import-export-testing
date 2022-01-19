class invoice {
    constructor (customer, dueDate, value) {
        this.customer = customer;
        this.dueDate = dueDate;
        this.value = value;
        this.idNumber = Date.now();
        this.issueDate = this.formatDate();
        this.lateFeeRules = lateFeeStandards.regularCustomer;
    }
    formatDate(){
        //debugger;
        let today = new Date();
        /*
        the next three lines of code may be comented do disble the utc time compensation, that is in need of some more tests
        for reference see: https://stackoverflow.com/questions/45779894/toisostring-changes-datetime-value
        and use: https://www.epochconverter.com/
        */

        let timeOffset = today.getTime(); //pega o horário deslocado para o utc 0 no formato timestamp do unix
        timeOffset = timeOffset - (today.getTimezoneOffset() * 60000); //ajusta o timestamp para o horário no utc do sistema mas mantendo a referÊncia utc 0

        today = new Date (timeOffset); //cria o objeto date com um horrário atrasado no utc local
        
        return(today.toISOString().split('T')[0]); //o método toISOString desloca o UTC para 0, o que é compensado pelo atraso da operação anterior
    }
};

// CONSTANT OBJECTS

const lateFeeStandards = {
    regularCustomer: {
        fine: 0.02,
        interest: 0.001,
        interestType: {calculationMethod: 'simple', basis: 'daily'}
    },
    
};

export {invoice};
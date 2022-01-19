//filter menu with modal

function displayFilterMenu(menuToShow) {
    
    //select the menu element related to the cliqued button and display it
    let menuArea = document.querySelector(`.dropdownMenu.${menuToShow}`);
    menuArea.style.display = 'flex';

    const dropDownButton = document.querySelector(`.dropdownMenuIcon.${menuToShow}`);
    dropDownButton.setAttribute('aria-expanded', 'true');

    //defines the table where the button is as the modal area
    const modal = document.getElementById(menuArea.parentNode.id);
    //creates an variable to reference the click inside or outside logic (when outside, removes the listenner we will create next)
    let eventReference = (event) => {
        const isInside = modal.contains(event.target);
        if(isInside){
            console.log('clicou dentro');
        }else{
            console.log('clicou fora');
            closeModal()
            document.removeEventListener('click', eventReference);
            dropDownButton.removeAttribute('aria-expanded');
        }
    };
    //adds an event listener to handle the clicks while the modal is showing
    document.addEventListener('click', eventReference)
    
}

function closeModal() {
    
    let menuArea = document.querySelectorAll('.dropdownMenu');

    menuArea.forEach(element => {
        if(window.getComputedStyle(element).display === 'flex'){
            element.style.display = 'none';
        }
    });

    
}

export {displayFilterMenu};
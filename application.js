
const API_URL= "http://localhost:5678/api/"

const fetchData= async (resource) => {
    const response = await fetch(API_URL+ resource);
    console.log(response);
    return  await response.json();

}


/*filtres*/ 
const buttonContainer = document.querySelector(".filters");
async function displayButtons  ()  {
    console.log(buttonContainer);
    const buttons = await fetchData("categories");
    
    for (i=0; i<buttons.length ; i++){
        const buttonData= buttons[i].name;
        const filterbutton = document.createElement('button');
        filterbutton.innerHTML = buttons[i].name;;
        filterbutton.classList.add('filter-button');
        buttonContainer.appendChild(filterbutton);

    }
    

}

displayButtons();

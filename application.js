
const API_URL = "http://localhost:5678/api/"

const fetchData = async (resource) => {
    const response = await fetch(API_URL + resource);
    return await response.json();

}


/*filtres*/

const buttonContainer = document.querySelector(".filters");
async function displayButtons() {
    const categoryList = await fetchData("categories");

    for (i = 0; i < categoryList.length; i++) {
        const category = categoryList[i];
        const filterbutton = document.createElement('button');
        filterbutton.dataset.category = category.id;
        filterbutton.innerHTML = category.name;
        filterbutton.classList.add('filter-button');
        buttonContainer.appendChild(filterbutton);

    }


}
displayButtons();


const listContainer = document.querySelector(".gallery");
const buttons = document.querySelectorAll('.filter-button');
console.log(buttons);
buttonContainer.addEventListener("click", (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttonActive = document.querySelector(".filter-button.active");
        buttonActive.classList.remove('active');
        event.target.classList.add('active');
        displayList(event.target.dataset.category);
    }

});



async function displayList(category = null) {
    let projects = await fetchData("works");
    if (category != null && category != "" )  {
        projects= projects.filter(project => {
         return project.category.id==category;
        })

    }
    listContainer.innerHTML = "";
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const figure = document.createElement("figure");
        const projectsImg = document.createElement("img");
        const figureCaption = document.createElement("figcaption");
        figure.appendChild(projectsImg);
        figure.appendChild(figureCaption);
        listContainer.appendChild(figure);
        projectsImg.src = project.imageUrl;
        projectsImg.alt = project.title;
        figureCaption.innerHTML = project.title;

    }
}
displayList(); 
 

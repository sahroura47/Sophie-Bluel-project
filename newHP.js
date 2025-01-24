
const API_URL = "http://localhost:5678/api/"

const fetchData= async(resource) =>{
    const response= await fetch(API_URL+resource);
    return await response.json();
}
 /* Display des images */

 const listContainer= document.querySelector(".gallery");

 async function displayList(category = null) {
    let projects = await fetchData("works");
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
        projectsImg.alt = "image chargée par l'API";
        figureCaption.innerHTML = project.title;

    }}
displayList(); 

 
const openModal=document.getElementById ('modalPopup');
const closeModal=document.getElementById('closeModal');
const modal=document.querySelector('.modal-container');
const popup=document.getElementById('modal');

openModal.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('nn');
    popup.style.display='flex'
    closeModal.style.display='flex'
});
closeModal.addEventListener('click', () => {
    popup.style.display='none';
});




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
    e.preventDefault();
    popup.style.display='flex';
    closeModal.style.display='flex';
   function disableScroll (){
    document.body.classList.add('body-no-scroll');
   }
   
   disableScroll ()
   displayListModal();
});
closeModal.addEventListener('click', () => {
    popup.style.display='none';
    function enableScroll (){
        document.body.classList.remove('body-no-scroll');
       }
       enableScroll ()
});

popup.addEventListener('click', (e) =>{
    if (e.target === popup){
    popup.style.display='none';
}
function enableScroll (){
    document.body.classList.remove('body-no-scroll');
   }
       enableScroll ()
})

/* display des images dans la modale */

async function displayListModal() {
    const galleryList= await fetchData('works');
    const galleryContainer=document.querySelector('.galleryModal');
    galleryContainer.innerHTML='';
    console.log(galleryContainer, galleryList);
    for (i=0; i<galleryList.length; i++) {
        const figure=document.createElement('div');
        figure.classList.add('figureContainer');
        const galleryImg=document.createElement('img');
        galleryImg.classList.add('galleryImg');
        galleryContainer.appendChild(figure);
        figure.appendChild(galleryImg);
        galleryImg.src=galleryList[i].imageUrl;
        galleryImg.alt=galleryList[i].title;
        const trashBin= document.createElement('i')
        trashBin.classList.add('fa-solid', 'fa-trash-can');
        figure.appendChild(trashBin);
        console.log(figure);

    }
    
}

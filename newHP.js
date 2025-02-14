
const API_URL = "http://localhost:5678/api/"

const fetchData = async (resource) => {
    const response = await fetch(API_URL + resource);
    return await response.json();
}
/* Display des images */

const listContainer = document.querySelector(".gallery");

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

    }
}

displayList();


const openModal = document.getElementById('modalPopup');
const closeModal = document.getElementById('closeModal');
const modal = document.querySelector('.modal-container');
const dialog = document.getElementById('modal');
firstModal= document.querySelector('.first-modal')

function disableScroll() {
    document.body.classList.add('body-no-scroll');
}

openModal.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.style.display = 'flex';
    dialogSwitch();



    disableScroll()
    displayListModal();
});

function enableScroll() {
    document.body.classList.remove('body-no-scroll');
};
closeModal.addEventListener('click', () => {
    enableScroll();
    dialog.style.display='none';
    

});

dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
        dialog.style.display = 'none';
        
    }
    enableScroll()
})

/* display des images dans la modale */

async function displayListModal() {
    const galleryList = await fetchData('works');
    const galleryContainer = document.querySelector('.galleryModal');
    galleryContainer.innerHTML = '';
    for (i = 0; i < galleryList.length; i++) {
        const figure = document.createElement('div');
        figure.classList.add('figureContainer');
        figure.id = 'figure' + galleryList[i].id;
        const galleryImg = document.createElement('img');
        galleryImg.classList.add('galleryImg');
        galleryContainer.appendChild(figure);
        figure.appendChild(galleryImg);
        galleryImg.src = galleryList[i].imageUrl;
        galleryImg.alt = galleryList[i].title;
        const trashBin = document.createElement('i')
        trashBin.classList.add('fa-solid', 'fa-trash-can');
        trashBin.dataset.id = galleryList[i].id;
        figure.appendChild(trashBin);
        console.log(figure);
        trashBin.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            deleteWork(id);
        })



    };

};
async function deleteWork(id) {
    const errorMessage = document.getElementById('error');
    let token = localStorage.getItem('authToken');
    try {
        const response = await fetch(API_URL + "works/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error();
        }

        document.getElementById('figure' + id).remove();
    } catch (error) {
        errorMessage.innerText = "erreur lors de la suppression"

    }
};

const addGallery=document.querySelector('.addPhotos');
const newModal= document.querySelector('.second-modal');
const pictosContainer= document.querySelector('.pictos');
const returnButton=document.querySelector('.return');
const close=document.getElementById('close');
addGallery.addEventListener('click', () =>{
    dialog.style.display = 'flex';
    newModal.style.display='flex';
    pictosContainer.style.display='flex';
    firstModal.style.display="none";

    disableScroll()
});
close.addEventListener('click', () => {
    dialog.style.display='none';
    enableScroll();
   

});
returnButton.addEventListener('click',() => {
    dialogSwitch();


});
function dialogSwitch (element="list"){
    if (element==="list") {
        console.log(element);
        firstModal.style.display="flex";
        newModal.style.display='none';

    } else { 
         firstModal.style.display="none";
        newModal.style.display='flex'; 
    }
};
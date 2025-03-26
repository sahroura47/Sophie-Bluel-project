
const API_URL = "http://localhost:5678/api/"

const fetchData = async (resource) => {
    const response = await fetch(API_URL + resource);
    return await response.json();
}
enableScroll();

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
firstModal = document.querySelector('.first-modal')

function disableScroll() {
    document.body.classList.add('body-no-scroll');
}

openModal.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.style.display = 'flex';
    dialogSwitch();
    reinitState();




    disableScroll()
    displayListModal();
});

function enableScroll() {
    document.body.classList.remove('body-no-scroll');
};
closeModal.addEventListener('click', () => {
    enableScroll();
    dialog.style.display = 'none';


});

dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
        dialog.style.display = 'none';
        reinitState();
        enableScroll()


    }
});

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
        trashBin.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            deleteWork(id);
        })



    };

};
let token = localStorage.getItem('authToken');
const errorMessage = document.getElementById('errorMessage');
async function deleteWork(id) {
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
        displayList();

        document.getElementById('figure' + id).remove();
    } catch (error) {
        errorMessage.innerText = "erreur lors de la suppression"

    }
};

const addGallery = document.querySelector('.addPhotos');
const newModal = document.querySelector('.second-modal');
const pictosContainer = document.querySelector('.pictos');
const returnButton = document.querySelector('.return');
const close = document.getElementById('close');
addGallery.addEventListener('click', () => {
    dialog.style.display = 'flex';
    newModal.style.display = 'flex';
    pictosContainer.style.display = 'flex';
    firstModal.style.display = "none";

    disableScroll()
});
close.addEventListener('click', () => {
    dialog.style.display = 'none';
    enableScroll();
    reinitState();
    displayList();



});
returnButton.addEventListener('click', () => {
    dialogSwitch();
    reinitState();
    disableScroll()

});
function dialogSwitch(element = "list") {
    if (element === "list") {
        firstModal.style.display = "flex";
        newModal.style.display = 'none';
        disableScroll();


    } else {
        firstModal.style.display = "none";
        newModal.style.display = 'flex';
    }
};

const selectBar = document.querySelector(".selectOption");
const validate=document.getElementById("submit");
async function categoryList() {
    const categoryFetch = await fetchData('categories');
    for (i = 0; i < categoryFetch.length; i++) {
        const option = document.createElement('option');
        const optionName = categoryFetch[i].name;
        option.value = categoryFetch[i].id;
        option.innerText = optionName;
        selectBar.appendChild(option);
validate.removeAttribute('disabled');

    }
};
categoryList();

const photoAdd = document.querySelector('.add');
const inputPhoto = document.getElementById('file');
const photoContainer = document.querySelector(".filCont1");
photoAdd.addEventListener('click', () => {
    inputPhoto.click();
});
const Newimage = document.getElementById('newImg');
inputPhoto.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    const file = selectedFile;
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgselected = document.getElementById('imgSelected');
            imgselected.src = e.target.result;
            Newimage.style.display = "flex";
            photoContainer.style.display = 'none';

        };
        reader.readAsDataURL(file);

    };
});
const inputField=document.getElementById('title');
const selector=document.getElementById("worksCategory");
function reinitState() {
    photoContainer.style.display = 'flex';
    Newimage.style.display = 'none';
    inputPhoto.value = '';
    errorMessage.innerText='';
    inputField.value='';
    selectBar.selectedIndex=0;

};

async function addForm(){
    const imageFile=document.getElementById('file').files[0];
    const title=document.getElementById('title').value;
    const category=document.getElementById('worksCategory').value;
    const formData=new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', imageFile);

    if (imageFile!== undefined  && title!=='' && category!==''){

        try{
            const response= await fetch(API_URL+ 'works', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+ token,
                    
                },
                body:formData
            });
            if (response.ok) {
                const successMsg=document.getElementById('successMessage');
                successMsg.innerText='image ajoutée avec succés!';
                setTimeout(() => {
                    successMsg.innerText='';

                },3000);
                reinitState();
                displayList(); 
                enableScroll();
              
            } 
        } catch (error) {
            console.error("Error:", error);
        }
    }
    else {
        errorMessage.innerText = "erreur lors de l'ajout";
    }

    }
const fileContent=document.getElementById('file');
const titleInput=document.getElementById('title');
const categorySelect=document.getElementById('worksCategory');
console.log(fileContent)
fileContent.addEventListener('change', ()=>{
    if (fileContent.files[0]!== undefined){
        errorMessage.innerHTML="";
    }
});
titleInput.addEventListener('input', () =>{
    console.log('ok')
    if (titleInput.value!==""){
        errorMessage.innerHTML="";
    }
});
categorySelect.addEventListener('change',()=>{
    if(categorySelect.value!==''){
        errorMessage.innerHTML="";

    }
});
   
    validate.addEventListener("click", (event) => {
        event.preventDefault();
        addForm();
        displayListModal();
        displayList();

        });
function logout(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.href='/login.html'
};
const logoutBtn=document.getElementById('logout');
logoutBtn.addEventListener('click', () =>{
    logout();
    console.log(logoutBtn);
})

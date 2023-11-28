// Boton
const buttonRef = document.getElementById("buttonTeam");

// Funcion Spinner
const spinner = () => {
    const sectionRef = document.getElementById("showInfo");
    const spinnerRef = document.createElement("div");
    spinnerRef.setAttribute("id", "spinner");
    spinnerRef.setAttribute("class","text-center mt-5")
    spinnerRef.innerHTML = `
    <div class="spinner-border text-primary" role="status"></div>
    `;
    sectionRef.appendChild(spinnerRef);
};

// Funcion Create Table
const createTable = users => {
    info = users.map(user => 
        `
    <div class="col-md-6 col-lg-4 mb-5">
    <div class="card mx-auto bg-secondary text-light shadow-lg p-3 mb-5 bg-secondary rounded" style="width: 18rem;">
    <img src="${user.avatar}" class="card-img-top rounded-circle pt-4 pe-4 ps-4"/>
    <div class="card-body text-center text-dark">
      <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
      <p class="card-text">${user.email}</p>
    </div>
    </div>
    </div>
    `);
    const spinnerRef = document.getElementById("spinner");
    const sectionRef = document.getElementById("showInfo");
    spinnerRef.remove();
    sectionRef.innerHTML = info.join("");
    buttonRef.disabled = false;
};

// ApiFetch
const getUsers = async url => {
    
    await fetch(url)
    .then(response => {return response.json()})
    .then(data => {
        const dataUsers = data.data;
        const dateFetch = new Date().getTime();

        localStorage.setItem("dataUsers", JSON.stringify(dataUsers));
        localStorage.setItem("dateFetch",dateFetch);
        
        createTable(dataUsers);
    })
    .catch(error => {
        console.log("Ha ocurrido un error:");
        console.log(error);
    })

};

const delay = 3;
const url = "https://reqres.in/api/users?delay=" + delay;

// Ejecucion del Boton
buttonRef.addEventListener("click", e => {
    const sectionRef = document.getElementById("showInfo");
    const dateButtonClic = new Date().getTime();
    sectionRef.innerHTML = "";

    buttonRef.disabled = true;
    spinner();

    if (dateButtonClic - localStorage.getItem("dateFetch") > 60000) {
        getUsers(url);
    } else {
        createTable( JSON.parse(localStorage.getItem("dataUsers")) );
    }

});
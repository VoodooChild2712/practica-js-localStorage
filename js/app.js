const formulario = document.querySelector('#formulario');
const inputTarea = document.querySelector('#tarea');
const mensajeError = document.querySelector('.alert-danger');
const contenedorTareas = document.querySelector('#contenedorTareas');
const templateTarea = document.querySelector('#templateTarea');

let tareas = [];

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!inputTarea.value.trim()) {
        mensajeError.classList.remove('d-none');
        return;
    };

    const text_tarea = inputTarea.value;

    crearTareas(text_tarea);
});

const crearTareas = (text_tarea) => {
    const tarea = {
        name: text_tarea,
        id: Date.now(),
    };
    tareas.push(tarea);
    mostrarTareas();
};

const mostrarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));

    contenedorTareas.textContent = '';
    const fragment = document.createDocumentFragment();

    tareas.forEach((item) => {
        const clone = templateTarea.content.cloneNode(true);
        clone.querySelector('.lead').textContent= item.name;
        clone.querySelector('.btn-danger').dataset.id = item.id;
        fragment.appendChild(clone);
    });

    contenedorTareas.appendChild(fragment);
};

document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-danger')) {
        tareas = tareas.filter((item) => item.id !== parseInt(e.target.dataset.id));
        mostrarTareas();
    };
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'));
        mostrarTareas();
    };
});
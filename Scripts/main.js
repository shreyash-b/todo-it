// HTML Elements
const addBtn = document.querySelector(".addBtn");
const inpBx = document.querySelector(".todoInp");
const todoAct = document.querySelector(".ULactive");
const todoComp = document.querySelector(".ULcomp");
const clrAll = document.querySelector(".clrAll");

// custom method to insert element at top
[todoAct, todoComp].forEach((item) => {
    item.insertTop = function(child){
        item.insertBefore(child, item.firstChild);
    }
});


function addTodo(todo){ // Add todo to list
    let span = document.createElement('span');
    span.innerHTML = `<li><input type="checkbox" data-dashlane-rid="aadaa6d9c552dd35" data-form-type=""><div class="todo">${todo}</div><div class="del">X</div></li><hr>`;
    todoAct.insertTop(span);

    let chkBx = span.querySelector("input");
    let todoDiv = span.querySelector(".todo");
    let delBtn = span.querySelector(".del");

    chkBx.addEventListener("change", () => {
        if(chkBx.checked){
            complete(span);
            remLocal(todo, 'active');
            addLocal(todo, 'complete');
        } else {
            incomplete(span);
            remLocal(todo, 'complete');
            addLocal(todo, 'active');
        }
        });

    delBtn.addEventListener("click", () => {
        span.parentElement.removeChild(span);
    })
}

function addFrmInp(){
    todo = inpBx.value.trim();
    if(todo){
        addTodo(todo);
        inpBx.value = "";
    }

    addLocal(todo, 'active');
}

function complete(span){
    todoDiv = span.querySelector(".todo");
    todoDiv.classList.add("complete");
    todoAct.removeChild(span);
    todoComp.insertTop(span);
}

function incomplete(span){
    todoDiv = span.querySelector(".todo");
    todoDiv.classList.remove("complete");
    todoComp.removeChild(span);
    todoAct.appendChild(span);
}

function addLocal(todo, list){
    let todos = JSON.parse(localStorage.getItem(list));
    todos.push(todo);

    localStorage.setItem(list, JSON.stringify(todos));

}

function remLocal(todo, list){
    let todos = JSON.parse(localStorage.getItem(list));
    let index;

    for(let i=0; i<todos.length; i++)
        if(todos[i] === todo) {
            index = i;
            break;
        }

    todos.splice(index, 1);

    localStorage.setItem(list, JSON.stringify(todos));


}

addBtn.addEventListener('click', () => {
    addFrmInp();
});

inpBx.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        addFrmInp();
    }
});

clrAll.addEventListener("click", () => {
    todoAct.innerHTML = '';
    todoComp.innerHTML = '';
    localStorage.setItem('active', '[]');
    localStorage.setItem('complete', '[]');
})

window.addEventListener('DOMContentLoaded', () => {

    let active = localStorage.getItem('active') ? JSON.parse(localStorage.getItem('active')) : [];
    let completed = localStorage.getItem('complete') ? JSON.parse(localStorage.getItem('complete')) : [];

    if(!active.length) {
        localStorage.setItem('active', JSON.stringify([]));
    } if(!completed.length) {
        localStorage.setItem('complete', JSON.stringify([]));
    }

    active.forEach((item) => {
        addTodo(item);
    });
    completed.forEach((item) => {
        addTodo(item);
        todoAct.firstChild.querySelector('input').checked = true;
        complete(todoAct.firstChild)
    })
});
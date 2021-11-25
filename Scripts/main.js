// HTML Elements
const addBtn = document.querySelector(".addBtn");
const addInp = document.querySelector(".todoInp");
const todoACT = document.querySelector(".ULactive");
const todoComp = document.querySelector(".ULcomp");
const clrAll = document.querySelector(".clrAll");

function toggle(chkbx){
    
}

function addTodo(todo){
    let todoSpan = document.createElement("span");
    todoSpan.innerHTML = `<li><input type="checkbox"><div class="todo active">${todo}</div><div class="del">X</div></li><hr>`;

    todoACT.insertBefore(todoSpan, todoACT.firstChild);
    

    let delBtn = todoSpan.querySelector(".del");
    let chkbx = todoSpan.querySelector("input");

    delBtn.addEventListener('click', () => {
        delBtn.parentElement.parentElement.remove();
    });

    chkbx.addEventListener('click', () => {
        todo_li = chkbx.nextElementSibling;
        if(chkbx.checked){
            todo_li.classList.add("complete");
            todoACT.removeChild(todoSpan);
            todoComp.insertBefore(todoSpan, todoComp.firstChild);
        } else {
            todo_li.classList.remove("complete");
            todoComp.removeChild(todoSpan);
            todoACT.appendChild(todoSpan);
        }
    })

}

function addTodo_frominp(){
    todo = addInp.value;
    if(todo.trim()){
        addTodo(todo);
        addInp.value = "";
    }
}

addBtn.addEventListener('click', addTodo_frominp);
addInp.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        addTodo_frominp();
    }
})

clrAll.addEventListener('click', () => {
    todoACT.innerHTML = "";
    todoComp.innerHTML = "";
});
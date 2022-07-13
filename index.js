const form = document.querySelector('.form-field');
const input = document.getElementById('input');
const ul = document.querySelector('.list')
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    addToDo();
})

let list = JSON.parse(localStorage.getItem('list'));
list.forEach((task)=>{
    addToDo(task)
})
function addToDo(task){
    let inputText  = input.value;
    if(task){
        inputText = task.name;
    }
    const li = document.createElement('li');
    if(task && task.checked){
        li.classList.add('checked')
    }
    li.innerText = inputText;
    ul.appendChild(li);
    input.value = '';
    const checkBtn = document.createElement('div');
    checkBtn.innerHTML = `<i class="check fa-solid fa-square-check">`;
    li.appendChild(checkBtn);
    const trashBtn = document.createElement('div');
    trashBtn.innerHTML = `<i class=" fa-solid fa-trash"></i>`;
    li.appendChild(trashBtn);
    checkBtn.addEventListener('click',()=>{
        li.classList.toggle('checked');
        updateToLocal();
    })
    trashBtn.addEventListener('click', ()=>{
        li.remove();
        updateToLocal();
    })
    updateToLocal();
}
function updateToLocal(){
    const liEl = document.querySelectorAll('li');
     list = [];

    liEl.forEach(li=>{
        list.push({
            name:li.innerText,
            checked:li.classList.contains('checked')
        })
    })
    localStorage.setItem('list', JSON.stringify(list));
}
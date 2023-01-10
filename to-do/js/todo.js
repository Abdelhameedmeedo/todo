let resultSection = document.querySelector('.result ul')
let addBtn = document.querySelector('.todo-nav button')
let inputField = document.querySelector('.todo-nav input')



let outcomeArray = []
if(localStorage.getItem('item')){
    outcomeArray = JSON.parse(localStorage.getItem('item'))
}
getLocalStorage()
//event
addBtn.addEventListener('click',()=>{
        if(inputField.value !== ''){
            recieveItem(inputField.value)
            inputField.value =''
        }

})


//recieve item
function recieveItem(input){
    let obj = {
        id:Date.now(),
        title:input
        
    }
    outcomeArray.push(obj)
    addItem(outcomeArray)
    setLocalStorage(outcomeArray)
}

//add item
function addItem(input){
    resultSection.innerHTML = '' //to not add new for old item
    input.forEach(element => {
        let listItem = document.createElement('li')
            listItem.setAttribute('data-id',element.id)
        let contentDiv = document.createElement('div')
        let textArea = document.createElement('p')
        let textAreaContent = document.createTextNode(element.title)
        let doneIconSpan = document.createElement('span')
            doneIconSpan.className = 'done'
            doneIconSpan.title = 'done'
            doneIconSpan.innerHTML = `<i class="fas fa-check-circle"></i>`
        let deleteIconSpan = document.createElement('span')
            deleteIconSpan.className = 'delete'  
            deleteIconSpan.title = 'delete'
            deleteIconSpan.innerHTML = `<i class="far fa-trash-alt"></i>`
        
        //appending
        textArea.appendChild(textAreaContent)
        contentDiv.appendChild(textArea)
        contentDiv.appendChild(doneIconSpan)
        contentDiv.appendChild(deleteIconSpan)
        listItem.appendChild(contentDiv)
        resultSection.appendChild(listItem)
    });
}
//set localStrage
function setLocalStorage(input){
    window.localStorage.setItem('item',JSON.stringify(input))
}
//get localStrage
function getLocalStorage(){
    let data = window.localStorage.getItem('item')
    if(data){
        let task = JSON.parse(data)
        addItem(task)
    }
}

let getDelIcon = document.querySelectorAll('ul li .delete')
getDelIcon.forEach(el=>{
    el.addEventListener('click',e=>{
        deleteItem(e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id'))
        e.target.parentElement.parentElement.parentElement.remove()
    })
})
function deleteItem(taskId){
  outcomeArray = outcomeArray.filter(task=> task.id != taskId)
  setLocalStorage(outcomeArray)
}
let getDoneIcon = document.querySelectorAll('ul li .done')
getDoneIcon.forEach(ele=>{
    ele.addEventListener('click',e=>{
       e.target.parentElement.parentElement.parentElement.style.background = 'green'
       e.target.style.color = 'aliceblue'
    })
})
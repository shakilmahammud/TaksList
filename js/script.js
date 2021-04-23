let form=document.querySelector('#task_form')
let taskList =document.querySelector('ul')
let clearBtn=document.querySelector('#clear_task')
let filterBtn=document.querySelector('#task_filter')
let taskInput=document.querySelector("#new_task")

form.addEventListener('submit',addTask)
taskList.addEventListener('click',removeTask)
clearBtn.addEventListener('click',clearTsk)
filterBtn.addEventListener('keyup',filtreTask)
document.addEventListener('DOMContentLoaded',getTask)


// define fuction


function addTask(e){
    if(taskInput.value===""){
        alert('add task')
    }else{
        let li=document.createElement('li')
        li.appendChild(document.createTextNode(taskInput.value + " "))
        let link =document.createElement('a')
        link.setAttribute('href','#')
        link.innerHTML=" "+"x"
        li.appendChild(link)
        taskList.appendChild(li)
        storeTaskInLocalStorage(taskInput.value)
        taskInput.value='';
    }
    e.preventDefault();

}

function removeTask(e){
    if(e.target.hasAttribute("href")){
    if(confirm('Are you Sure?')){
        let ele=e.target.parentElement;
        ele.remove()
        removeFromSl(ele)
    }
    }
}

function clearTsk(e){
    taskList.innerHTML="";
    while(taskList.firstChild){
        taskList.removeChild(taskList)
    }
}
function filtreTask(e){
  let text=e.target.value;
  console.log(text)
  document.querySelectorAll('li').forEach(task=>{
      let item=task.firstChild.textContent;
      if(item.toLocaleLowerCase().indexOf(text) !=-1){
          task.style.display='block'
        
      }else{
          task.style.display='none'
      }
  })
}

function storeTaskInLocalStorage(task){
let tasks;
if(localStorage.getItem('tasks')===null){
    tasks=[];
}else{
    tasks=JSON.parse(localStorage.getItem('tasks'))
}
tasks.push(task)
localStorage.setItem('tasks',JSON.stringify(tasks))
}
function getTask(){
    let tasks;
if(localStorage.getItem('tasks')===null){
    tasks=[];
}else{
    tasks=JSON.parse(localStorage.getItem('tasks'))
}
tasks.forEach(task=>{
    let li=document.createElement('li')
        li.appendChild(document.createTextNode(task + " "))
        let link =document.createElement('a')
        link.setAttribute('href','#')
        link.innerHTML=" "+"x"
        li.appendChild(link)
        taskList.appendChild(li)
})
}

function removeFromSl(taskitem){
    let tasks;
if(localStorage.getItem('tasks')===null){
    tasks=[];
}else{
    tasks=JSON.parse(localStorage.getItem('tasks'))
}
let li=taskitem;
tasks.forEach((task,index)=>{
    if(li.textContent.trim()===task){
        tasks.splice(index, 1)
    }
})
localStorage.setItem('tasks',JSON.stringify(tasks))
}
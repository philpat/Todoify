function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}


const createTodo = () =>{
  const todoInput = document.querySelector('#todo-input');
  const errMessage = document.querySelector('#error-message')
  if(!todoInput.value){
    errMessage.innerHTML=`<p>Please ENTER a Todo</p>`
    errMessage.classList.remove('hidden')
    errMessage.classList.add('text-red-400', 'text-center', 'text-sm' )
    return
  } else{
    errMessage.classList.add('hidden')
  }
  const newTodo = {
    id: uuid(),
    title: todoInput.value,
    created_at: Date.now()
  }

  const todoStorage = JSON.parse(localStorage.getItem("todo_storage")) || [];
  const newTodoStorage = [...todoStorage, newTodo]
  localStorage.setItem("todo_storage", JSON.stringify(newTodoStorage))
  fetchTodo()
  todoInput.value =""
}

const fetchTodo = ()=>{
  const getTodo = JSON.parse(localStorage.getItem("todo_storage")) || []
  const todoListContainer = document.querySelector("#todo-list-container")
  const noTodo = getTodo.length === 0 ;
  if(noTodo){
    todoListContainer.innerHTML =`<p class="text-center text-slate-500">Todo list is Empty</p>`
    return
  }

//   const todos = getTodo.sort((a,b)=>{
//     if (a.created_at > b.created_at) return -1;
//     if (a.created_at < b.created_at) return 1;
//     return 0; 
// })

  // console.log(
  //   getTodo.sort((a, b)=>a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0)
  // )
  const todos = getTodo.sort((a, b)=>a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0)
  .map((todo) =>{
    return `
    <div class="group flex justify-between bg-white rounded-lg mb-2 p-2 hover:shadow-md">
        <h3>${todo.title}</h3>
        <section class="flex gap-3 hidden group-hover:flex">
          <button onclick="handleEditMode('${todo.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            
          </button>
          <button onclick="deleteTodo('${todo.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            
          </button>
        </section>
      </div>
    `
  })
  todoListContainer.innerHTML = todos.join("")
}

const deleteTodo=(id)=>{
  Swal.fire({
    title: 'Delete Todo?',
    text: "Are you sure you want to delete this Todo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete!'
  }).then((result) => {
    if (result.isConfirmed) {
  const getTodo = JSON.parse(localStorage.getItem("todo_storage"))
  const newTodoStorage = getTodo.filter((todo)=>todo.id !== id)
  localStorage.setItem("todo_storage", JSON.stringify(newTodoStorage))
  fetchTodo()
      Swal.fire(
        'Deleted!',
        'Todo deleted successfully.',
        'success'
      )
    }
  })

  
}

const handleEditMode =(id)=>{
  const getTodo = JSON.parse(localStorage.getItem("todo_storage")) || []
  const todoUpdate = getTodo.find((todo)=>todo.id ===id)
  if(!todoUpdate){
    return
  }
  const todoInput = document.querySelector('#todo-input');
  todoInput.value = todoUpdate.title

  const updateTodoBtn = document.querySelector('#update_todo_btn')
  updateTodoBtn.classList.remove("hidden")
  updateTodoBtn.setAttribute("update_todo_id", id)
  const addTodoBtn = document.querySelector('#add_todo_btn')
  addTodoBtn.classList.add("hidden")
}


const updateTodo =()=>{
  const todoInput = document.querySelector('#todo-input');
  const errMessage = document.querySelector('#error-message')
  if(!todoInput.value){
    errMessage.innerHTML="Please ENTER a Todo"
    errMessage.classList.remove('hidden')
    errMessage.classList.add('text-red-400', 'text-center')

    setTimeout(()=>{
      errMessage.classList.add('hidden')
    }, 5000)
    
  }
  const updateTodoBtn = document.querySelector('#update_todo_btn')
  const todoId = updateTodoBtn.getAttribute("update_todo_id")
  const getTodo = JSON.parse(localStorage.getItem("todo_storage")) || []
  const updated_todo_db = getTodo.map((todo)=>{
    if(todo.id === todoId){
      return {...todo, title: todoInput.value}
    }else{
      return todo
    }
  })
  localStorage.setItem("todo_storage", JSON.stringify(updated_todo_db))
  fetchTodo()
  todoInput.value = ""
  updateTodoBtn.classList.add("hidden")
  const addTodoBtn = document.querySelector('#add_todo_btn')
  addTodoBtn.classList.remove("hidden")

}
fetchTodo()
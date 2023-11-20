function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

const resetFormInput=()=>{
  const todoInput = document.querySelector('#todo-input');
  todoInput.value =""
}

const showMessage =(title)=>{
  const errMessage = document.querySelector('#error-message')
  errMessage.innerHTML=title
    errMessage.classList.remove('hidden')
    errMessage.classList.add('text-red-400', 'text-center')

    // setTimeout(()=>{
    //   errMessage.classList.add('hidden')
    // }, 5000)
}

const getDataBase =(db_name)=>{
  if(!db_name){
    throw new Error('db_name is missing')
  }
  return JSON.parse(localStorage.getItem(db_name)) || []
}

const setDataBase=(db_name, newData)=>{
  if(!db_name){
    throw new Error('db_name is missing')
  }
  if(!newData){
    throw new Error('Data is missing')
  }
  localStorage.setItem(db_name, JSON.stringify(newData))
}

const sortTodosByCreated_at =(todos)=>{
  return todos.sort((a, b)=>a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0)
}

const showConfirmModal=({title,text,icon,showCancelButton,confirmButtonText, cb})=>{
  swal.fire({
    title,
    text,
    icon, 
    showCancelButton,
    confirmButtonText
  }).then((result)=>{
    if (result.isConfirmed){
      cb()
    }
  }) 
}

const handlePreviewTodo=(id)=>{
  setDataBase("current_preview_todo_id", id)
  window.location.href="preview-todo.html"
}

const getTodoDate =(d)=>{
  const todoDate = new Date(d).toLocaleString()
  return todoDate
}
getTodoDate()
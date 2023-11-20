const todoStorage = getDataBase('todo_storage')
const currentPreviewId = getDataBase("current_preview_todo_id")
const currentTodo = todoStorage.find((todo) => todo.id === currentPreviewId)
const main_container = document.querySelector("#main-container")
  const descriptionInput = document.querySelector("#description-input")

const getCurrentPreviewTodo = () => {


  const { title, created_at, description, id } = currentTodo


  const todo_preview_container = document.querySelector('#todo_preview_container')
  todo_preview_container.innerHTML = `
  <div class="items-center" id="main-container">
          <div class="flex justify-between text-center items-center" >
            <h3 class="text-xl font-semibold">${title}</h3> 
        <div class="flex items-center gap-2">
          <button onclick="editPreview()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            
          </button>
          <button type="button" onclick="deletePreview()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-5 h-5 ">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            
          </button>
        </div>
      </div>
        
      <div>
        <small>${getTodoDate(created_at)}</small>
        <span class="mx-1">&middot;</span>
        <span class="rounded-full bg-[#B366FA] px-2 py-1">Pending</span>
      </div>
      <section class="flex justify-between items-center mt-3 ">
        <p class="text-slate-700">${description}</p>
        
      </section>
  </div>
    <section class="mt-5 hidden" id="edit-preview">
      <div class="flex flex-col">
        <label for="name">Title</label>
        <input type="text" class="rounded-md w-full my-3 shadow-md hover:bg-slate-200 p-3" id='update-input'>
        <p class="hidden " id="error-message"></p>
        <label for="description">Description</label>
        <textarea name="description" id="description-input" class="rounded-md w-full  shadow-md p-3 hover:bg-slate-200" placeholder="Description..."></textarea>
        <button class="bg-yellow-500 rounded-md px-2 py-3 mt-3 text-white font-semibold" id="update_preview_btn" onclick="editPreviewUpdate()">Update Todo</button>
      </div>
    </section>
  `
}

const editPreview = () => {
  // const currentPreviewId = getDataBase("current_preview_todo_id")
  const edit_preview = document.querySelector("#edit-preview")
  const main_container = document.querySelector("#main-container")
  const updateInput = document.querySelector("#update-input")
  main_container.classList.add("hidden")
  edit_preview.classList.remove("hidden")

  updateInput.value = currentTodo.title

}

const editPreviewUpdate = () => {
  const main_container = document.querySelector("#main-container")
  const edit_preview = document.querySelector("#edit-preview")
  const updateInput = document.querySelector("#update-input")
  const descriptionInput = document.querySelector("#description-input")
  const errMessage = document.querySelector('#error-message')
  if (!updateInput.value) {
    showMessage("Please Provide a Todo to Update")
    setTimeout(()=>{
      errMessage.classList.add('hidden')
    }, 5000)
    return
  }
  const updated_preview_db = todoStorage.map((todo) => {

    if (todo.id === currentPreviewId) {
      return { ...todo, title: updateInput.value, description: descriptionInput.value }
    } else {
      return todo
    }
    
  })
  setDataBase('todo_storage', updated_preview_db)
  main_container.classList.remove("hidden")
  edit_preview.classList.add("hidden")
  console.log(updated_preview_db);
  descriptionInput.value = currentTodo.description

}

const deletePreview = () => {
  Swal.fire({
    title: 'Delete Todo?',
    text: "Are you sure!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete!'
  }).then((result) => {
    if (result.isConfirmed) {
      const deletePreviewStorage = todoStorage.filter((todo) => todo.id !== currentPreviewId);
      setDataBase("todo_storage", deletePreviewStorage);

      Swal.fire(
        'Deleted!',
        'Todo deleted successfully.',
        'success'
      )

      window.location.href = '/index.html'

    }
  })

   // const handleDelete=()=>{
  //   const deletePreviewStorage = todoStorage.filter((todo)=>todo.id !==currentPreviewId)
  // console.log(deletePreviewStorage);
  // setDataBase('todo_storage', deletePreviewStorage)
  // Swal.fire(
  //   'Deleted!',
  //   'Todo deleted successfully.',
  //   'success'
  // )
  // window.location.href="index.html"
  // }
  // showConfirmModal({
  //   title: 'Delete Todo?',
  //   text: "Are you sure!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Delete!',
  //   cb: handleDelete
  // })
}

getCurrentPreviewTodo()

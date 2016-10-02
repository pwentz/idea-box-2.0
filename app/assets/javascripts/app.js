const api = new AjaxHelper()
$(document).ready( () => {
  const nic = new NewIdeasContainer();
  const ic = new IdeasContainer();
  nic.renderInputs()
  ic.renderIdeas();
  $('.add-idea').on('click', handleSubmit)
})

function handleSubmit() {
  api.ideasPost()
}

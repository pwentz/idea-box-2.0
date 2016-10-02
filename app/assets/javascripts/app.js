const api = new AjaxHelper()
let newTitle;
let newBody;
let ideaId;
let idea;

$(document).ready( () => {
  const nic = new NewIdeasContainer();
  const ic = new IdeasContainer();
  nic.renderInputs()
  ic.renderIdeas();
  submitListener(ic);
  deleteListener(ic);
})

function submitListener(ic) {
  $('.app').on('click', '.add-idea', ic.handleSubmit.bind(ic))
}

function deleteListener(ic) {
  $('.app').on('click', '.ideas .delete-idea', ic.handleDelete.bind(ic))
}

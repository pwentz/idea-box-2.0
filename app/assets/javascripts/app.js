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
  titleListener(ic);
  bodyListener(ic)
})

function submitListener(ic) {
  $('.app').on('click', '.add-idea', ic.handleSubmit.bind(ic))
}

function deleteListener(ic) {
  $('.app').on('click', '.ideas .delete-idea', ic.handleDelete.bind(ic))
}

function titleListener(ic) {
  $('.app').on('blur', '.ideas .idea-title', ic.handleUpdate.bind(ic))
  $('.app').on('keypress', '.ideas .idea-title', (e) => {
    if (e.which === 13) {
      ic.handleUpdate.call(ic)
      return false;
   }
  })
}

function bodyListener(ic) {
  $('.app').on('blur', '.ideas .idea-body', ic.handleUpdate.bind(ic))
  $('.app').on('keypress', '.ideas .idea-body', (e) => {
    if (e.which === 13) {
      ic.handleUpdate.call(ic)
      return false;
   }
  })
}


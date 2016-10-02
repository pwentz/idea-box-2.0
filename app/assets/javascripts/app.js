const api = new AjaxHelper()
let newTitle;
let newBody;

$(document).ready( () => {
  const nic = new NewIdeasContainer();
  const ic = new IdeasContainer();
  nic.renderInputs()
  ic.renderIdeas();
  $('.add-idea').on('click', handleSubmit)
})

function handleSubmit() {
  newTitle = $('.new-title')[0].value
  newBody = $('.new-body')[0].value
  $('.ideas').prepend( () => {
    return `<h1>${newTitle}</h1>
            <h5>${newBody}</h5>
            <p>swill</p>`
  })
  api.ideasPost()
}

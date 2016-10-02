class IdeasContainer {
  renderIdeas() {
    api.ideasGet()
      .done(
        data => $('.ideas').append(this.formattedIdeas(data))
      )
  }

  formattedIdeas(ideas) {
    return ideas.map(i => {
      return `<div id=${i.id}>
                <h1>${i.title}</h1>
                <h5>${i.body}</h5>
                <p>${i.quality}</p>
                <button class='button alert hollow delete-idea'>
                  <i class='fi-x'></i>
                </button>
              </div>`
    })
  }

  handleSubmit() {
    api.ideasPost()
      .done(data => {
        $('.ideas div').hide()
        this.renderIdeas()
      })
  }

  handleDelete() {
    idea = event.target.closest('div')
    api.ideasDelete(idea.id)
      .done(data => {
        $('.ideas div').hide()
        this.renderIdeas()
      })
  }
}

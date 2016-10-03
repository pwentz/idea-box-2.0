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
                <h1
                  class='idea-title'
                  contentEditable='true'
                >
                  ${i.title}
                </h1>
                <h5
                  class='idea-body'
                  contentEditable='true'
                >
                  ${i.body}
                </h5>
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
        $('.ideas').empty()
        this.renderIdeas()
      })
  }

  handleDelete() {
    api.ideasDelete(this.targetIdea().id)
      .done(data => {
        $('.ideas').empty()
        this.renderIdeas()
      })
  }

  handleUpdate() {
    let id = this.targetIdea().id
    this.stashIdea(id)
    api.ideasUpdate(id)
      .done(data => {
        localStorage.clear()
        $('.ideas').empty()
        this.renderIdeas()
      })
  }

  stashIdea(id) {
    localStorage.setItem(
      id,
      JSON.stringify(
        { title: this.targetTitle(id),
          body: this.targetBody(id) }
      )
    )
  }

  targetIdea() {
    return event.target.closest('div')
  }

  targetTitle(id) {
    return $(`#${id} .idea-title`)[0].innerText.trim()
  }

  targetBody(id) {
    return $(`#${id} .idea-body`)[0].innerText.trim()
  }
}

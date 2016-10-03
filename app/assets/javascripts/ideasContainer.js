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
        $('.ideas div').hide()
        this.renderIdeas()
      })
  }

  handleDelete() {
    api.ideasDelete(this.targetIdea().id)
      .done(data => {
        $('.ideas div').hide()
        this.renderIdeas()
      })
  }

  handleUpdate() {
    this.stashIdea()
    api.ideasUpdate(this.targetIdea().id)
      .done(data => {
        $('.ideas div').hide()
        this.renderIdeas()
      })
  }

  stashIdea() {
    localStorage.setItem(
      this.targetIdea().id,
      JSON.stringify(
        { title: this.targetTitle(),
          body: this.targetBody() }
      )
    )
  }

  targetIdea() {
    return event.target.closest('div')
  }

  targetTitle() {
    return $(`#${this.targetIdea().id} .idea-title`)[0].innerText
  }

  targetBody() {
    return $(`#${this.targetIdea().id} .idea-body`)[0].innerText
  }
}

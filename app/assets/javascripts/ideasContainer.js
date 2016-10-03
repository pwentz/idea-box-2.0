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
                <p
                  class='idea-quality'
                >
                  ${i.quality}
                </p>
                <button class='button alert hollow delete-idea'>
                  <i class='fi-x'></i>
                </button>
                <br>
                <i class='fi-like'></i>
                <i class='fi-dislike'></i>
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
    api.ideasDelete(this.target())
      .done(data => {
        $('.ideas').empty()
        this.renderIdeas()
      })
  }

  handleUpdate() {
    let id = this.target()
    this.stashIdea(id)
    this.dispatchUpdate(id)
  }

  dispatchUpdate(id) {
    api.ideasUpdate(id)
      .done(data => {
        localStorage.clear()
        $('.ideas').empty()
        this.renderIdeas()
      })
  }

  stashIdea(id, q = null) {
    localStorage.setItem(
      id,
      JSON.stringify(
        { title: this.targetTitle(id),
          body: this.targetBody(id),
          quality: q || this.targetQuality(id) }
      )
    )
  }

  handleQualityIncrease() {
    let q = this.targetQuality(this.target())
    if (q === 'plausible' || q === 'genius') q = 'genius'
    if (q === 'swill') q = 'plausible'
    this.stashIdea(this.target(), q)
    this.dispatchUpdate(this.target())
  }

  handleQualityDecrease() {
    let q = this.targetQuality(this.target())
    if (q === 'plausible' || q === 'swill') q = 'swill'
    if (q === 'genius') q = 'plausible'
    this.stashIdea(this.target(), q)
    this.dispatchUpdate(this.target())
  }

  target() {
    return event.target.closest('div').id
  }

  targetTitle(id) {
    return $(`#${id} .idea-title`)[0].innerText.trim()
  }

  targetBody(id) {
    return $(`#${id} .idea-body`)[0].innerText.trim()
  }

  targetQuality(id) {
    return $(`#${id} .idea-quality`)[0].innerText.trim()
  }
}

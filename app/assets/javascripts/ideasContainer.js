class IdeasContainer {
  renderIdeas() {
    api.ideasGet()
      .done(
        data => $('.ideas').append(this.formattedIdeas(data))
      )
  }

  formattedIdeas(ideas) {
    return ideas.map(i => {
      return `<div class='row'>
                <div class='small-6 small-centered columns idea' id=${i.id}>
                  <h3
                    class='idea-title'
                    contentEditable='true'
                  >
                    ${i.title}
                  </h3>
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
                  <div class='row'>
                    <div class='small-3 columns'>
                      <button class='button alert hollow delete-idea'>
                        <i class='fi-x'></i>
                      </button>
                    </div>
                    <div class='small-1 columns q-adjustment'>
                      <i class='fi-like'></i>
                      <i class='fi-dislike'></i>
                    </div>
                  </div>
                </div>
              </div>`
    })
  }

  handleSubmit() {
    api.ideasPost()
      .done(data => {
        $('.new-title').val('')
        $('.new-body').val('')
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

  handleSearch() {
    $('.idea').each((index, idea) => {
      let searchParams = event.target.value.toLowerCase()
      let ideaTitle = $(idea).find('.idea-title')[0].innerText.toLowerCase()
      let ideaBody = $(idea).find('.idea-body')[0].innerText.toLowerCase()
      if (ideaTitle.indexOf(searchParams) === -1 && ideaBody.indexOf(searchParams) === -1) {
        $(idea).hide()
      }
      else {
        $(idea).show()
      }
    })
  }

  target() {
    return event.target.closest('.idea').id
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

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
      .done( () => {
        $('.new-title').val('')
        $('.new-body').val('')
        $('.ideas').empty()
        this.renderIdeas()
      })
  }

  handleDelete(e) {
    api.ideasDelete(this.targetId())
      .done( () => {
        $(e.target.closest('.idea')).hide()
      })
  }

  handleUpdate() {
    let id = this.targetId()
    this.stashIdea(id)
    this.dispatchUpdate(id)
  }

  handleQualityIncrease() {
    let $q = this.targetQuality(this.targetId())
    if ($q.innerText === 'plausible' || $q.innerText === 'genius') $q.innerText = 'genius'
    if ($q.innerText === 'swill') $q.innerText = 'plausible'
    this.stashIdea(this.targetId(), $q.innerText)
    this.dispatchUpdate(this.targetId())
  }

  handleQualityDecrease() {
    let $q = this.targetQuality(this.targetId())
    if ($q.innerText === 'plausible' || $q.innerText === 'swill') $q.innerText = 'swill'
    if ($q.innerText === 'genius') $q.innerText = 'plausible'
    this.stashIdea(this.targetId(), $q.innerText)
    this.dispatchUpdate(this.targetId())
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

  dispatchUpdate(id) {
    api.ideasUpdate(id)
      .done( () => {
        localStorage.clear()
      })
  }

  targetId() {
    return event.target.closest('.idea').id
  }

  targetTitle(id) {
    return $(`#${id} .idea-title`)[0].innerText.trim()
  }

  targetBody(id) {
    return $(`#${id} .idea-body`)[0].innerText.trim()
  }

  targetQuality(id) {
    return $(`#${id} .idea-quality`)[0]
  }
}

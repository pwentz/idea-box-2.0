class IdeasContainer {
  constructor() {
    this.transitions = new TransitionHelper()
  }

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

                  <div class='row action-container'>
                    <div class='small-3 columns'>

                      <button class='button alert hollow delete-idea'
                              name='delete-idea'
                      >
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
    let body = $('.new-body')[0].value
    if (body.length > 100) body = this.handleTruncation(body)
    api.ideasPost(body)
      .done( () => {
        $('.new-title').val('')
        $('.new-body').val('')
        $('.ideas').empty()
        this.renderIdeas()
      })
  }

  handleTruncation(body) {
    const truncBody = body.split('').reduce(this.scanBodyForLength, '')
    const splitBody = truncBody.split(' ')
    return splitBody.slice(0, splitBody.length - 1).join(' ')
  }

  scanBodyForLength(result, letter, index) {
    if (index <= 99) result += letter
    return result
  }

  handleDelete(e) {
    this.transitions.fadeIdea(e)
    api.ideasDelete(this.targetId())
  }

  handleUpdate() {
    const id = this.targetId()
    this.stashIdea()
    this.dispatchUpdate(id)
  }

  handleQualityIncrease() {
    const $q = this.targetQuality(this.targetId())
    this.transitions.upQuality($q)
    this.stashIdea($q.innerText)
    this.dispatchUpdate(this.targetId())
  }

  handleQualityDecrease() {
    const $q = this.targetQuality(this.targetId())
    this.transitions.downQuality($q)
    this.stashIdea($q.innerText)
    this.dispatchUpdate(this.targetId())
  }

  handleSearch() {
    $('.idea').each((index, idea) => {
      if (this.paramsAgainstIdea(idea)) {
        $(idea).hide()
      }
      else {
        $(idea).show()
      }
    })
  }

  paramsAgainstIdea(idea) {
    const searchParams = event.target.value.toLowerCase()
    const ideaTitle = this.targetTitle(idea.id).toLowerCase()
    const ideaBody = this.targetBody(idea.id).toLowerCase()
    return !ideaTitle.includes(searchParams) && !ideaBody.includes(searchParams)
  }

  stashIdea(q = null) {
    const id = this.targetId()
    localStorage.setItem(
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

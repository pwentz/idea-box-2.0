class IdeasContainer {
  renderIdeas() {
    api.ideasGet()
      .done(
        data => $('.app').append(this.formattedIdeas(data))
      )
  }

  formattedIdeas(ideas) {
    return ideas.map(i => {
      return `<h1>${i.title}</h1>
              <h5>${i.body}</h5>`
    })
  }
}

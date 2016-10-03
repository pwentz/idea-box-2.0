class NewIdeasContainer {
  renderInputs() {
    $('.app').prepend(
      `<div class='filler'></div>
      <h1 id='header'>Idea box</h1>
      <div class='row'>
       <div class='small-6 columns small-centered'>
        <input type='text' class='new-title' />
        <br>
        <input type='text' class='new-body' />
        <br>
        <div class='row'>
          <div class='small-2 columns small-centered'>
            <button
              type='submit'
              class='primary button hollow add-idea'>
              Submit
            </button>
          </div>
        </div>
       </div>
      </div>`
    )
  }
}

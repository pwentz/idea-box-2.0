class NewIdeasContainer {
  renderInputs() {
    $('.app').prepend(
      `<input type='text' class='new-title' />
       <br>
       <input type='text' class='new-body' />
       <br>
       <button
         type='submit'
         class='primary button add-idea'>
         Submit
       </button>`
    )
  }
}

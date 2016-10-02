class AjaxHelper {
  ideasGet() {
    return $.getJSON('/api/v1/ideas.json')
  }

  ideasPost() {
    return $.ajax({
             url: '/api/v1/ideas.json',
             type: 'POST',
             data: { idea: { title: $('.new-title')[0].value,
                             body:  $('.new-body')[0].value } }
           })
  }
}

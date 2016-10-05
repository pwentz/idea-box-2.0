class TransitionHelper {
  fadeIdea(e) {
    const $idea = $(e.target.closest('.idea'))
    const $title = $($idea.find('.idea-title')[0])[0]
    const $body = $($idea.find('.idea-body')[0])[0]
    const $quality = $($idea.find('.idea-quality')[0])[0]
    $idea.on('transitionend webkitTransitionEnd', (e) => $idea.hide())
    $title.innerText = ''
    $body.innerText = ''
    $quality.innerText = ''
    $idea.find('.action-container').fadeOut()
    $idea.addClass('fadeOut')
  }

  upQuality(q) {
    const _q = $(q)[0]
    $(q).on('transitionend webkitTransitionEnd', e => {
      $(q).removeClass('upSize')
    })
    if (_q.innerText === 'plausible' || _q.innerText === 'genius') _q.innerText = 'genius'
    if (_q.innerText === 'swill') _q.innerText = 'plausible'
    $(q).addClass('upSize')
  }

  downQuality(q) {
    const _q = $(q)[0]
    $(q).on('transitionend webkitTransitionEnd', e => {
      $(q).removeClass('upSize')
    })
    if (_q.innerText === 'plausible' || _q.innerText === 'swill') _q.innerText = 'swill'
    if (_q.innerText === 'genius') _q.innerText = 'plausible'
    $(q).addClass('upSize')
  }
}

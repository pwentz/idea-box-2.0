class IdeaBox {
  constructor() {
    this.nic = new NewIdeasContainer();
    this.ic = new IdeasContainer();
    this.nic.renderInputs()
    this.ic.renderIdeas();
    this.bindSubmitListener(this.ic);
    this.bindDeleteListener(this.ic);
    this.bindTitleListener(this.ic);
    this.bindBodyListener(this.ic)
    this.bindIncreaseQualityListener(this.ic)
    this.bindDecreaseQualityListener(this.ic)
    this.bindSearchListener(this.ic)
  }

  bindSubmitListener(ic) {
    $('.app').on('click', '.add-idea', this.ic.handleSubmit.bind(this.ic))
  }

  bindDeleteListener(ic) {
    $('.app').on('click', '.ideas .delete-idea', this.ic.handleDelete.bind(this.ic))
  }

  bindTitleListener(ic) {
    $('.app').on('keydown', '.ideas .idea-title', (e) => {
      if (e.which === 13) {
        this.ic.handleUpdate.call(this.ic)
        $(e.target).blur()
        return false
     }
    })
  }

  bindBodyListener(ic) {
    $('.app').on('keydown', '.ideas .idea-body', (e) => {
      if (e.which === 13) {
        this.ic.handleUpdate.call(this.ic)
        $(e.target).blur()
        return false
      }
    })
  }

  bindIncreaseQualityListener(ic) {
    $('.app').on('click', '.ideas .fi-like', this.ic.handleQualityIncrease.bind(this.ic))
  }

  bindDecreaseQualityListener(ic) {
    $('.app').on('click', '.ideas .fi-dislike', this.ic.handleQualityDecrease.bind(this.ic))
  }

  bindSearchListener(ic) {
    $('.app').on('keyup', '.search', this.ic.handleSearch)
  }
}

require 'rails_helper'

describe 'search idea', type: :feature, js: true do
  scenario 'they immediately see matching ideas' do
    pending
    idea = Idea.create(title: 'eat', body: 'tacos')
    backwards_idea = Idea.create(title: 'fish', body: 'for dinner')

    visit root_path

    fill_in 'search-ideas', with: 'eat tac'

    within('.ideas') do
      expect(page).to have_text('eat')
      expect(page).to have_text('tacos')
      expect(page).not_to have_text('fish')
      expect(page).not_to have_text('for dinner')
    end
  end
end

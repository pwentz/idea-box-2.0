require 'rails_helper'

describe 'adjust quality', type: :feature, js: true do
  context 'adjust quality downwards' do
    scenario 'they click once and quality goes down a level' do
      pending
      Idea.create(title: 'title', body: 'body', quality: 0)

      visit root_path

      within('.idea') do
        page.find('.fi-like').click
        expect(page).to have_text('plausible')
        expect(page).not_to have_text('swill')
      end

    end
  end
end

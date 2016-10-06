require 'rails_helper'

describe 'delete idea', type: :feature, js: true do
  scenario 'idea is immediately removed from page' do
    Idea.create(title: 'title', body: 'body')

    visit root_path

    within('.idea') do
      page.find('.delete-idea').click
    end

    within('.ideas') do
      expect(page).not_to have_text('title')
      expect(page).not_to have_text('body')
    end
  end
end

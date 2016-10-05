require 'rails_helper'

describe 'update idea', type: :feature, js: true do
  before(:each) do
    visit root_path

    within('.new-idea-container') do
      fill_in 'new-title', with: 'title'
      fill_in 'new-body', with: 'body'
      click_button 'Submit'
    end
  end

  context 'they edit the title' do
    scenario 'updated info is immediately rendered' do
      visit root_path

      within('.idea') do
        page.find('.idea-title').set('edited')
        Selenium::WebDriver::Keys[:enter]
      end

      within('.ideas') do
        expect(page).to have_text('body')
        expect(page).to have_text('edited')
        expect(page).not_to have_text('title')
      end
    end
  end

  context 'they edit the body' do
    scenario 'updated info is immediately rendered' do
      visit root_path

      within('.idea') do
        page.find('.idea-body').set('edited')
        Selenium::WebDriver::Keys[:enter]
      end

      within('.ideas') do
        expect(page).to have_text('title')
        expect(page).to have_text('edited')
        expect(page).not_to have_text('body')
      end
    end
  end
end

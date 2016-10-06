require 'rails_helper'

describe 'create idea', type: :feature, js: true do
  context 'body is of appropriate length' do
    scenario 'idea is immediately rendered on page' do
      visit root_path

      within('.new-idea-container') do
        fill_in 'new-title', with: 'title'
        fill_in 'new-body', with: 'body'
        click_button 'Submit'
      end

      within('.ideas') do
        expect(page).to have_text('title')
        expect(page).to have_text('body')
      end
    end
  end

  context 'body is longer than 100 chars' do
    it 'truncates the 100th char to the nearest word' do
      longBody = ''
      10.times do
        longBody += 'this is a long string. '
      end

      visit root_path

      within('.new-idea-container') do
        fill_in 'new-title', with: 'title'
        fill_in 'new-body', with: longBody
        click_button 'Submit'
      end

      within('.idea') do
        body_text = page.find('.idea-body').text
        expect(body_text.length).to eq(99)
      end
    end
  end
end

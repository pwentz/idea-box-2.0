require 'rails_helper'

describe 'ideas put request', type: :request do
  it 'updates idea, does not return anything' do
    idea = Idea.create(title: 'go', body: 'fishing')
    update_params = { idea: { body: 'cook'} }

    put "/api/v1/ideas/#{idea.id}", params: update_params

    expect{
      idea.reload
    }.to change{idea.body}.from('fishing').to('cook')

    expect(response).to have_http_status(204)
    expect(response.body).to be_empty
  end
end

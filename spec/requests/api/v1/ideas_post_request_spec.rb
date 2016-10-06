require 'rails_helper'

describe 'ideas post request spec', type: :request do
  it 'creates an idea, returns nothing' do
    idea_params = { idea: { title: 'go', body: 'fishing' } }


    expect{
      post '/api/v1/ideas.json', params: idea_params
    }.to change{Idea.count}.from(0).to(1)

    expect(response).to have_http_status(204)
    expect(response.body).to be_empty
  end
end

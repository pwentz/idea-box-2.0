require 'rails_helper'

describe 'ideas index request spec', type: :request do
  it 'returns all ideas in descending order of id' do
    idea_one = Idea.create(title: 'go fishing', body: 'tomorrow')
    idea_two = Idea.create(title: 'cook food', body: 'everyday')

    get '/api/v1/ideas.json'

    parsed_response = JSON.parse(response.body)

    expect(response).to have_http_status(200)
    expect(response.content_type).to eq('application/json')
    expect(parsed_response.length).to eq(2)
    expect(parsed_response.first['id']).to eq(idea_two.id)
    expect(parsed_response.first['title']).to eq('cook food')
    expect(parsed_response.first['body']).to eq('everyday')
  end
end

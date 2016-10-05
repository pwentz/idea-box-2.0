require 'rails_helper'

describe 'ideas delete request', type: :request do
  it 'deletes idea, does not return anything' do
    idea = Idea.create(title: 'eat', body: 'dinner')

    delete "/api/v1/ideas/#{idea.id}.json"

    expect{
      idea.reload
    }.to raise_error(ActiveRecord::RecordNotFound)

    expect(Idea.count).to eq(0)
    expect(response).to have_http_status(204)
    expect(response.body).to be_empty
  end
end

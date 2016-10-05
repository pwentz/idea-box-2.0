require 'rails_helper'

describe Idea, type: :model do
  context 'attributes' do
    it 'has a title' do
      idea = Idea.create(title: 'do things')

      expect(idea.title).to eq('do things')
    end

    it 'has a body' do
      idea = Idea.create(body: 'go fishing')

      expect(idea.body).to eq('go fishing')
    end

    it 'has a default quality of swill' do
      idea = Idea.create(title: 'do', body: 'things')

      expect(idea.quality).to eq('swill')
    end
  end
end

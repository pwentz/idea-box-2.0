class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.order('id DESC')
  end

  def create
    idea = Idea.create(idea_params)
  end

  def destroy
    Idea.destroy(params[:id])
  end

  def update
    idea = Idea.find(params[:id])
    idea.update(idea_params)
    respond_with idea
  end

  def clear
    respond_with Idea.destroy_all
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end
end

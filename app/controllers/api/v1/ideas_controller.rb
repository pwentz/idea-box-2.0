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
    Idea.update(params[:id], idea_params)
  end

  def clear
    respond_with Idea.destroy_all
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body)
  end
end

class HomeController < ApplicationController
  def index
    @columns = Column.all.includes(:cards)
    @column = params[:id].present? ? Column.find(params[:id]) : Column.new
  end
end

class HomeController < ApplicationController
  def index
    @columns = Column.all.includes(:cards)
  end
end

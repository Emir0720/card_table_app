class HomeController < ApplicationController
  def index
    @columns = Column.all.includes(:cards)
    @column = Column.find_by(id: 9)
    @card = Card.new
  end
end

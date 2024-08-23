class Cards::MovesController < ApplicationController
  def update
    @card = Card.find(params[:card_id])
    if @card.update(column_id: params[:card][:column_id])
      redirect_to root_path
    else
      redirect_to column_card_path(@card.column, @card), alert: 'There was a problem moving the card.'
    end 
  end
end
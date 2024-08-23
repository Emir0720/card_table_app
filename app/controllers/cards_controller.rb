class CardsController < ApplicationController
  before_action :set_card, only: [:show, :edit, :update, :destroy]
  before_action :set_column, only: [:new, :create, :show, :edit]

  def index
    @cards = Card.all
  end

  def new
    @card = Card.new
  end
  
  def create
    @card = Card.new(card_params)
    @card.column_id = @column.id
    if @card.save
      render turbo_stream: turbo_stream.turbo_stream_refresh_tag(request_id: nil)
    else
      respond_to do |format|
        format.html { render :new }
        format.turbo_stream { render turbo_stream: turbo_stream.replace('new_card_form', partial: 'cards/form', locals: { card: @card }) }
        
      end
    end
  end

  def show
  end

  def update
    if @card.update(card_params)
      render turbo_stream: turbo_stream.turbo_stream_refresh_tag(request_id: nil) #, root_path, notice: 'Card was successfully updated.' }
    else
      respond_to do |format|
        format.html { render :edit }
        format.turbo_stream { render turbo_stream: turbo_stream.replace("edit_card_form", partial: "cards/form", locals: { card: @card }) }
      end
    end
  end

  def destroy
    @card.destroy
    redirect_to root_path, notice: 'Card was successfully deleted.'
  
  end
  

  private

  def set_card
    @card = Card.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to cards_url, alert: 'Card not found.'
  end

  def set_column
    @column = Column.find(params[:column_id])
  end

  def card_params
    params.require(:card).permit(:title, :assigned_to, :due_on, :description, :column_id)
  end
end
class CardsController < ApplicationController
  before_action :set_card, only: [:show, :edit, :update, :destroy]

  def index
    @cards = Card.all
  end

  def create
    @card = Card.new(card_params)

    column = Column.find_by(name: 'Triage')
    if column
      @card.column_id = column.id

    else
      redirect_to cards_path, alert: 'Triage column not found.'
      return
    end

    if @card.save
      redirect_to root_path
    else
      respond_to do |format|
        format.html { render :new }
        format.turbo_stream { render turbo_stream: turbo_stream.replace('new_card_form', partial: 'cards/form', locals: { card: @card }) }
      end
    end
  end

  def show
    @card
  end

  def update
    if @card.update(card_params)
      respond_to do |format|
        # format.turbo_stream { render turbo_stream: turbo_stream.append("column_#{@card.column_id}", partial: "cards/card", locals: { card: @card }) }
        format.html { redirect_to root_path, notice: 'Card was successfully updated.' }
      end
    else
      respond_to do |format|
        format.html { render :edit }
        format.turbo_stream { render turbo_stream: turbo_stream.replace("edit_card_form", partial: "cards/form", locals: { card: @card }) }
      end
    end
  end

  def destroy
    @card.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Card was successfully deleted.' }
      format.turbo_stream { render turbo_stream: turbo_stream.remove("card-#{params[:id]}") }
    end
  end
  

  private

  def set_card
    @card = Card.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to cards_url, alert: 'Card not found.'
  end

  def card_params
    params.require(:card).permit(:title, :assigned_to, :due_on, :description, :column_id)
  end
end
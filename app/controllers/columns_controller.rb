class ColumnsController < ApplicationController
  before_action :set_column, only: [:show, :edit, :update, :update_color, :destroy, :rename]

  def index
    @columns = Column.all
  end

  def show
    @column = Column.find(params[:id])
    @cards = @column.cards.order(created_at: :asc)
  end

  def new
    @column = Column.new
  end

  def create
    @column = Column.new(column_params)
  
    if @column.save
      redirect_to root_path
    else
      respond_to do |format|
        format.html { render :new }
        format.turbo_stream { render turbo_stream: turbo_stream.replace("column-form", partial: "columns/form", locals: { column: @column }) }
      end
    end
  end
  

  def edit
    @column = Column.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @column }
    end
  end
  

  def update
    if @column.update(column_params)
      redirect_to root_path, notice: 'Column was successfully updated.'
    else
      render :edit
    end
  end


  def update_color
    @column = Column.find(params[:id])
    if @column.update(color: params[:column][:color])
      redirect_to root_path, notice: 'Column color was successfully updated.'
    else
      redirect_to root_path, alert: 'Failed to update column color.'
    end
  end
  

  def rename
    @column = Column.find(params[:id])
    if @column.update(name: params[:column][:name])
      redirect_to root_path, notice: 'Column renamed successfully.'
    else
      redirect_to root_path, alert: 'Failed to rename column.'
    end
  end

  def destroy
    @column = Column.find(params[:id])
    if @column.destroy
      redirect_to root_path, notice: 'Column deleted successfully.'
    else
      redirect_to root_path, alert: 'Failed to delete column.'
    end
  end

  private

  def set_column
    @column = Column.find(params[:id])
  end

  def column_params
    params.require(:column).permit(:name, :description)
  end
end

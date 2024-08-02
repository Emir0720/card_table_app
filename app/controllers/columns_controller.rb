class ColumnsController < ApplicationController
  before_action :set_column, only: [:show, :edit, :update, :destroy, :rename]

  def index
    @columns = Column.all
  end

  def show
    # @column already set by before_action
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
      respond_to do |format|
        format.html { redirect_to column_path(@column), notice: 'Column was successfully updated.' }
        format.turbo_stream { render turbo_stream: turbo_stream.replace("column-#{@column.id}", partial: "columns/column", locals: { column: @column }) }
      end
    else
      respond_to do |format|
        format.html { render :edit }
        format.turbo_stream { render turbo_stream: turbo_stream.replace("column-form", partial: "columns/form", locals: { column: @column }) }
      end
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
    @column = Column.find_by(id: params[:id])
    if @column.nil?
      logger.error "Column with ID #{params[:id]} not found"
      redirect_to root_path, alert: "Column not found."
    end
  end

  def column_params
    params.require(:column).permit(:name, :description)
  end
end

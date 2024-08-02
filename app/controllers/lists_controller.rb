class ListsController < ApplicationController
  def create
    @board = Board.find(params[:board_id])
    @list = @board.lists.create(list_params)
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to board_path(@board) }
    end
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to board_path(@list.board) }
      end
    else
      
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to board_path(@list.board) }
    end
  end

  private

  def list_params
    params.require(:list).permit(:name, :position)
  end
end
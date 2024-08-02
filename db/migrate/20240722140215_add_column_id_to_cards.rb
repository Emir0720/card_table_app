class AddColumnIdToCards < ActiveRecord::Migration[7.1]
  def change
    add_column :cards, :column_id, :integer
  end
end

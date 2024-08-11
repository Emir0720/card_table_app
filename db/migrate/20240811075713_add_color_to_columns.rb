class AddColorToColumns < ActiveRecord::Migration[7.1]
  def change
    add_column :columns, :color, :string
  end
end

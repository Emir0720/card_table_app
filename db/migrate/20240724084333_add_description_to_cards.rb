class AddDescriptionToColumns < ActiveRecord::Migration[7.1]
  def change
    add_column :columns, :description, :string
  end
end

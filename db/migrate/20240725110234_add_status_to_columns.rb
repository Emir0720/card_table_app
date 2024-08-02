class AddStatusToColumns < ActiveRecord::Migration[7.1]
  def change
    add_column :columns, :status, :integer
  end
end

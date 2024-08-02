class CreateColumns < ActiveRecord::Migration[6.1]
  def change
    create_table :columns do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end

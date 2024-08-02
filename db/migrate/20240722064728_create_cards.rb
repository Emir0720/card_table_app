class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :title
      t.string :assigned_to
      t.date :due_on
      t.integer :list_id
      t.integer :position

      t.timestamps
    end
    add_index :cards, :list_id
  end
end

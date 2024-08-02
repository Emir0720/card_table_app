class AddTriageColumnToColumns < ActiveRecord::Migration[7.1]
  def up
    Column.create(name: 'Triage')
  end

  def down
    column = Column.find_by(name: 'Triage')
    column.destroy if column
  end
end

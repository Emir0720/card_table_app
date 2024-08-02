Column.find_or_create_by!(name: 'Triage') do |column|
    column.status = :triage
  end
  
  Column.find_or_create_by!(name: 'Not Now') do |column|
    column.status = :not_now
  end
  
  Column.find_or_create_by!(name: 'Done') do |column|
    column.status = :done
  end
  
class Column < ApplicationRecord
    has_many :cards, dependent: :destroy
    validates :name, presence: true
    enum status: { triage: 0, not_now: 1, done: 2 }
    validates :description, presence: false
  end
  
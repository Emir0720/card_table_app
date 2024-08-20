class Card < ApplicationRecord
  belongs_to :column
  validates :title, presence: true , length: { maximum: 20 }
end

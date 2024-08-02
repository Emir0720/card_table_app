class Board < ApplicationRecord
    has_many :lists, dependent: :destroy
  end
  
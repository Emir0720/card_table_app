require 'test_helper'

class CardTest < ActiveSupport::TestCase
  test "should save card with valid attributes" do
    card = Card.new(title: "Test Card", assigned_to: "Ali", due_on: Date.today, list_id: 1)
    assert card.save, "Failed to save the card with valid attributes"
  end
end

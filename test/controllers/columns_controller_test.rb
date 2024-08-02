require "test_helper"

class ColumnsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get columns_index_url
    assert_response :success
  end

  test "should get create" do
    get columns_create_url
    assert_response :success
  end
end

class ApplicationController < ActionController::Base
    before_action :require_login
  
    private
  
    def require_login
      unless logged_in?
        redirect_to login_path, alert: "You must be logged in to access this section"
      end
    end
  
    def logged_in?
      !!session[:user_id]
    end
  end
  
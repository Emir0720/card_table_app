Rails.application.routes.draw do
  root 'home#index'

  resources :columns do
    resources :cards do
      resource :move, only: [:update], controller: "cards/moves"
    end
    member do
      put 'rename', to: 'columns#rename', as: 'rename'
      post 'update_color', to: 'columns#update_color'
    end
  end
  
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  get 'login', to: 'sessions#new', as: 'login'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy', as: 'logout'
  get 'signup', to: 'users#new', as: 'signup'
end

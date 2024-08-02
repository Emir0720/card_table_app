Rails.application.routes.draw do
  root 'home#index'

  resources :cards  
  resources :columns, only: [:index, :create, :show, :destroy] do
    member do
      put 'rename', to: 'columns#rename', as: 'rename'
    end
  end
  
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  get 'login', to: 'sessions#new', as: 'login'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy', as: 'logout'
  get 'signup', to: 'users#new', as: 'signup'
end

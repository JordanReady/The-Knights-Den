Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/learn' => 'static_pages#learn'
  get '/stats' => 'static_pages#stats'
  get '/logout' => 'static_pages#logout'
  get '/login' => 'static_pages#login'

  namespace :api do
    resources :users, only: [:create]
    patch 'users/:id/color_theme' => 'users#update_color_theme'
    get 'users/:id/color_theme' => 'users#get_color_theme'
    resources :sessions, only: [:create, :destroy, :authenticated]
    resources :games do
      resources :moves, only: [:index, :create, :destroy]
    end
    get '/sessions/authenticated' => 'sessions#authenticated'
  end
end

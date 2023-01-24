Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/learn' => 'static_pages#learn'
  get '/stats' => 'static_pages#stats'
  get '/logout' => 'static_pages#logout'
  get '/login' => 'static_pages#login'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy, :authenticated]
  end
end

Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/learn' => 'static_pages#learn'
  get '/stats' => 'static_pages#stats'
  get '/logout' => 'static_pages#logout'
end

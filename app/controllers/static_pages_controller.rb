class StaticPagesController < ApplicationController
  before_action :authenticate_user!, only: [:learn, :stats, :multiplayer, :multiplayer_game]
  before_action :set_authenticated

  def home
    render 'home'
  end

  def learn
    render 'learn'
  end

  def stats
    render 'stats'
  end

  def logout
    render 'logout'
  end

  def login
    render 'login'
  end

  def multiplayer
    render 'multiplayer'
  end

  def multiplayer_game
    render 'multiplayer_game'
  end

  private

  def authenticate_user!
    session = Session.find_by(token: cookies.signed[:session_token])
    unless session
      redirect_to '/login'
    end
  end

  def set_authenticated
    session = Session.find_by(token: cookies.signed[:session_token])
    @authenticated = !!session
  end
end

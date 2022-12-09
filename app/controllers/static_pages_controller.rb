class StaticPagesController < ApplicationController
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
    
end


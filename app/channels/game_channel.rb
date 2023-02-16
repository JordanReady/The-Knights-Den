class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

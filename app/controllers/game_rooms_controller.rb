class GameRoomsController < ApplicationController
    def index
        @game_rooms = GameRoom.all
        render json: @game_rooms
    end

    def create
        #check to see if room already exist
        if GameRoom.find_by(name: params[:name])
            render json: { errors: "Room already exist" }, status: :unprocessable_entity
        else
            @game_room = GameRoom.new(game_room_params)
        if @game_room.save
            render json: @game_room
            ActionCable.server.broadcast 'game_rooms_channel', {
            game_room: @game_room
            }
        else
            render json: { errors: @game_room.errors }, status: :unprocessable_entity
        end
    end
end

private
    def game_room_params
        params.require(:game_room).permit(:name)
    end
end

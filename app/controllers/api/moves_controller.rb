module Api
    class MovesController < ApplicationController
        before_action :set_game
        before_action :set_move, only: [:destroy]
        def index
            @moves = @game.moves
            render 'api/moves/index'
        end
        
        def create
            game = Game.find(params[:game_id])
            move = game.moves.new(move_params)
        
            if move.save
                ActionCable.server.broadcast("game_#{game.id}_channel", {type: "UPDATE_GAME", moves: game.reload.moves})
              render json: move
            else
              render json: { errors: move.errors }, status: :unprocessable_entity
            end
        end

        def delete_last_move
            game = Game.find(params[:game_id])
            last_move = game.moves.last
            last_move.destroy
            render json: last_move
        end
    
        def reset_moves
            game = Game.find(params[:game_id])
            game.moves.destroy_all
            render json: game.moves
        end
    
        private
    
        def set_game
            @game = Game.find(params[:game_id])
        end
    
        def set_move
            @move = @game.moves.find(params[:id])
        end
    
        def move_params
            params.require(:move).permit(:move)
        end
    end
end

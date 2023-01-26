class GamesController < ApplicationController
    before_action :set_game, only: [:show, :update, :destroy]
  
    def index
        @games = Game.all
        render 'api/games/index'
    end

    def show
        render 'api/games/show' 
    end
  
    def new
        @game = Game.new
    end
  
    def create
        @game = Game.new(game_params)

        if @game.save
            render 'api/games/create', status: :created
        else
            render json: @game.errors, status: :unprocessable_entity
        end
    end

    def update 
        if @game.update(game_params)
            render json: @game
        else
            render json: @game.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @game.destroy
        head :no_content
    end
  
    private
      def set_game
          @game = Game.find(params[:id])
      end
  
      def game_params
          params.require(:game).permit(:player_1_id, :player_2_id)
      end
  end
  
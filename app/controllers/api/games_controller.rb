module Api
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

    def offer_draw
        @game = Game.find(params[:id])
        user_id = params[:user_id]

        if user_id == @game.player_1_id
            @game.player_1_draw_offer = true
        elsif user_id == @game.player_2_id
            @game.player_2_draw_offer = true
        end

        if @game.save
            render json: @game
        else
            render json: @game.errors, status: :unprocessable_entity
        end
    end
  
    private
      def set_game
          @game = Game.find(params[:id])
      end
  
      def game_params
        params.require(:game).permit(:player_1_id, :player_2_id, :player_1_draw_offer, :player_2_draw_offer)
      end
      
  end
end
  
module Api
  class StatsController < ApplicationController
    before_action :set_user

    def update_win
      @user.wins += 1
      @user.total_games += 1
      if @user.save
        render 'api/stats/update', status: :ok
      else
        render json: { success: false }, status: :unprocessable_entity
      end
    end

    def update_loss
      @user.losses += 1
      @user.total_games += 1
      if @user.save
        render 'api/stats/update', status: :ok
      else
        render json: { success: false }, status: :unprocessable_entity
      end
    end

    def update_draw
      @user.draws += 1
      @user.total_games += 1
      if @user.save
        render 'api/stats/update', status: :ok
      else
        render json: { success: false }, status: :unprocessable_entity
      end
    end

    def reset_stats
      @user.wins = 0
      @user.losses = 0
      @user.draws = 0
      @user.total_games = 0
      if @user.save
        render 'api/stats/update', status: :ok
      else
        render json: { success: false }, status: :unprocessable_entity
      end
    end

    def show
      render 'api/stats/show', status: :ok
    end

    private

    def set_user
      @user = User.find(params[:id])
    end

    def stats_params
      params.require(:user).permit(:wins, :losses, :draws, :total_games)
    end
  end
end

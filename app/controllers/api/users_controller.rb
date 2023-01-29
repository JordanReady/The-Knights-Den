module Api
    class UsersController < ApplicationController
      def create
        @user = User.new(user_params)
  
        if @user.save
          render 'api/users/create', status: :created
        else
          render json: { success: false }, status: :bad_request
        end
      end

      def update_color_theme
        @user = User.find(params[:id])
        if @user.update(color_theme_params)
            render json: { success: true }, status: :ok
        else
            render json: { success: false }, status: :unprocessable_entity
        end
    end

    def get_color_theme
        @user = User.find(params[:id])
        render json: { color_theme: @user.color_theme }, status: :ok
    end
  
      private

      def color_theme_params
        params.require(:user).permit(:color_theme)
      end
  
      def user_params
        params.require(:user).permit(:email, :password, :username)
      end
    end
  end
  
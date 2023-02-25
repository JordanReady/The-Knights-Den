require 'bcrypt'
module Api
  class SessionsController < ApplicationController
    def create
      @user = User.find_by(email: params[:user][:email]).try(:authenticate, params[:user][:password])

      if @user
        session = @user.sessions.create
        cookies.signed[:session_token] = session.token
        render 'api/sessions/create', status: :created
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def authenticated
      token = cookies.signed[:session_token]
      if token.present?
        session = Session.find_by(token: token)
        if session
          @user = session.user
          @user_id = @user.id
          render 'api/sessions/authenticated', status: :ok
        else
          render json: { success: false }, status: :unauthorized
        end
      else
        render json: { success: false }, status: :unauthorized
      end
    end

    def destroy
      token = cookies.signed[:session_token]
      if token.present?
        session = Session.find_by(token: token)
        if session&.destroy
          render json: { success: true }, status: :ok
        else
          render json: { success: false }, status: :unauthorized
        end
      else
        render json: { success: false }, status: :unauthorized
      end
    end
  end
end

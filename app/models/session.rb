class Session < ApplicationRecord
  belongs_to :user

  validates :user, presence: true

  before_validation :generate_session_token

  private

  def generate_session_token
    self.token = SecureRandom.urlsafe_base64
  end
end

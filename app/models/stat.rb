class Stat < ApplicationRecord
  belongs_to :user

  validates :user, presence: true

  def total_games
    wins + losses + draws
  end
end

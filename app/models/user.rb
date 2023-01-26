class User < ActiveRecord::Base
has_many :sessions
has_many :games_as_player_1, class_name: "Game", foreign_key: "player_1_id"
has_many :games_as_player_2, class_name: "Game", foreign_key: "player_2_id"
has_many :stats

has_secure_password

validates :username, presence: true, uniqueness: true
validates :email, presence: true, uniqueness: true

validates_uniqueness_of :username, :email

end

class User < ActiveRecord::Base
has_many :sessions
has_many :games
has_many :stats

has_secure_password

validates :username, presence: true, uniqueness: true
validates :email, presence: true, uniqueness: true

validates_uniqueness_of :username, :email

end

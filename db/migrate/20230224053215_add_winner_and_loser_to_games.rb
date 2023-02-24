class AddWinnerAndLoserToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :winner, :integer, default: nil
    add_column :games, :loser, :integer, default: nil
  end
end

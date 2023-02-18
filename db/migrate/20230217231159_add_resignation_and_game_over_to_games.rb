class AddResignationAndGameOverToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :player_1_resigned, :boolean, default: false
    add_column :games, :player_2_resigned, :boolean, default: false
    add_column :games, :game_over, :boolean, default: false
  end
end

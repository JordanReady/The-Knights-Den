class AddDrawOfferToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :player_1_draw_offer, :boolean
    add_column :games, :player_2_draw_offer, :boolean
  end
end

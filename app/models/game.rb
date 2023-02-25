class Game < ApplicationRecord
  has_many :moves
  belongs_to :player_1, class_name: "User"
  belongs_to :player_2, class_name: "User"

  before_update :update_player_stats

  private

  def update_player_stats
    if !@stats_updated && game_over
      if winner_changed?
        if player_1_id == winner
          player_1.wins += 1
          player_2.losses += 1
        elsif player_2_id == winner
          player_2.wins += 1
          player_1.losses += 1
        end
        player_1.total_games += 1
        player_2.total_games += 1
      elsif loser_changed?
        if player_1_id == loser
          player_1.losses += 1
          player_2.wins += 1
        elsif player_2_id == loser
          player_2.losses += 1
          player_1.wins += 1
        end
        player_1.total_games += 1
        player_2.total_games += 1
      elsif player_1_draw_offer_changed? || player_2_draw_offer_changed?
        if player_1_draw_offer && player_2_draw_offer
          player_1.increment!(:draws)
          player_2.increment!(:draws)
          player_1.total_games += 1
          player_2.total_games += 1
        end
      end

      player_1.save
      player_2.save

      @stats_updated = true
    end
  end
end

class Game < ApplicationRecord
    has_many :moves
    belongs_to :player_1, class_name: "User"
    belongs_to :player_2, class_name: "User"
  
    before_update :update_player_stats
  
    private
  
    def update_player_stats
        if !@stats_updated && self.game_over
          if self.winner_changed?
            if self.player_1_id == self.winner
              self.player_1.wins += 1
              self.player_2.losses += 1
            elsif self.player_2_id == self.winner
              self.player_2.wins += 1
              self.player_1.losses += 1
            end
            self.player_1.total_games += 1
            self.player_2.total_games += 1
          elsif self.loser_changed?
            if self.player_1_id == self.loser
              self.player_1.losses += 1
              self.player_2.wins += 1
            elsif self.player_2_id == self.loser
              self.player_2.losses += 1
              self.player_1.wins += 1
            end
            self.player_1.total_games += 1
            self.player_2.total_games += 1
          elsif self.player_1_draw_offer_changed? || self.player_2_draw_offer_changed?
            if self.player_1_draw_offer && self.player_2_draw_offer
              self.player_1.increment!(:draws)
              self.player_2.increment!(:draws)
              self.player_1.total_games += 1
              self.player_2.total_games += 1
            end
          end
      
          self.player_1.save
          self.player_2.save
      
          @stats_updated = true
        end
      end
    end


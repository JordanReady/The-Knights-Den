json.game do
    json.id @game.id
    json.player_1_id @game.player_1_id
    json.player_2_id @game.player_2_id
    json.player_1_draw_offer @game.player_1_draw_offer
    json.player_2_draw_offer @game.player_2_draw_offer
    json.player_1_resigned @game.player_1_resigned
    json.player_2_resigned @game.player_2_resigned
    json.game_over @game.game_over
end

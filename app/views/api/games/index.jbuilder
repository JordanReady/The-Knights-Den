json.array! @games do |game|
    json.player_1_id game.player_1_id
    json.player_2_id game.player_2_id
    json.winner game.winner
    json.player_1_moves game.player_1_moves
    json.player_2_moves game.player_2_moves
    json.current_player game.current_player
    json.state game.state
end

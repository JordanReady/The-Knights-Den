json.array! @moves do |move|
    json.move move.move
    json.game_id move.game_id
  end
  
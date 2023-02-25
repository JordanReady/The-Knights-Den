json.form_for @game, url: games_path, method: :post do |f|
  json.text_field :player_1_id
  json.text_field :player_2_id
  json.submit "Create Game"
end

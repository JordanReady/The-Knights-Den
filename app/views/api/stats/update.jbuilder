json.stats do
    json.wins @user.wins
    json.losses @user.losses
    json.draws @user.draws
    json.total_games @user.total_games
end

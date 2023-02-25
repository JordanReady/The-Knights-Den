json.user do
  json.user_id @user.id
  json.username @user.username
  json.email @user.email
  json.color_theme @user.color_theme
end

class AddColorThemeToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :color_theme, :string, default: 'default'
  end
end

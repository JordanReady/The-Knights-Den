class CreateMoves < ActiveRecord::Migration[6.1]
  def change
    create_table :moves do |t|
      t.integer :game_id
      t.string :move
      t.integer :move_number

      t.timestamps
    end
  end
end

class CreateStats < ActiveRecord::Migration[6.1]
  def change
    create_table :stats do |t|
      t.integer :wins
      t.integer :losses
      t.integer :draws

      t.timestamps
    end
  end
end

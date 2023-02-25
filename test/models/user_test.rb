require 'rails_helper'

RSpec.describe User, type: :model do
  it "creates a user" do
    user = User.create(username: "testuser", email: "test@example.com", password: "password")
    expect(user).to be_valid
    expect(user.username).to eq("testuser")
    expect(user.email).to eq("test@example.com")
    expect(user.authenticate("password")).to be true
  end
end

import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  contact: Number,
});

export interface UserInterface {
  id: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  contact: Number;
}

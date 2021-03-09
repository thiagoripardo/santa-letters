import { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';

const salt: number = 12;
export interface IUser extends Document {
  username: string;
  password: string;
  comparePasswords(enteredPassword: string): boolean;
}

const UserSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', function (
  this: IUser,
  next: (err?: Error | undefined) => void
) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  });
});

UserSchema.methods.comparePasswords = function (
  enteredPassword: string,
): boolean {
  return bcrypt.compareSync(enteredPassword, this.password);
};

const User: Model<IUser> = model<IUser>("users", UserSchema);
export default User;
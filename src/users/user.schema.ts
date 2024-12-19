import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'; // Import bcryptjs for hashing

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  emailVerifyCode: string;

  @Prop()
  emailVerifyExpiers: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  passwordResetCode: string;

  @Prop()
  passwordResetExpires: Date;

  @Prop()
  passwordResetVerified: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);

// Add pre-save hook for hashing the password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it's modified

  // Hash the password with bcrypt
  const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed with the save operation
});

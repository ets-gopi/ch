import { CallbackError, model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { UserRole } from '../enums/user.enums';
import bcrypt from 'bcrypt';

const userAccountSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.USER]
    },
    is_email_verified: {
      type: Boolean,
      required: false,
      default: false
    },
    email_verification_otp: {
      type: String,
      required: false,
      default: null
    },
    email_verification_token: {
      type: String,
      required: false,
      default: null
    },
    email_verification_expires: {
      type: Date,
      required: false,
      default: null
    },
    email_verified_at: {
      type: Date,
      required: false,
      default: null
    },
    reset_password_token: {
      type: String,
      required: false,
      default: null
    },
    reset_token_expires: {
      type: Date,
      required: false,
      default: null
    },
    reset_password_verified_at: {
      type: Date,
      required: false,
      default: null
    }
  },
  { timestamps: true, versionKey: false }
);

userAccountSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error as CallbackError);
    }
    next();
  }
});

export const userAccountModel = model<IUser>('users', userAccountSchema);

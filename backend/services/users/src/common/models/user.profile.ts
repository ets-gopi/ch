import { model, Schema } from 'mongoose';
import { IUserProfile } from '../interfaces';

const userProfileSchema = new Schema<IUserProfile>(
  {
    username: {
      type: String,
      unique: true,
      default: ''
    },
    userId: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      default: ''
    },
    avatarUrl: {
      type: String,
      default: ''
    }
  },
  { timestamps: true, versionKey: false }
);

export const userProfileModel = model<IUserProfile>('userProfiles', userProfileSchema);

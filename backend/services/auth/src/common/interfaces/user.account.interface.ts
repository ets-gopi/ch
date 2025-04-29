import { UserRole } from '../enums/user.enums';

// creating an interface representing a user document in Mongodb.
export interface IUserAccount {
  email: string;
  password: string;
  roles: UserRole[];
  userId: string;
  is_email_verified?: boolean;
  email_verification_otp?: string | null;
  email_verification_token?: string | null;
  email_verification_expires?: Date | null;
  email_verified_at?: Date;
  reset_password_token?: string | null;
  reset_token_expires?: Date | null;
  reset_password_verified_at?: Date;
}

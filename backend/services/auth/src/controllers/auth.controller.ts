import { NextFunction, Request, Response } from 'express';
import { userAccountModel } from '../common/models/user.model';
import { UserAuthAccountValidation } from '../common/Joi/userValidations/users.joi';
import { JwtService } from '../common/jwt/jwtHelper';
import createError from 'http-errors';
import { IUser } from '../common/interfaces/user.interface';
import { ErrorConstants } from '../common/constants';
import { HydratedDocument } from 'mongoose';
import PublisherChannel from '../common/rabbitMq/channels/publishers/auth.publisher';

export const signup = (req: Request, res: Response) => {
  res.json({ message: 'User signed up' });
};

export const login = (req: Request, res: Response) => {
  // Login logic here (check password, return JWT)
  res.json({ token: 'jwt-token-example' });
};

class UserAuthAccountController {
  private authModel = userAccountModel;
  private userAuthAccountValidator: UserAuthAccountValidation;
  private jwtService: JwtService;
  private publisherChannel: PublisherChannel;

  constructor() {
    this.userAuthAccountValidator = new UserAuthAccountValidation();
    this.jwtService = new JwtService();
    this.publisherChannel = new PublisherChannel();
  }

  // Registers a new user.
  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    let token: string | null = null;
    try {
      // validate the request body.
      await this.userAuthAccountValidator.validate({ email, password }, UserAuthAccountValidation.schemas.registerSchema);
      const isUserExist: HydratedDocument<IUser> | null = await this.authModel.findOne({ email: email });
      if (isUserExist) {
        throw createError(409, { message: 'Email Is Already Exists.', errorCode: ErrorConstants.ERROR_DUPLICATE_ENTRY });
      } else {
        const newUser: HydratedDocument<IUser> = await this.authModel.create({ email: email, password: password });
        await newUser.save();

        await this.publisherChannel.publish('AUTH_SIGNUP', { data: { email: newUser.email } });

        res.locals.responseMessage.responseSuccess(
          req,
          res,
          201,
          'User has been successfully registered, and an OTP has been sent.',
          {
            email: newUser.email,
            token: token
          },
          res.locals.requestId
        );
      }
    } catch (error: any) {
      if (error.code === 11000) {
        const duplicateFeild = Object.keys((error as any).keyPattern || {})[0];
        next(createError(409, { message: `${duplicateFeild} is already in use.`, errorCode: ErrorConstants.ERROR_DUPLICATE_ENTRY }));
      } else {
        next(error);
      }
    }
  };
}

export default UserAuthAccountController;

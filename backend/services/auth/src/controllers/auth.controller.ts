import { NextFunction, Request, Response } from 'express';
import { userAccountModel } from '../common/models/user.model';
import { UserAccountValidation } from '../common/Joi/userValidations/users.joi';
import { JwtService } from '@libs/jwt/src';
import createError from 'http-errors';
import { IUserAccount } from '../common/interfaces/user.account.interface';
import { ErrorConstants } from '@common/constants/src';
import { HydratedDocument } from 'mongoose';
import PublisherChannel from '../common/rabbitMq/channels/publishers/auth.publisher';
import { v4 as uuidv4 } from 'uuid';

export const login = (req: Request, res: Response) => {
  // Login logic here (check password, return JWT)
  res.json({ token: 'jwt-token-example' });
};

class UserAccountController {
  private authModel = userAccountModel;
  private userAuthAccountValidator: UserAccountValidation;
  private jwtService: JwtService;
  private publisherChannel: PublisherChannel;

  constructor() {
    this.userAuthAccountValidator = new UserAccountValidation();
    this.jwtService = new JwtService();
    this.publisherChannel = new PublisherChannel();
  }

  // Registers a new user.
  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    let token: string | null = null;
    try {
      // validate the request body.
      await this.userAuthAccountValidator.validate({ email, password }, UserAccountValidation.schemas.registerSchema);
      const isUserExist: HydratedDocument<IUserAccount> | null = await this.authModel.findOne({ email: email });
      if (isUserExist) {
        throw createError(409, { message: 'Email Is Already Exists.', errorCode: ErrorConstants.ERROR_DUPLICATE_ENTRY });
      } else {
        const id = uuidv4();
        const newUser: HydratedDocument<IUserAccount> = await this.authModel.create({ email: email, password: password, userId: id });
        await newUser.save();
        // generate a access token.
        token = await this.jwtService.signAccessToken(id);

        // send the token as http-only cookie.
        res.cookie('accesstoken', token, {
          path: '/',
          secure: false,
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        //await this.publisherChannel.publish('AUTH_SIGNUP', { data: { email: newUser.email } });

        res.locals.responseMessage.responseSuccess(req, res, 201, 'User has been successfully registered.', null, res.locals.requestId);
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

export default UserAccountController;

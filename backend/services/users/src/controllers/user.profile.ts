import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { userProfileModel } from '../common/models';
import { UserProfileValidation } from '../common/Joi';
import { IUserProfile } from '../common/interfaces';
import { ErrorConstants } from '@common/constants/src';
import { PublisherChannel } from '../common/rabbitMq';

export class UserProfileController {
  private profileModel = userProfileModel;
  private userProfileValidator: UserProfileValidation;
  private publisherChannel: PublisherChannel;

  constructor() {
    this.userProfileValidator = new UserProfileValidation();
    this.publisherChannel = new PublisherChannel();
  }

  // Registers a new user.
  public createProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.userProfileValidator.validate(req.body, UserProfileValidation.schemas.profileSchema);
    } catch (error) {}
  };
}

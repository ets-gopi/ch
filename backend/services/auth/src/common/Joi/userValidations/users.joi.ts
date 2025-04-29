import Joi, { ObjectSchema, ValidationErrorItem } from 'joi';
import createError from 'http-errors';
import { ErrorConstants } from '@common/constants/src';
import { joiErrorMap } from '../joiErrorMap';
export class UserAccountValidation {
  public static schemas: Record<string, ObjectSchema> = {
    registerSchema: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    }),
    loginSchema: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    sendOTPSchema: Joi.object({
      email: Joi.string().email().required(),
      token: Joi.string().required()
    }),
    verifyOTPSchema: Joi.object({
      email: Joi.string().email().required(),
      token: Joi.string().required(),
      otp: Joi.string().length(8).required()
    }),
    forgotPasswordSchema: Joi.object({
      email: Joi.string().email().required()
    })
  };

  private formatJoiErrors(errorDetails: ValidationErrorItem[]) {
    const formatErros = errorDetails.map((detail, ind) => {
      const field = detail.path.join('.');
      const type = detail.type;
      const map = joiErrorMap[type] || {
        errorCode: ErrorConstants.ERROR_INVALID_FIELD_FORMAT,
        message: 'Invalid input.'
      };

      const code = field === 'password' ? ErrorConstants.ERROR_PASSWORD_TOO_SHORT : map.errorCode;
      const regex = new RegExp('\\{#(\\w+)\\}', 'g');
      const renderedMsg = map.message.replace(regex, (_, key) => {
        return detail.context?.[key] ?? '';
      });
      return {
        field,
        type,
        errorCode: code,
        message: renderedMsg
      };
    });
    return formatErros;
  }

  public async validate(data: any, schema: ObjectSchema) {
    try {
      await schema.validateAsync(data, {
        abortEarly: false
      });
    } catch (error: any) {
      if (Joi.isError(error)) {
        throw createError(400, {
          message: 'Validation Error',
          error: this.formatJoiErrors(error.details),
          errorCode: ErrorConstants.ERROR_INVALID_FIELD_FORMAT
        });
      } else {
        throw createError(500, { message: `Internal Server Issue.`, errorCode: ErrorConstants.ERROR_SERVER_ERROR });
      }
    }
  }
}

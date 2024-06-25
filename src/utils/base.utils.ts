import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export const handleAsyncError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const validate =
  (schema: Joi.ObjectSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate({
      ...req.body,
      ...req.params,
      ...req.query,
    });

    if (error) {
      // one error at a time
      return next(
        new HttpError(error.details.at(0)?.message || "Validation error", 400)
      );
    }

    next();
  };

export const UUIDSchema = Joi.string().uuid({ version: "uuidv4" });

export const PaginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .optional()
    .allow(...[null, ""]),
  limit: Joi.number()
    .integer()
    .min(1)
    .optional()
    .allow(...[null, ""]),
  order: Joi.string()
    .valid("ASC", "DESC")
    .optional()
    .allow(...[null, ""]),
});

export const validateParamsIds = (ids: string[]) => {
  return validate(
    Joi.object(
      ids.reduce(
        (acc, id) => ({
          ...acc,
          [id]: UUIDSchema.required(),
        }),
        {}
      )
    )
  );
};

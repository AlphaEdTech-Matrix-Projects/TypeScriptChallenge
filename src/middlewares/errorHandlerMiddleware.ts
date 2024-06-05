import { ErrorRequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

export const ErrorHandlerMidleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  const name = err.name || "Error Internal";
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server error";
  const error = process.env.APP_ENV === "dev" ? err.stack : "";

  switch (err.constructor) {
    case JsonWebTokenError:
      statusCode = 401;
      break;
    case ZodError:
      statusCode = 400;
      message = JSON.parse(err.message)[0].message;
      break;
  }

  res.status(statusCode).send({ name, message, stack: error });
};

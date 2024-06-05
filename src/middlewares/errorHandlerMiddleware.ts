import { ErrorRequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

export const ErrorHandlerMidleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  switch (err.constructor) {
    case JsonWebTokenError:
      err.statusCode = 401;
      break;
  }

  const name = err.name || "Error Internal";
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  const error = process.env.APP_ENV === "dev" ? err.stack : "";

  res.status(statusCode).send({ name, message, stack: error });
};

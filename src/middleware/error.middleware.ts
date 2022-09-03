import { Request, Response, NextFunction } from "express";
import HttpExcemption from "@/utils/excemptions/http.excemption";

function errorMiddleware(
  error: HttpExcemption,
  req: Request,
  res: Response,
  next: NextFunction
):void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).send(
    {
        status,
        message
    }
  );
}

export default errorMiddleware;
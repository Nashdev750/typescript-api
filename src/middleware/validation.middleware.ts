import {Request, Response,NextFunction,RequestHandler} from "express";
import Joi from 'joi'


function validationMiddleware(schema:Joi.Schema): RequestHandler {
 return async(
  req: Request,
  res: Response,
  next: NextFunction
 ):Promise<void>=>{
  const validationoptions = {
    abortEarly:false,
    allowUnknown:true,
    stripUnknown:true,
  }
  try {
    const value = await schema.validateAsync(
        req.body,
        validationoptions
    );
    req.body = value
    next();
  } catch (e:any) {
    const errors: string[] = []
    e.details.forEach((error: Joi.ValidationError) => {
        errors.push(error.message)
    });
    res.status(400).send({error:errors})
  }
 }
}
export default validationMiddleware
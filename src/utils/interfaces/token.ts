import jwt from 'jsonwebtoken'
import Token from './token.interface'
import User from '../../resources/user/user.interface'

const createToken = (user: User): String =>{
 return jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET as jwt.Secret,{
    expiresIn: '1d'
 })
}

const verifyToken = (token: string): Promise<jwt.VerifyErrors | Token> =>{
  return new Promise((resolve, reject) => {
    jwt.verify(token,process.env.JWT_SECRET as jwt.Secret, (error, user)=>{
        if(error) reject(error);
        resolve(user as Token)
    })
  })
}

export default {createToken, verifyToken}
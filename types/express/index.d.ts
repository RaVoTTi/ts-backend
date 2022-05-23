import express from "express";
import { IUser } from '../../user/user.models';

// declare namespace Express {
//   interface Request {
//     user?: IUser;
//   }
// }
// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: IUser
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
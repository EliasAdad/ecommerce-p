import { NextFunction, Request, Response } from "express";

export const globalLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Method: ${req.method}, Route: ${req.url}, Time: ${new Date().toISOString()}`)
    next();
}
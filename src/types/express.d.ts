import { Request } from "express";
import { Role } from "../interfaces/roles";


export interface CustomRequest extends Request{
    userId?: string
    userRole?:Role
}
import { Document } from 'mongoose';

export interface UserModel{
  _id: string,
  name: string,
  email:string,
  password: string,
  document: string,
  phone: string,
}

export interface UserInterface extends Document{
  _id: string,
  name: string,
  email:string,
  password: string,
  document: string,
  phone: string,
}

import { Schema } from "mongoose";

export default interface User {
    _id: Schema.Types.ObjectId;
    email: string,
    password: string,
}
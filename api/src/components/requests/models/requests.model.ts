import { IRequest } from "../types/Requests.types";
import { Schema, model } from "mongoose";

const RequestSchema = new Schema<IRequest>({
    isActive: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: String,
        enum: [
            "Web Landing",
            "Web Pro",
            "Web Business",
            "Ecommerce",
            "System",
            "Hosting"
        ],
    },
    description: {
        type: String,
    },
    telefono: {
        type: String,
    },
    ticket: {
        type: String
    }
}, {
    timestamps: true
});

export default model<IRequest>("Request", RequestSchema);

import { IBranch } from "src/app/constants/branches";

export interface IPartner {
    _id: string;
    name: string;
    branches: IBranch[];
    rating: number;
    address: string;
    description: string;
}
import { Point } from "./party";
import { Socket } from "net";

export class Player {
    public socketId: string;

    constructor(public position: Point, socket: Socket) {
        this.socketId = (socket as any).id;
        console.log(this.socketId);
    }

}


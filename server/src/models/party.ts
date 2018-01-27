import { Player } from "./player";
import { Socket } from "net";


export class Point {
    public x: number;
    public y: number;
}

export class Size {
    public w: number;
    public h: number;
}

export class Party {
    public players: Player[] = [];
    public obstacles: Point[] = [];
    public size: Size = { w: 25, h: 19 };

    public addPlayer(socket: Socket): any {
        let slots = [
            { x: 0, y: 0 },
            { x: this.size.w - 1, y: 0 },
            { x: 0, y: this.size.h - 1 },
            { x: this.size.w - 1, y: this.size.h - 1 },
        ];

        let availableSlots = slots.filter((slot) => {
            return !this.players.find((player) => {
                return player.position.x === slot.x || player.position.y === slot.y
            });
        });

        let slot = slots[0];
        if (availableSlots.length > 0) slot = availableSlots[0];

        let player = new Player(slot, socket);
        this.players.push(player);
        return slot;
    }

    public removePlayer(socketId: string): Player {
        return undefined;
    }
}

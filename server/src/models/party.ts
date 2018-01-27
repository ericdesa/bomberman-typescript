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
    public walls: Point[] = [];
    public size: Size = { w: 25, h: 19 };

    constructor() {
        this.setupObstacles();
    }

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

    public setupObstacles() {
        for (let x = 2; x < this.size.w - 2; x++) {
            for (let y = 1; y < this.size.h - 1; y++) {
                if ((y % 2 === 0 && x % 2 === 0) || (y % 2 !== 0)) {
                    if ((x > 3 || y > 2) &&
                        (x < this.size.w - 4 || y < this.size.h - 3) &&
                        (x > 3 || y < this.size.h - 3) &&
                        (x < this.size.w - 4 || y > 2) &&
                        (Math.random() < 0.4)
                    ) {
                        this.obstacles.push({ x: x, y: y });
                    }
                }
            }
        }
    }
}

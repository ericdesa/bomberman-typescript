import { createServer, Server } from 'http';

import * as express from 'express';
import * as socketIo from 'socket.io';
import { Socket } from 'net';

// import { Player } from './models/player';
import { Party } from './models/party';

// const EventNewPlayer = 'NewPlayer';
const EventRemovePlayer = 'RemovePlayer';

const EventMovePlayer = 'MovePlayer';
const EventDropBomb = 'DropBomb';

const EventParty = 'Party';

export class ChatServer {
    protected app: express.Application;
    protected server: Server;
    protected io: SocketIO.Server;
    protected port = 8080;

    protected party = new Party();

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
        this.listen();
    }

    protected listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: Socket) => {
            let player = this.party.addPlayer(socket);
            console.log(player);
            this.io.emit(EventParty, this.party);
        });

        this.io.on(EventMovePlayer, (message: any) => {
            console.log(EventMovePlayer);
            this.io.emit(EventMovePlayer, message);
        });

        this.io.on(EventDropBomb, (message: any) => {
            console.log(EventDropBomb);
            this.io.emit(EventDropBomb, message);
        });

        this.io.on(EventRemovePlayer, (message: any) => {
            console.log(EventRemovePlayer);
            this.io.emit(EventRemovePlayer, message);
        });

        this.io.on('disconnect', () => {
            console.log('Client disconnected');
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
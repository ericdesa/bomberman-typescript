import { ChatServer } from './chat-server';

let app = new ChatServer().getApp();
export { app };

export class User {
    constructor(public name: string) {
    }
}

export class Message {
    constructor(public from: User, public content: string) {
        console.log(from, content);
    }
}

export class ChatMessage extends Message {
    constructor(from: User, content: string) {
        super(from, content);
    }
}
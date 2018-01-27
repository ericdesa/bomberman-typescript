import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class SocketService {
  private ioConnection;

  constructor() {
    this.initSocket();

    this.ioConnection = this.onMessage()
      .subscribe((message: string) => {
        console.log('received:', message);
      });
  }

  public initSocket() {
    this.ioConnection = socketIo(SERVER_URL);
  }

  public send(message: string) {
    this.ioConnection.emit('message', message);
  }

  public onMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.ioConnection.on('Party', (data: string) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.ioConnection.on(event, () => observer.next());
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class SocketService {
  private ioConnection;

  public initSocket() {
    this.ioConnection = socketIo(SERVER_URL);
  }

  public send(message: string) {
    this.ioConnection.emit('message', message);
  }

  public onPartyInitialized(): Observable<string> {
    return new Observable<string>(observer => {
      this.ioConnection.on('Party', (data: any) => observer.next(data));
    });
  }
}

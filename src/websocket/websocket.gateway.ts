import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { WebsocketService } from './websocket.service';
import { CreateWebsocketDto } from './dto/create-websocket.dto';
import { UpdateWebsocketDto } from './dto/update-websocket.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`client conected ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`client disconnected ${client.id}`);
  }

  constructor(private readonly websocketService: WebsocketService) {}
  @SubscribeMessage('createWebsocket')
  create(@MessageBody() createWebsocketDto: CreateWebsocketDto) {
    return this.websocketService.create(createWebsocketDto);
  }

  @SubscribeMessage('findAllWebsocket')
  findAll() {
    return this.websocketService.findAll();
  }

  @SubscribeMessage('findOneWebsocket')
  findOne(@MessageBody() id: number) {
    return this.websocketService.findOne(id);
  }

  @SubscribeMessage('updateWebsocket')
  update(@MessageBody() updateWebsocketDto: UpdateWebsocketDto) {
    return this.websocketService.update(
      updateWebsocketDto.id,
      updateWebsocketDto,
    );
  }

  @SubscribeMessage('removeWebsocket')
  remove(@MessageBody() id: number) {
    return this.websocketService.remove(id);
  }
}

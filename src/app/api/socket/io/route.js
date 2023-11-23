import { Server } from "socket.io";
import cors from 'cors'
import { NextResponse } from "next/server";


export async function GET(req, res) {

  try {
    const io = new Server(3003, {
      cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
      }
    })
    io.on('connection', (socket) => {
      const clientId = socket.id;
      console.log('A client connected');
      console.log(`A client connected. ID: ${clientId}`);
      // io.emit('client-new', clientId);
      socket.on('notify-you', (data) => {
        console.log('Notified by socket ==> ' + data)
        io.emit('notify-you', data);
      })
      socket.on('client-new', (data) => {
        console.log('New client login ==> ' + data)
        io.emit('client-new', data);
      })
      socket.on('message', (data) => {
        console.log('Received message:', data);
      });

      // Event handler for client disconnections
      socket.on('disconnect', () => {
        console.log('A client disconnected.');
      });
    })
    //
    // corsMiddleware(req, res, () => {
    //   res.socket.server.io = io;
    //   res.end();
    // });
    return NextResponse.json('OK')
  } catch (e) {
    console.log(e)
    return NextResponse.json('Server might already running', 500)
  }




}

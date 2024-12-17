"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const socket_io_1 = require("socket.io");
let io;
exports.socket = {
    init: (httpServer) => {
        const serverOptions = {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                allowedHeaders: ["Authorization"],
            },
        };
        io = new socket_io_1.Server(httpServer, serverOptions);
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        return io;
    },
};
// import { Server as HttpServer } from 'http';
// import { Server as SocketIOServer, Socket, ServerOptions } from 'socket.io';
// // import { Server as SocketIOServer, Socket, ServerOptions } from 'socket.io';
// let io: SocketIOServer | undefined;
// export const socket = {
//     init: (httpServer: HttpServer): SocketIOServer => {
//       const serverOptions: Partial<ServerOptions> = {
//         cors: {
//           origin: '*',
//           methods: ['GET', 'POST'],
//           allowedHeaders: ['Authorization'],
//         },
//       };
//         io = new SocketIOServer(httpServer, serverOptions);
//         io.on('connection', (socket: Socket) => {
//             console.log('New client connected');
//             socket.on('join', ({ roomId }: { roomId: string }) => {
//                 socket.join(roomId);
//                 console.log(`Client joined room: ${roomId}`);
//             });
//             socket.on('disconnect', () => {
//                 console.log('Client disconnected');
//             });
//         });
//         return io;
//     },
//     getIO: (): SocketIOServer => {
//         if (!io) {
//             throw new Error('Socket.io not initialized!');
//         }
//         return io;
//     }
// };
// // SOcket Auth Ts
// // import { Server as HttpServer } from 'http';
// // import { Server as SocketIOServer, Socket, ServerOptions } from 'socket.io';
// // import jwt, { JwtPayload } from 'jsonwebtoken'; // Add this for token validation
// // import { IncomingMessage } from 'http';
// // let io: SocketIOServer | undefined;
// // interface ExtendedSocket extends Socket {
// //   decoded?: JwtPayload | string;
// // }
// // interface HandshakeWithAuth extends IncomingMessage {
// //   headers: {
// //     authorization?: string;
// //   };
// // }
// // export const socket = {
// //   init: (httpServer: HttpServer): SocketIOServer => {
// //     const serverOptions: Partial<ServerOptions> = {
// //       cors: {
// //         origin: '*',
// //         methods: ['GET', 'POST'],
// //         allowedHeaders: ['Authorization'],
// //       },
// //     };
// //     io = new SocketIOServer(httpServer, serverOptions);
// //     io.use((socket: ExtendedSocket, next) => {
// //       // const handshake = socket.request as HandshakeWithAuth;
// //       // const token = handshake.headers.authorization;
// //     //   if (token) {
// //     //     jwt.verify(token.split(' ')[1], process.env.JWT_SECRET as string, (err, decoded) => {
// //     //       if (err) {
// //     //         return next(new Error('Authentication error'));
// //     //       }
// //     //       socket.decoded = decoded;
// //     //       next();
// //     //     });
// //     //   } else {
// //     //     next(new Error('Authentication error'));
// //     //   }
// //     });
// //     console.log("here");
// //     io.on('connection', (socket: ExtendedSocket) => {
// //       console.log('New client connected');
// //       socket.on('join', ({ roomId }: { roomId: string }) => {
// //         socket.join(roomId);
// //         console.log(`Client joined room: ${roomId}`);
// //       });
// //       socket.on('disconnect', () => {
// //         console.log('Client disconnected');
// //       });
// //     });
// //     return io;
// //   },
// //   getIO: (): SocketIOServer => {
// //     if (!io) {
// //       throw new Error('Socket.io not initialized!');
// //     }
// //     return io;
// //   }
// // };
// // Socket Auth in JS
// // import { Server as HttpServer } from 'http';
// // import { Server as SocketIOServer, Socket } from 'socket.io';
// // import jwt from 'jsonwebtoken'; // Add this for token validation
// // let io;
// // export const socket = {
// //     init: (httpServer: HttpServer): SocketIOServer => {
// //         io = new SocketIOServer(httpServer, {
// //             cors: {
// //                 origin: '*',
// //                 methods: ['GET', 'POST'],
// //                 allowedHeaders: ['Authorization'],
// //             },
// //         });
// //         io.use((socket, next) => {
// //             const token = socket.handshake.headers['authorization'];
// //             if (token) {
// //                 jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
// //                     if (err) {
// //                         return next(new Error('Authentication error'));
// //                     }
// //                     socket.decoded = decoded;
// //                     next();
// //                 });
// //             } else {
// //                 next(new Error('Authentication error'));
// //             }
// //         });
// //         io.on('connection', (socket: Socket) => {
// //             console.log('New client connected');
// //             socket.on('join', ({ roomId }: { roomId: string }) => {
// //                 socket.join(roomId);
// //                 console.log(`Client joined room: ${roomId}`);
// //             });
// //             socket.on('disconnect', () => {
// //                 console.log('Client disconnected');
// //             });
// //         });
// //         return io;
// //     },
// //     getIO: (): SocketIOServer => {
// //         if (!io) {
// //             throw new Error('Socket.io not initialized!');
// //         }
// //         return io;
// //     }
// // };

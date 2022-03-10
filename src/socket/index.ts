import SocketIO from 'socket.io';

let io: SocketIO.Server | null = null;

interface IUserSocket extends SocketIO.Socket {
    username: string;
}

//鉴权
async function AuthUser(socket: IUserSocket, next) {
    await next();
}

export default function (IO: SocketIO.Server) {
    IO.use(AuthUser);
    IO.on('connection', function (socket: IUserSocket) {
        console.log('连接', socket.username);
    });

    io = IO;
}

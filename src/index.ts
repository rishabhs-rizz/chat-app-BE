import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket;
    roomId: string;
}

let Allusers: User[] = [];

wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const ParsedData = JSON.parse(message as unknown as string);
        try{
        if( ParsedData.type == "join"){
            Allusers.push({
                socket,
                roomId: ParsedData.payload.roomId
            })
        }

        if( ParsedData.type == "chat"){
           let CurrentUserRoom =  Allusers.find((x) => x.socket == socket)?.roomId;
        //    Allusers.find((s) => s.roomId == CurrentUserRoom)?.socket.send(ParsedData.payload.message);

        for (let i=0; i<Allusers.length; i++){
            if(Allusers[i].roomId == CurrentUserRoom){
                Allusers[i].socket.send(ParsedData.payload.message);
            }
        }
        } }catch(e){
            console.log(e);
        }

    })
    
})
const Express = require("express")();
const Http = require("http").Server(Express);
const cors = require("cors");
Express.use(cors());
const SocketIO = require("socket.io")(Http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        transports: ["websocket","polling"],
        allowedHeaders: ["custom-header"],
        credentials: true
      },
      allowEIO3: true
});

var players = [];

SocketIO.on("connection", socket => {
    console.log("New socket connected");
    players.push({socket: socket.conn.id})

    socket.on("position", data => {
        console.log("New user position")
        let p = players.find(p => p.socket==socket.conn.id)
        p.name=data.name
        p.type=data.type
        p.wapName=data.wapName
        p.wapType=data.wapType
        p.position=data.position
        SocketIO.emit("players", players);
    })
    
    socket.on("update", data => {
        console.log("Updating user position")
        players.find(p => p.socket==socket.conn.id).position = data
        SocketIO.emit("players", players);
    })

    socket.on("message", message => {
        SocketIO.emit("chat", message)
    })
    socket.on("disconnect", () => {
        console.log("A user disconnected")
        players.splice(players.findIndex(p => p.socket==socket.conn.id),1)
        SocketIO.emit("players", players)
    })
});



Http.listen(3000, ()=> {
    console.log("Listening at port 3000")
});

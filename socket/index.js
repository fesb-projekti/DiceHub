const io = require("socket.io")(3002, {
    cors:{
        origin: "http://localhost:3000",
    },
});


let users = [];

const addUser = (userId, socketId) => {
    !users.some(user=>user.userId === userId) &&
    users.push({userId, socketId});
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

io.on("connection", (socket) =>{
    console.log("a user connected")
    //take userID and socketID from user
    socket.on("addUser", userId =>{
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    });

    socket.on("disconnect", () =>{
        console.log("user disconnected")
        removeUser(socket.id);
    });
    
});
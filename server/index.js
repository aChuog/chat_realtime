const http = require("http");
var express = require('express');
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  }
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
  console.log("New client connected " + socket.id);

  socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected "); // Khi client disconnect thì log ra terminal.
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server đang chay tren port ${PORT}`);
});

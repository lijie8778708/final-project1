// import package
const net = require("net");

// create server object
const server = net.createServer();

//  waitting for connection
server.on("connection", (sock) => {
  console.log(
    "client connected, address - ",
    sock.remoteAddress,
    "port - ",
    sock.remotePort
  );
  sock.setEncoding("utf8");
  sock.on("data", (data) => {
    console.log("got data from client - " + data);
    sock.write(data);
  });

  sock.on("end", () => {
    console.log("client disconnect");
  });
});

server.maxConnections = 1;
// listening on port 3333
server.listen(3333, () => {
  console.log("server is hosting on port 3333");
});

const net = require("net");

const server = net.createServer();

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
server.listen(3333, () => {
  console.log("server is hosting on port 3333");
});

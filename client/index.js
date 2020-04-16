const net = require("net");
const readline = require("readline");

console.log("Type exit or quit to quit ");
let sock = net.connect({ port: 3333 }, () => {
  console.log("server connected");
  sock.setEncoding("utf8");
  sock.write("Client connected");
});

sock.on("data", (data) => {
  console.log("Got data from server - ", data);
});
sock.on("end", () => {
  console.log("client disconnected");
});
sock.on("close", () => {
  console.log("client wa closed");
  process.exit();
});
var r1 = readline.createInterface({
  input: process.stdin,
});

function quitEcho() {
  r1.close();
  sock.end();
  console.log("quit client");
}
r1.on("line", (cmd) => {
  if (cmd.indexOf("quit") == 0 || cmd.indexOf("exit") == 0) {
    quitEcho();
  } else {
    sock.write(cmd + "\r\n");
  }
});
r1.on("sigint", quitEcho);

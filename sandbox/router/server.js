import app, { getProxy } from "./src/app.js";


const server = app.listen(3000, () => {
    console.log('Sandbox router server is running on port 3000');
});

server.on('upgrade', (req, socket, head) => {
    const host = req.headers.host;
    if (!host) {
        socket.destroy();
        return;
    }
    const sandboxId = host.split('.')[0];
    const proxy = getProxy(sandboxId);
    
    if (proxy && proxy.upgrade) {
        proxy.upgrade(req, socket, head);
    } else {
        socket.destroy();
    }
});
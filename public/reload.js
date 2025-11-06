(() => {
    const socket = new WebSocket('ws://localhost:5500');
    socket.onmessage = (event) => {
        if (event.data === 'reload') {
            location.reload();
        }
    };
})();

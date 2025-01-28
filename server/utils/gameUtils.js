const WebSocket = require('ws');

const startGameCountdown = (lobbyId, countdown, lobbiesWS, clients, onComplete) => {
    let currentCountdown = countdown;
    const intervalId = setInterval(() => {
        lobbiesWS.get(lobbyId)?.forEach(memberId => {
            const ws = clients.get(memberId);
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'countdown', value: currentCountdown }));
            }
        });

        currentCountdown--;

        if (currentCountdown < 0) {
            clearInterval(intervalId);
            onComplete();
        }
    }, 1000); 
};

module.exports = {
    startGameCountdown
};
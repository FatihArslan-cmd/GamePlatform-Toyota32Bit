const { sessionStore } = require('../../config/sessionConfig');
const generateTombalaCard = require('../../utils/generateTombalaCard'); // Yeni dosya oluşturulacak
const lobbyManager = require('./lobbyManager'); // Import lobbyManager to use getLobbiesFromSession and saveLobbiesToSession

const lobbyGameManager = {
    startGame: (lobbyCode, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }
            if (lobby.gameStarted) {
                return callback(new Error('Oyun zaten başladı'));
            }
            if (lobby.members.length < 2) {
                return callback(new Error('Oyunu başlatmak için en az 2 oyuncu gerekli'));
            }

            lobby.gameStarted = true;
            lobby.drawnNumbers = [];
            lobby.currentNumber = null;
            lobby.numberPool = Array.from({ length: 90 }, (_, i) => i + 1);
            lobby.bingoCards = {};
            lobby.markedNumbers = {}; // Oyuncuların işaretlediği numaraları tutacak obje eklendi. UserID -> {row-col: true} şeklinde

            lobby.members.forEach(member => {
                lobby.bingoCards[member.id] = generateTombalaCard();
                lobby.markedNumbers[member.id] = {}; // Her oyuncu için işaretli numaralar objesi oluşturuluyor
            });

            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby);
            });
        });
    },

    drawNumber: (lobbyCode, userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }
            if (!lobby.gameStarted) {
                return callback(new Error('Oyun henüz başlamadı'));
            }
            if (lobby.ownerId !== userId) {
                return callback(new Error('Sadece oda sahibi sayı çekebilir'));
            }
            if (lobby.numberPool.length === 0) {
                return callback(new Error('Çekilecek sayı kalmadı'));
            }

            const randomIndex = Math.floor(Math.random() * lobby.numberPool.length);
            const drawnNumber = lobby.numberPool.splice(randomIndex, 1)[0];
            lobby.drawnNumbers.push(drawnNumber);
            lobby.currentNumber = drawnNumber;

            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby, drawnNumber);
            });
        });
    },

    markNumberOnCard: (lobbyCode, userId, number, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }
            if (!lobby.gameStarted) {
                return callback(new Error('Oyun henüz başlamadı'));
            }
            if (!lobby.bingoCards[userId]) {
                return callback(new Error('Kullanıcıya ait tombala kartı bulunamadı'));
            }

            const card = lobby.bingoCards[userId];
            let cellPosition = null;

            for (let row = 0; row < card.length; row++) {
                for (let col = 0; col < card[row].length; col++) {
                    if (card[row][col] === number) {
                        cellPosition = `${row}-${col}`;
                        break;
                    }
                }
                if (cellPosition) break; // Sayı bulunduysa döngüden çık
            }

            if (!cellPosition) {
                return callback(new Error('Sayı kullanıcının kartında bulunamadı')); // Sayı kartta yoksa hata
            }

            if (lobby.markedNumbers[userId][cellPosition]) {
                return callback(new Error('Bu sayı zaten işaretli')); // Sayı zaten işaretliyse hata dön
            }

            lobby.markedNumbers[userId][cellPosition] = true; // Sayıyı işaretle


            const isBingo = lobbyGameManager.checkBingo(card, lobby.markedNumbers[userId]); // Bingo kontrolü
            lobbyManager.saveLobbiesToSession(lobbies, (err) => {
                if (err) return callback(err);
                callback(null, lobby, isBingo, number, cellPosition); // isBingo ve işaretlenen sayı ve pozisyonu callback ile geri döndür
            });
        });
    },

    checkBingo: (card, markedNumbersForUser) => {
        const markedPositions = Object.keys(markedNumbersForUser);
        if (markedPositions.length < 15) return false; // 15 sayı işaretlenmeden bingo olmaz

        let markedCount = 0;
        for (let row = 0; row < card.length; row++) {
            for (let col = 0; col < card[row].length; col++) {
                if (card[row][col] !== null && markedNumbersForUser[`${row}-${col}`]) {
                    markedCount++;
                }
            }
        }
        return markedCount === 15; // Karttaki tüm sayılar işaretliyse bingo
    },


    getLobbyGameData: (lobbyCode, userId, callback) => {
        lobbyManager.getLobbiesFromSession((err, lobbies) => {
            if (err) return callback(err);

            const lobby = Object.values(lobbies).find((l) => l.code === lobbyCode);
            if (!lobby) {
                return callback(new Error('Lobby bulunamadı'));
            }

            const gameData = {
                gameStarted: lobby.gameStarted,
                drawnNumbers: lobby.drawnNumbers,
                currentNumber: lobby.currentNumber,
                bingoCard: lobby.bingoCards ? lobby.bingoCards[userId] || null : null,
                markedNumbers: lobby.markedNumbers ? (lobby.markedNumbers[userId] || {}) : {}, // markedNumbers için kontrol eklendi
            };
            callback(null, gameData);
        });
    },
};

module.exports = lobbyGameManager;
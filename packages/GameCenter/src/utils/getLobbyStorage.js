import { storage } from "./storage";

export const getStoredLobbyCode = async () => {
    try {
        return storage.getString('lastLobbyCode');
    } catch (error) {
        console.error("MMKV error retrieving last lobby code:", error);
        return null;
    }
};

export const clearStoredLobbyCode = async () => {
    try {
        await storage.delete('lastLobbyCode');
        console.log("Last lobby code cleared from MMKV via utility.");
    } catch (error) {
        console.error("MMKV error clearing last lobby code via utility:", error);
    }
};
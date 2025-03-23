import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

//
const dbName = "app.db";
const dbAsset = Asset.fromModule(require("../assets/app.db")); //Loads database from file
const dbDestinationPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;//Device storage

//Copy database
const copyDatabase = async () => {

    //If file exists in users system
    const fileExists = await FileSystem.getInfoAsync(dbDestinationPath);

    if (!fileExists.exists) {
        console.log("Copying database from assets...");

        //Create directory
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite/`, { intermediates: true });

        
        await FileSystem.downloadAsync(dbAsset.uri, dbDestinationPath)
            .then(() => console.log("Database copied successfully"))
            .catch((error) => console.error("Error copying database:", error));
    } else { //File doesn't exist
        console.log("Database already exists in the device storage");
    }
};


/*
// Open the copied database
export const openDatabase = async () => {
    await copyDatabase();
    return SQLite.openDatabase(dbName);
};
*/
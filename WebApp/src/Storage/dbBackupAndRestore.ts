import { db } from './indexDbGateway';

import { exportToJson, importFromJson, clearDatabase } from './internal-idb-backup-and-restore.js'


// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], { type: type });

    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

export const backup = async () => {
    const result = await exportToJson(db);
    console.log({ result })
    try {
        download(result, 'worshipStudio.bak', 'bak')
    } catch (e) {
        alert('An error occured on attempting to download backup')
    }
};

export const restore = async (fileText: string) => {
    try {
        await importFromJson(db, fileText);
    } catch (e) {
        alert('An error occured on attempting to restore backup')
    }
}

export const clearAll = async () => {
    try {
        await clearDatabase(db);
    } catch (e) {
        alert('An error occured when attempting to delete all data')
    }
}


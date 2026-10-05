const fs = require('node:fs');


export function readFile(path: String): Promise<String>
{
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err: String, data: String) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}
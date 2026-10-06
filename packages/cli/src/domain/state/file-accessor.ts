const fs = require("node:fs");

export function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err: string, data: string) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

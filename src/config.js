const path = require('path');
const fs = require('fs');
const os = require('os');

let config;
if (process.env.NODE_ENV !== 'production') {
    config = require('../config.json');
    config.__dirname = path.resolve(__dirname, '../');
} else {
    let filepath = path.resolve(process.cwd(), 'mockit.config.json');
    if (fs.existsSync(filepath)) {
        config = JSON.parse(fs.readFileSync(filepath));
    } else {
        const home = os.homedir();
        const name = '.mockit';
        const dir = path.resolve(home, name);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } else if (!fs.lstatSync(dir).isDirectory()) {
            throw new Error(`${name} is not a directory`);
        }

        filepath = path.resolve(dir, 'config.json');
        if (!fs.existsSync(filepath)) {
            fs.writeFileSync(
                filepath,
                fs.readFileSync(path.resolve(__dirname, '../config.json'))
            );
        }
        config = JSON.parse(fs.readFileSync(filepath));
    }

    config.__dirname = path.basename(filepath);
}

if (!path.isAbsolute(config.db.file)) {
    config.db.file = path.resolve(config.__dirname, config.db.file);
}

module.exports = config;

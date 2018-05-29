import fs               from 'fs'
import path             from 'path'
import redis            from 'redis'
import config           from './../config/redis.config'

const config_file_path = './../config/redis.config';

const config_file = path.join(__dirname, config_file_path);

const test = ({ host, port, family, db, password }) => new Promise((resolve, reject) => {
    const client = redis.createClient({ host, port, family, db });
    pass && client.auth(password);
    client.on('connect', () => resolve());
    client.on('end', () => reject());
    client.on('error', err => reject(err));
});

const init = (options) => new Promise((resolve, reject) => {
    fs.writeFile(config_file, JSON.stringify(options, null, 2), (err) => {
        err ? reject(err) : resolve(true)
    })
});

let redis_client = null;

const connect = () => new Promise(async (resolve, reject) => {
    if (redis_client) return resolve(redis_client);
    try {
        const { host, port, db, family, password } = config;
        const client = redis.createClient({ host, port, family, db });
        password && client.auth(password);
        client.on('connect', () => {
            redis_client = client;
            resolve(client)
        });
        client.on('error', e => reject(e))
    } catch (e) {
        reject(e)
    }
});

const set = (key, value) => new Promise(async (resolve, reject) => {
    try {
        let client = await connect();
        client.set(key, value, (err) => {
            if (err) return reject(err);
            return resolve(client);
        })
    } catch (e) {
        reject(e)
    }
});

const get = (key) => new Promise(async (resolve, reject) => {
    try {
        let client = await connect();
        client.get(key, (err, res) => {
            if (err) return reject(err);
            return resolve(res);
        })
    } catch (e) {
        reject(e)
    }
});

export default {
    set,
    get,
    test,
    init,
    connect,
}
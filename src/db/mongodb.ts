import { MongoClient, Db } from 'mongodb';
import config from 'config';

interface ICONF {
    url: string;
    user: string;
    reset: string;
    name: string;
    pwd: string;
}

const cfg: ICONF = config.get('mongodb');

let dbMg: Db | null = null;

async function connect() {
    let options = {};
    if (cfg.user) {
        options = {
            authSource: cfg.name,
            auth: {
                username: cfg.user,
                password: cfg.pwd,
            },
        };
    }
    const client = await MongoClient.connect(cfg.url, options);
    console.log('MongoDB连接成功', cfg.url);
    dbMg = client.db(cfg.name);
    return dbMg;
}

connect();

export default async function () {
    if (dbMg) return dbMg;
    return connect();
}

import MGDB from '../db/mongodb';

//文档库
const USER_DB_NAME = 'test';

// 默认的用户信息
const def: IUserInfo = {
    userid: 0,
    nickname: '',
    username: '',
    title: '',
    title_level: 0,
};

interface IUserInfo {
    userid: number;
    nickname: string;
    username: string;
    title: string; //称号
    title_level: number;
}

// 获取可用的doc数据库对象
async function getUserInfoDB() {
    const db = await MGDB();
    const doc = db.collection(USER_DB_NAME);
    return doc;
}

/**
 * 创建默认的用户文档
 */
export async function CreateUserInfo(userid, nickname, username) {
    const doc = await getUserInfoDB();
    const model: IUserInfo = Object.assign({}, def, { userid, nickname, username });
    await doc.insertOne({
        username,
        userid,
        nickname,
    });
    return model;
}

/**
 * 获取用户信息
 * @param userid id
 */
export async function GetUserBaseInfo(userid: string | number) {
    const doc = await getUserInfoDB();
    const data = await doc.findOne({ userid: Number(userid) });
    return data;
}

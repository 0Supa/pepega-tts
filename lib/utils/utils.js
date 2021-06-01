const { pool, redis } = require('../misc/connections.js')

exports.query = async (query, data = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await pool.getConnection()
            const res = await conn.query(query, data)
            conn.end()
            resolve(res)
        } catch (err) {
            reject(err)
            console.error(err)
        }
    })
};

exports.redis = redis;
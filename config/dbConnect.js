const sql = require('mssql')
const { sqlConfig } = require('./db');

// const dbConnect = async () => {
async function dbConnect() {
    try {
        await sql.connect(sqlConfig);
        console.log('Connected to the database.');
        return sql;
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        throw error;
    }
}

module.exports = { dbConnect };

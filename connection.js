import sql from 'mssql'

const dbSetings = {

    user: "root",
    password: "",
    server: "localhost",
    database: "sigloXXI",
    Option: {
        encrypt: false,
        trustServerCertificate: true,
    }

};


export const getConecction = async () => {
    try {
        const pool = await sql.connect(dbSetings)
        return pool;
    } catch (error) {
        console.error(error);
    }

};
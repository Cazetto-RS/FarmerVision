import mysql from 'mysql2/promise';
import { db } from "../config/config.js";

const pool = mysql.createPool({
    host: db.host,
    user: db.user,
    database: db.name,
    password: db.password,
    waitForConnections: db.waitForConnections, //Se deve ou não esperar por uma conexão disponível quando o limite de conexões for atingido.
    connectionLimit: db.connectionLimit, //O número máximo de conexões simultâneas permitidas no pool.
    queueLimit: db.queuelimit, //O número máximo de consultas que podem ficar na fila de espera quando todas as conexões estão ocupadas.
    connectTimeout: db.connectTimeout // Tempo máximo para estabelecer a conexão
});
console.log(db);
export default pool;
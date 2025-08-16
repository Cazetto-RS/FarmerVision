const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'farmervision'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        process.exit(1); // encerra o app se não conectar
    }
    console.log('✅ Conectado ao banco MySQL');
});

module.exports = db;
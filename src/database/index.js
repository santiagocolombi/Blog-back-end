const { Client } = require('pg');


const client = new Client({
    host: 'localhost',
    port: 5432, //porta é sempre a do lado esquerdo do comando grande do docker run
    user: 'root',
    password: 'root',
    database: 'blog',

});
client.connect();

exports.query = async (query, values ) => {
    const { rows } = await client.query(query, values);  //isso que permite execução de comandos sql como os de
    return rows;                                         //ContactsRepository e CategoryRepository
};


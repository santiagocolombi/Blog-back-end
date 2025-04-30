// src/app/repositories/PostsRepository.js
const db = require('../../database/index');

class PostsRepository {
    async findAll(orderBy = 'DESC') {
        const direction = orderBy.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        const result = await db.query(`SELECT * FROM posts ORDER BY created_at ${direction}`);
        return result; // Retorna todos os registros
    }

    async create({ title, content, category, image_url }) {
      const [row] = await db.query(`
        INSERT INTO posts (title, content, category, image_url, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING *
      `, [title, content, category, image_url]);
    
      return row;
    }
    
    
    

    async update(id, { title, content }) {
        const result = await db.query(`
            UPDATE posts
            SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *`, [title, content, id]);
        return result[0]; // Acessa o primeiro elemento do array
    }

    async delete(id) {
        const result = await db.query(`
            DELETE FROM posts
            WHERE id = $1
            RETURNING *`, [id]);
        return result[0]; // Retorna o post deletado ou undefined
    }

    async findById(id) {
        const result = await db.query(`
          SELECT * FROM posts
          WHERE id = $1
        `, [id]);
        
        if (Array.isArray(result)) {
          return result[0];
        }
        return result
    }
    async getItems() {
      
      const rows = await db.query(`
          SELECT * FROM posts 
          WHERE category = 'item'
          ORDER BY created_at DESC
      `);
      console.log('Itens encontrados:', rows);
      return rows;
  }
  async getPersonagens() {
    const rows = await db.query(`
        SELECT * FROM posts 
        WHERE category = 'personagem'
        ORDER BY created_at DESC
    `);
    return rows;
}
async getArtefatos() {
  const  rows  = await db.query(`
    SELECT * FROM posts 
    WHERE category ILIKE 'artefato'
    ORDER BY created_at DESC
  `);
  return rows;
}

}

module.exports = new PostsRepository();

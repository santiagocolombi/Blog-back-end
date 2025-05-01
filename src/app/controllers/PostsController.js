// src/app/controllers/PostsController.js
const PostsRepository = require('../repositories/PostsRepository');
const isValidUUID = require('../utils/isValidUUID');

class PostsController {
    async index(request, response) {
        try {
            const { orderBy } = request.query;
            const posts = await PostsRepository.findAll(orderBy);
            if (!posts || posts.length === 0) {
                return response.status(200).json([]);
            }

            return response.json(posts);
        } catch (error) {
            return response.status(500).json({
                error: 'Failed to fetch posts',
                details: error.message
            });
        }
    }

    async create(request, response) {
        const { title, content, category } = request.body;
        const image = request.file;
      
        if (!title || !content || !category) {
          return response.status(400).json({ error: 'Title, content, and category are required' });
        }
      
        // Gera a URL (ajuste se estiver em produção)
        const imageUrl = image ? `/uploads/${image.filename}` : null;
      
        try {
          const post = await PostsRepository.create({ title, content, category, image_url: imageUrl });
          return response.status(201).json(post);
        } catch (error) {
          return response.status(500).json({ error: 'Failed to create post', details: error.message });
        }
      }
      
    

    async update(request, response) {
        const { id } = request.params;
        const { title, content } = request.body;

        if (!title || !content) {
            return response.status(400).json({ error: 'Title and content are required' });
        }

        try {
            const post = await PostsRepository.update(id, { title, content });
            if (!post) {
                return response.status(404).json({ error: 'Post not found' });
            }
            return response.status(200).json(post);
        } catch (error) {
            return response.status(500).json({ error: 'Failed to update post' });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        await PostsRepository.delete(id);
        response.sendStatus(204);
    }

    async show(request, response) {
        const { id } = request.params;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: 'Invalid post ID' });
        }

        try {
            const post = await PostsRepository.findById(id);
            if (!post) {
                return response.status(404).json({ error: 'Post not found' });
            }
            return response.status(200).json(post);
        } catch (error) {
            return response.status(500).json({ error: 'Failed to fetch post' });
        }
        
    }
    async getItems(request, response) {
        try {
            const items = await PostsRepository.getItems();
            if (!items || items.length === 0) {
                return response.status(200).json([]);
            }
            return response.json(items);
        } catch (error) {
            return response.status(500).json({ 
                error: 'Failed to fetch items',
                details: error.message 
            });
        }
    }
    async getPersonagens(request, response) {
        try {
            const personagens = await PostsRepository.getPersonagens();
            if (!personagens || personagens.length === 0) {
                return response.status(200).json([]);
            }
            return response.json(personagens);
        } catch (error) {
            return response.status(500).json({ 
                error: 'Failed to fetch characters',
                details: error.message 
            });
        }
    }
    async getArtefatos(request, response) {
        try {
            const artefatos = await PostsRepository.getArtefatos();
            if (!artefatos || artefatos.length === 0) {
                return response.status(200).json([]);
            }
            return response.json(artefatos);
        } catch (error) {
            return response.status(500).json({ 
                error: 'Failed to fetch artifacts',
                details: error.message 
            });
        }
    }
    async getGuia(request, response) {
        try {
          const guia = await PostsRepository.getGuia();
          if (!guia || guia.length === 0) {
            return response.status(200).json([]);
          }
          return response.json(guia);
        } catch (error) {
          return response.status(500).json({
            error: 'Failed to fetch guia',
            details: error.message,
          });
        }
      }
    }      
    

module.exports = new PostsController();

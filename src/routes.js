const { Router } = require('express');
const PostsController = require('./app/controllers/PostsController');
const router = Router();
const upload = require('./app/controllers/middlewares/upload');
router.post('/posts', upload.single('image'), PostsController.create);
router.get('/posts', PostsController.index);
router.post('/posts', PostsController.create);
router.put('/posts/:id', PostsController.update);
router.delete('/posts/:id', PostsController.delete);
router.get('/posts/:id', PostsController.show);
router.get('/item', PostsController.getItems);
router.get('/personagens', PostsController.getPersonagens);
router.get('/artefatos', PostsController.getArtefatos);
router.get('/guia', PostsController.getGuia);




/* Método	Rota	Função
GET	/posts	Buscar todos os posts
GET	/posts/:id	Buscar um post específico
POST	/posts	Criar um post novo (título, conteúdo, imagem)
PUT	/posts/:id	Atualizar um post
DELETE	/posts/:id	Deletar um post
 */

module.exports = router;

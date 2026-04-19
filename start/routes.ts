import router from '@adonisjs/core/services/router';

import { controllers } from '#generated/controllers';

router.get('/', [controllers.Home, 'render']).as('home');
router.get('/blog', [controllers.ShowPosts, 'render']).as('show_posts');
router.get('/blog/:slug', [controllers.ShowPost, 'render']).as('show_post');

import { controllers } from '#generated/controllers';
import router from '@adonisjs/core/services/router';

router.get('/', [controllers.Home, 'render']).as('home');

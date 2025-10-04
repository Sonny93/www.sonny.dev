import router from '@adonisjs/core/services/router';
router.on('/').renderInertia('home');
router.on('/test').renderInertia('test');

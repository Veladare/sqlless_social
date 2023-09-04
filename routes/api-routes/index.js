const router = require('express').router();

const userRoutes = require('./userRoutes')
const thoughtRoutes = require('./userRoutes')

router.use('/user', userRoutes);
router.use('thought', thoughtRoutes);


const router = require('express').Router();
const {authRoute} = require('../middleware/authMiddleware')
const {getLogin,
       getSignUp,
       postLogin,
       postSignUp,
       getUserDashboard,
       logout,
       postResetPassword,
       getResetPassword,
       submitUpdatedPassword,
       getUpdatedPassword,
       getDeposit,
       contactSupport,
       getAbout
    } = require('../controllers/authController');
 

router.get('/signup', getSignUp);
router.get('/login', getLogin);


router.post('/signup', postSignUp);
router.post('/login-post', postLogin);

router.get('/dashboard', authRoute, getUserDashboard);

router.get('/logout', logout);

router.get('/resetPassword', getResetPassword);
router.post('/resetPassword', postResetPassword);

router.get('/getUpdatedPassword/:id', getUpdatedPassword)
router.post('/postUpdatedPassword/:id', submitUpdatedPassword);

router.get('/deposit',authRoute, getDeposit)

router.post('/support', contactSupport)
router.get('/about', getAbout)
module.exports = router;
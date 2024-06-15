import express from 'express';
import loginController from './../controllers/login-controllers.js';

const router = express.Router();

// Route for adding account details
router.route('/register')
      .post(loginController.post);

// Route for login page
router.route('/login')
      .post(loginController.postLogin);

// Route for sign up
router.route('/auth')
      .post(loginController.createUser);

// Route for sign up
router.route('/details/:email')
      .put(loginController.updateUser);

// Route to get user details
router.route('/getUser/:email')
      .get(loginController.getUser);

// Route to delete user details
router.route('/delete/:email')
      .delete(loginController.deleteUser);

// Route to post messages in chat
router.route('/postMessages')
      .post(loginController.messagepost);

// Route to get chat history
router.route('/getMessages/:fromEmail/:toEmail')
      .get(loginController.getMessages);

// Route to get matched cards after swipe
router.route('/getCards/:role')
      .get(loginController.getCards);

// Route to post matches after swipe
router.route('/addMatch/:userEmail/:swippedUserEmail')
      .put(loginController.addMatch);

// Route to get matches after swipe
router.route('/getMatches')
      .post(loginController.getMatches);

export default router;
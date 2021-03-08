import express from 'express';

import LetterController from 'controllers/letter-controller';

const route = express.Router();
const letterController = new LetterController();

route.post('/santas-letters', letterController.createLetter);
route.get('/santas-letters', letterController.getLetters);
route.get('/santas-letters/:id', letterController.getLetterById);
route.patch('/santas-letters/:id', letterController.updateLetterById);
route.delete('/santas-letters/:id', letterController.deleteLetterById);

export default route;
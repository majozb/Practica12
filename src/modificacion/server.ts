import { CardManager } from './card-manager.js';
import express from 'express';

const cardManager = CardManager.getInstance();

const app = express();

app.get('/cards', (req, res) => {
  if (!req.query.user) {
    res.send({
      status: 'ERROR',
      message: 'Username is required',
    });
    return;
  }
  
  if (req.query.id) {
    cardManager.readCard(req.query.user as string, req.query.id, (error, result) => {
      console.log("entrando");
      if (error) {
        res.send({
          status: 'ERROR',
          message: error.message,
        });
      } else {
        res.send(result);
      }
    });
  } else {
    cardManager.listCards(req.query.user as string, (error, result) => {
      if (error) {
        res.send({
          status: 'ERROR',
          message: error.message,
        });
      } else {
        res.send(result);
      }
    });
  }
});

app.post('/cards', express.json(), (req, res) => {
  if (!req.query.user) {
    res.send({
      status: 'ERROR',
      message: 'Username is required',
    });
    return;
  } else {
    cardManager.addCardPr(req.query.user as string, req.body).then((result) => {
      res.send(result);
    }).catch((error) => {
      res.send({
        status: 'ERROR',
        message: error.message,
      });
    });
  }
});

app.delete('/cards', (req, res) => {
  if (!req.query.user || !req.query.id) {
    res.send({
      status: 'ERROR',
      message: 'Username and ID are required',
    });
    return;
  } else {
    cardManager.removeCardPr(req.query.user as string, req.query.id as string).then((result) => {
      res.send(result);
    }).catch((error) => {
      res.send({
        status: 'ERROR',
        message: error.message,
      });
    });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
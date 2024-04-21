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
      if (error) {
        res.send({
          status: 'ERROR',
          message: 'ID is required'
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
    cardManager.addCard(req.query.user as string, req.body, (error, result) => {
      if (error) {
        res.send({
          status: 'ERROR',
          message: error,
        });
      } else if (result) {
        res.status(201).send({
          message: result,
          card: req.body,
        });
      }
    });
  }
});

app.patch('/cards', express.json(), (req, res) => {
  if (!req.query.user || !req.query.id) {
    res.send({
      status: 'ERROR',
      message: 'Username and ID are required',
    });
    return;
  } else {
    cardManager.updateCard(req.query.user as string, req.body, (error, result) => {
      if (error) {
        res.send({
          status: 'ERROR',
          message: error,
        });
      } else if (result) {
        res.status(200).send({
          message: result,
          card: req.body,
        });
      }
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
    cardManager.removeCard(req.query.user as string, req.query.id as string, (error, result) => {
      if (error) {
        res.status(result).send({
          message: error,
        });
      } else {
        res.status(200).send({
          message: result,
        });
      }
    });
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
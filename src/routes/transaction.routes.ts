import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListTransactionsService from '../services/ListTransactions';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createService = new CreateTransactionService(transactionsRepository);
const listService = new ListTransactionsService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = listService.execute();
    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { body } = request;
    const { title, value, type } = body;

    const transaction = createService.execute({ title, value, type });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  id: string;
  value: number;
  title: string;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator, curr) => {
        const { type, value } = curr;

        accumulator[type] += value;
        accumulator.total = accumulator.income - accumulator.outcome;

        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  public create({ title, value, type, id }: CreateTransactionDTO): Transaction {
    const transactions = { title, value, type, id };
    this.transactions.push(transactions);

    return transactions;
  }
}

export default TransactionsRepository;

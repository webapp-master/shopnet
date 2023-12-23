import axios from 'axios';

const debitWallet = async (username, amount) => {
  try {
    const response = await axios.post('/api/wallet/debit/', {
      username: username,
      amount: amount,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default debitWallet;

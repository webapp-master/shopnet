import axios from 'axios';

const debitWallet = async (username, amount, accessToken) => {
  
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, 
      },
    };

    const response = await axios.post('/api/wallet/debit/', {
      username: username,
      amount: amount,
    }, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default debitWallet;

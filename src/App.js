import React, { useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer'; // ✅ Added for Webpack 5 polyfill
window.Buffer = Buffer;          // ✅ Makes Buffer globally available

const App = () => {
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('USDT');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://crypto-flasher-backend.onrender.com/api/flash', {
        wallet,
        amount,
        token
      });
      setResult(res.data.message + ' (Expires in: ' + res.data.expires_in + ')');
    } catch (err) {
      setResult('❌ Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ background: '#000', color: 'lime', minHeight: '100vh', padding: '2rem', fontFamily: 'monospace' }}>
      <h1 style={{ textAlign: 'center' }}>💣 Crypto Flasher Dashboard</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input placeholder="Wallet Address" value={wallet} onChange={(e) => setWallet(e.target.value)} required />
        <input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <select value={token} onChange={(e) => setToken(e.target.value)}>
          <option value="USDT">USDT</option>
          <option value="ETH">ETH</option>
          <option value="BTC">BTC</option>
        </select>
        <button type="submit">⚡ Flash Now</button>
      </form>
      {result && <p style={{ textAlign: 'center' }}>{result}</p>}
    </div>
  );
};

export default App;

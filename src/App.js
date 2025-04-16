import React, { useState } from 'react';
import './App.css';

function App() {
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [coin, setCoin] = useState('USDT');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const playSound = (file) => {
    const audio = new Audio(file);
    audio.play();
  };

  const validateInput = () => {
    if (!wallet || !amount || isNaN(amount)) {
      setError('Enter a valid wallet and numeric amount.');
      playSound('/error.mp3');
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    if (!validateInput()) return;
    playSound('/preview.mp3');
    setPreview({ wallet, amount, coin });
  };

  const handleFlash = () => {
    if (!validateInput()) return;
    setLoading(true);
    setError(null);
    playSound('/hacker-click.mp3');

    setTimeout(() => {
      setLoading(false);
      setPreview(null);
      playSound('/success.mp3');
      alert(`💸 Flash Sent: ${amount} ${coin} to ${wallet}`);
    }, 3000);
  };

  return (
    <div className="app">
      <h1 className="title">💣 Crypto Flasher Dashboard</h1>
      <div className="form">
        <input type="text" placeholder="Wallet Address" value={wallet} onChange={e => setWallet(e.target.value)} />
        <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <select value={coin} onChange={e => setCoin(e.target.value)}>
          <option>USDT</option>
          <option>BTC</option>
          <option>ETH</option>
        </select>
        <button onClick={handlePreview}>🧪 Preview</button>
        <button onClick={handleFlash}>⚡ Flash Now</button>
        {error && <div className="error">{error}</div>}
        {loading && <div className="loader">Flashing...</div>}
        {preview && (
          <div className="preview">
            <p>🧪 Sending {preview.amount} {preview.coin} to {preview.wallet}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

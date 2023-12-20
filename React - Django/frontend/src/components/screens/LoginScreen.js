import React from 'react';

const LoginScreen = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  const containerStyle = {
    width: '100%',
    height: '100vh',
    background: 'yellow',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const loginBoxStyle = {
    position: 'relative',
    width: '390px',
    height: '420px',
    backgroundColor: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(15px)',
  };

  const inputBoxStyle = {
    position: 'relative',
    width: '310px',
    margin: '30px 0',
    borderBottom: '2px solid #fff',
  };

  const inputStyle = {
    width: '100%',
    height: '50px',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    color: '#1f73c9',
    padding: '0 35px 0 5px',
  };

  const buttonStyle = {
    width: '100%',
    height: '40px',
    background: '#fff',
    border: 'none',
    outline: 'none',
    borderRadius: '40px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#000',
    transition: 'all 0.5s',
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ fontSize: '28px', color: '#1f73c9', textAlign: 'center' }}>Login</h2>
          <div style={inputBoxStyle}>
            <span style={{ position: 'absolute', right: '8px', color: '#fff', fontSize: '18px', lineHeight: '50px' }}>
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input type="email" required placeholder="Email" style={inputStyle} />
          </div>
          <div style={inputBoxStyle}>
            <span style={{ position: 'absolute', right: '8px', color: '#fff', fontSize: '18px', lineHeight: '50px' }}>
              <i className="fa-solid fa-lock"></i>
            </span>
            <input type="password" placeholder="Password" required style={inputStyle} />
          </div>
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;

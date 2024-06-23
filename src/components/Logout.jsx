import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;

import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-container">
      <Navbar />
      <div className="landing-content">
        <div className="text-section">
          <h1>CuanQ</h1>
          <p>
            CuanQ adalah platform manajemen keuangan digital yang dirancang untuk generasi muda Indonesia. 
            Dengan fitur pencatatan pengeluaran, perencanaan anggaran, dan rekomendasi finansial berbasis teknologi NLP dan Machine Learning, 
            CuanQ membantu Gen Z membangun kebiasaan keuangan yang lebih sehat, terarah, dan berkelanjutan.
          </p>
          <Link to="/signup" className="btn-purple">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

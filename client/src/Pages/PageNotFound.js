import React from 'react';
import Layout from '../components/Layout/Layout.js';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        {/* 404 Message */}
        <h1 style={{ fontSize: '3rem', color: '#343a40', marginBottom: '1rem' }}>404 - Page Not Found</h1>
        <p style={{ fontSize: '1.25rem', color: '#6c757d', marginBottom: '2rem' }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        {/* Back to Home Button */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </Layout>
  );
};

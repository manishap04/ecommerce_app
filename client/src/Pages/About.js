import React from 'react';
import Layout from '../components/Layout/Layout.js';

export const About = () => {
  return (
    <Layout>
      <div className="about-container" style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>
        <div className="text-center mb-5">
          <h1 className="display-4">About Us</h1>
          <p className="lead">
            Welcome to <strong>Ecommerce-app</strong>, your one-stop destination for all your shopping needs. We’re here to revolutionize the way you shop online!
          </p>
        </div>

        {/* About Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h2>Who We Are</h2>
            <p>
              At <strong>Ecommerce-app</strong>, we aim to provide an unparalleled shopping experience by offering top-notch products, competitive prices, and exceptional customer service. Our mission is to make your online shopping easy, enjoyable, and secure.
            </p>
            <p>
              From electronics to fashion, home essentials to lifestyle products, we bring a wide range of items from trusted sellers and brands straight to your fingertips.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://img.freepik.com/free-photo/online-shopping-concept-flat-lay_23-2149280047.jpg"
              alt="Who We Are"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        {/* Our Values Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 text-center">
            <img
              src="https://img.freepik.com/free-photo/businesswoman-hand-using-digital-tablet-with-icons-application-media_1232-2443.jpg"
              alt="Our Values"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Customer First:</strong> Your satisfaction is our priority.</li>
              <li><strong>Integrity:</strong> We believe in honesty and transparency in all our operations.</li>
              <li><strong>Innovation:</strong> Constantly evolving to provide the best online shopping experience.</li>
              <li><strong>Sustainability:</strong> Promoting eco-friendly practices in our operations.</li>
            </ul>
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h2>Our Mission</h2>
            <p>
              To bring the world closer to your doorstep with seamless online shopping experiences.
            </p>
            <h2>Our Vision</h2>
            <p>
              To become a global leader in the e-commerce industry by offering quality products, unmatched service, and fostering innovation.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://img.freepik.com/free-photo/close-up-shopping-cart-with-smartphone-digital-tablet_1150-18000.jpg"
              alt="Vision and Mission"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <h2>Join Us Today!</h2>
          <p>
            Be a part of our journey and enjoy hassle-free shopping like never before. Let’s make shopping smarter and better, together!
          </p>
        </div>
      </div>
    </Layout>
  );
};

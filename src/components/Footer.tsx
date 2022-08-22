import React from 'react';
import '../App.css';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
        <a
          href="https://www.linkedin.com/in/alexandr-dimov/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          <img className="footer__link-image" src="../../linkedin-130.png" alt="LinkedIn" />
        </a>
        <a href="mailto:dalexandrd@gmail.com" className="footer__link">
          <img className="footer__link-image" src="../../mail-5906.png" alt="Mail me" />
        </a>
    </div>
  );
}

export default Footer;

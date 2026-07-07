import "./Footer.css";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>MERN App</h2>
          {/* <p>Building Modern Web Applications</p> */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Sanjeev Kumar | All Rights Reserved
           <span className="bg-red-600 text-pink-500"><FaInstagram /></span>
        </p>
       
      </div>
    </footer>
  );
};

export default Footer;
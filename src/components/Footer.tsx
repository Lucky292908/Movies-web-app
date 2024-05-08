// import React from 'react';
// import './Footer.css'; // Import CSS file for styling

// const Footer: React.FC = () => {
//   return (
//     <footer className="footer-container">
//       <div className='section'>

//         <div className="join">
//           <img className='img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjP_dCkKSuXpUYhEgkon4AF-Ai8rb5C6fOtPwrna5MtQ&s" alt="The Movie Database (TMDB)" width="130" height="94" />
         
//         </div>

//         <div className='footer-column'>
//           <h3 className='h3'>The Basics</h3>
//           <ul>
//             <li className='li'><a className='a' href="#">About TMDB</a></li>
//             <li className='li'><a className='a' href="#">Contact Us</a></li>
//             <li className='li'><a className='a' href="#">Support Forums</a></li>
//             <li className='li'><a className='a' href="#">API</a></li>
//             <li className='li'><a className='a' href="#">System Status</a></li>
//           </ul>
//         </div>

//         <div className='footer-column'>
//           <h3 className='h3'>Get Involved</h3>
//           <ul>
            
//             <li className='li'><a className='a' href="#"><span className="glyphicons glyphicons-asterisk"></span> Contribution Bible</a></li>
//             <li className='li'><a className='a' href="#">Add New Movie</a></li>
//             <li className='li'><a className='a' href="#">Add New TV Show</a></li>
//           </ul>
//         </div>

//         <div className='footer-column'>
//           <h3 className='h3'>Community</h3>
//           <ul>
//             <li className='li'><a className='a' href="#">Guidelines</a></li>
//             <li className='li'><a className='a' href="#">Discussions</a></li>
//             <li className='li'><a className='a' href="#">Leaderboard</a></li>
//           </ul>
//         </div>

//         <div className='footer-column'>
//           <h3 className='h3'>Legal</h3>
//           <ul>
//             <li className='li'><a className='a' href="#">Terms of Use</a></li>
//             <li className='li'><a className='a' href="#">API Terms of Use</a></li>
//             <li className='li'><a className='a' href="#">Privacy Policy</a></li>
//             <li className='li'><a className='a' href="#">DMCA Policy</a></li>
//           </ul>
//         </div>

//       </div>
//     </footer>
//   );
// }

// export default Footer;












// Footer.tsx

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are a team passionate about movies and bringing you the latest updates, reviews, and news from the world of cinema. Our goal is to provide you with valuable insights and recommendations to enhance your movie-watching experience.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className='p1'>Follow Us</h3>
          <ul className="social-icons">
            <li><a href="https://www.linkedin.com/in/lucky-saini-860a701ba/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-SPWzkVR9Vfm20jampmUoAtKxD2it732_3sf1kHlPMq2Tn0CTQUYxEaURdxaDG06HlU&usqp=CAU" alt="LinkedIn" /></a></li>
            <li><a href="https://github.com/Lucky292908"><img src="https://w7.pngwing.com/pngs/914/758/png-transparent-github-social-media-computer-icons-logo-android-github-logo-computer-wallpaper-banner-thumbnail.png" alt="Facebook" /></a></li>
            <li><a href="https://www.linkedin.com/in/lucky-saini-860a701ba/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwJ7NDTuquRpUGethgWS68JiDw4oycSBZZyIyj7h-EA&s" alt="Instagram" /></a></li>
            <li><a href="https://www.linkedin.com/in/lucky-saini-860a701ba/"><img src="https://e7.pngegg.com/pngimages/52/363/png-clipart-tweeter-logo-scalable-graphics-icon-twitter-blue-logo-thumbnail.png" alt="Twitter" /></a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: lucky292908@gmail.com</p>
          <p>Phone: +91-7015453238</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Movies Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

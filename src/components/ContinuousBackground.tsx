// VideoBackground.tsx
import React from 'react';
import './Bg.css'; // Import CSS file for styling

const VideoBackground: React.FC = () => {
  return (
    <div className="video-background">
      {/* Background video */}
      <video autoPlay muted loop className="video">
        <source src="vd.m" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Your content */}
      <div className="video-background-overlay">
        <div className="content">
          <h1>Welcome to My Website</h1>
          <p>This is some content on my website.</p>
        </div>
      </div>
    </div>
  );
}

export default VideoBackground;

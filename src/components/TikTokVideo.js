import React from 'react';

function TikTokVideo() {
  return (
    <div>
      <blockquote className="tiktok-embed" cite="https://www.tiktok.com/@username/video/video_id" data-video-id="video_id" style={{ maxWidth: '605px', minWidth: '325px',  }}>
        <section>
          <a target="_blank" title="@username" href="https://www.tiktok.com/@username?refer=embed">@username</a>
          <p>Video description</p>
          <a target="_blank" title="TikTok" href="https://www.tiktok.com/?refer=embed">♬ original sound - username</a>
        </section>
      </blockquote>
      <script async src="https://www.tiktok.com/embed.js"/>
    </div>
  );
}

export default TikTokVideo;
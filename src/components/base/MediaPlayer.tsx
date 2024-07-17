'use client';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@/styles/media.css';

import { MediaPlayer, MediaProvider, Poster, Controls, PlayButton, MuteButton, PIPButton, useMediaState, FullscreenButton } from "@vidstack/react"
import { FullscreenIcon, PauseIcon, PlayIcon } from 'lucide-react';
import { FullscreenExitIcon, MuteIcon, PictureInPictureExitIcon, PictureInPictureIcon, VolumeHighIcon, VolumeLowIcon } from '@vidstack/react/icons';
// ซับ
// const textTracks: Array<{ src: string; kind: TextTrackKind; srcLang: string; label: string }> = [
//   { src: 'https://files.vidstack.io/sprite-fight/captions.vtt', kind: 'captions', srcLang: 'en', label: 'English' },
// ];

function MediaPlayerComponent() {
  const isPicInPic = useMediaState('pictureInPicture');
  const isFullScreen = useMediaState('fullscreen');

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <MediaPlayer
        // src="https://files.vidstack.io/sprite-fight/720p.mp4"
        src={[
          {
            src: 'https://files.vidstack.io/sprite-fight/1080p.mp4',
            type: 'video/mp4',
            width: 1920,
            height: 1080,
          },
          {
            src: 'https://files.vidstack.io/sprite-fight/720p.mp4',
            type: 'video/mp4',
            width: 1280,
            height: 720,
          },
          {
            src: 'https://files.vidstack.io/sprite-fight/480p.mp4',
            type: 'video/mp4',
            width: 853,
            height: 480,
          },
        ]}
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        title="Sprite Fight"
        poster="https://files.vidstack.io/sprite-fight/poster.webp"
      >
        <MediaProvider>
          <Poster className="vds-poster" />
        </MediaProvider>
        {/* <DefaultVideoLayout
          thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
          icons={defaultLayoutIcons}
        /> */}
        <Controls.Root className="vds-controls">
          {/* top */}
          <Controls.Group className="vds-controls-group">

          </Controls.Group>
          <div className="vds-controls-spacer" />
          {/* end */}
          <Controls.Group className="vds-controls-group">
            <PlayButton className="vds-button">
              <PlayIcon className="play-icon vds-icon" />
              <PauseIcon className="pause-icon vds-icon" />
            </PlayButton>
            <MuteButton className="vds-button">
              <MuteIcon className="mute-icon vds-icon" />
              <VolumeLowIcon className="volume-low-icon vds-icon" />
              <VolumeHighIcon className="volume-high-icon vds-icon" />
            </MuteButton>
            <FullscreenButton className="vds-button">
              {!isFullScreen ? <FullscreenIcon className="fs-enter-icon vds-icon" /> : <FullscreenExitIcon className="fs-exit-icon vds-icon" />}
            </FullscreenButton>
            <PIPButton className="vds-button">
              {!isPicInPic ? <PictureInPictureIcon className="pip-enter-icon vds-icon" /> : <PictureInPictureExitIcon className="pip-exit-icon vds-icon" />}
            </PIPButton>
          </Controls.Group>
        </Controls.Root>
      </MediaPlayer>
    </div>
  );
};

export default MediaPlayerComponent;
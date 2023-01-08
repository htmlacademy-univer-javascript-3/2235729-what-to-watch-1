import {useRef, useEffect} from 'react';


type PreviewVideoPlayerProps = {
  posterImage: string;
  previewVideoSrc: string;
  width: string;
  height: string;
};

function PreviewVideoPlayer ({posterImage, previewVideoSrc, width, height}: PreviewVideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    setTimeout(
      () => {videoRef.current?.play();},
      1000);
  }, []);
  return (
    <video
      ref={videoRef}
      src={previewVideoSrc}
      poster={posterImage}
      width={width}
      height={height}
      loop muted
    >
      <source src={previewVideoSrc} type="video/mp4" />
    </video>
  );
}

export default PreviewVideoPlayer;

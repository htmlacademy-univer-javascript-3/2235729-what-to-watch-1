import {useEffect, useRef} from 'react';

type PreviewVideoPlayerProps = {
  posterImage: string,
  previewVideoSrc: string,
  width: string,
  height: string
};

function PreviewVideoPlayer (props: PreviewVideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  setTimeout(() => videoRef.current?.play(), 1000);
  return (
    <video
      ref={videoRef}
      src={props.previewVideoSrc}
      poster={props.posterImage}
      width={props.width}
      height={props.height}
      loop muted
    >
      <source src={props.previewVideoSrc} type="video/mp4" />
    </video>
  );
}

export default PreviewVideoPlayer;

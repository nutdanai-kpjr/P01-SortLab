import { useMemo } from "react";

const useAudio = (url: string) => {
  const audio = useMemo<HTMLAudioElement | undefined>(
    () => (typeof Audio !== "undefined" ? new Audio(url) : undefined),
    [url]
  );

  const play = () => audio?.play();

  return { play };
};

export default useAudio;

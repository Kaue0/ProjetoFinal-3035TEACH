interface TweeksHandler {
  image: string | undefined;
  alt?: string;
  backUp: string;
  className?: string;
  onLoad?: () => void;
}

export function PhotoTweeks({ image, alt, backUp, className, onLoad }: TweeksHandler) {
  const photo = image || backUp;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = e.currentTarget;
    imgElement.onerror = null;
    imgElement.src = backUp;
  };

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <img
      src={photo}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

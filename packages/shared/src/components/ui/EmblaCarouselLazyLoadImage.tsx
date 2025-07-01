import React, { useState, useCallback } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

type PropType = {
  imgSrc: string;
  inView: boolean;
  index: number;
  fillType: 'fill' | 'default';
};

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView, fillType = 'default' } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  return (
    <div className="embla__slide">
      <div
        className={'embla__lazy-load'.concat(
          hasLoaded ? ' embla__lazy-load--has-loaded' : '',
        )}>
        {/* <span className="embla__lazy-load__spinner" /> */}
        {!hasLoaded && (
          <ReloadIcon className="embla__lazy-load__spinner animate-spin" />
        )}
        <img
          className={
            fillType === 'fill'
              ? 'embla__slide__img__fill embla__lazy-load__img'
              : 'embla__slide__img embla__lazy-load__img'
          }
          onLoad={setLoaded}
          src={inView ? imgSrc : PLACEHOLDER_SRC}
          alt="Your alt text"
          data-src={imgSrc}
        />
      </div>
    </div>
  );
};

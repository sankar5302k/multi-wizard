import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { LazyLoadImage } from './EmblaCarouselLazyLoadImage';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import '../../assets/css/embla.css';

export type SlideType = {
  imgUrl: string;
};

type EmblaCarouselCustomType = {
  slides: SlideType[];
  navButtons: 'dot' | 'arrow';
  fillType: 'fill' | 'default';
  options?: EmblaOptionsType;
};

/**
 * Renders a carousel navigation dots.
 * @param {Object} props - The component props.
 * @param {EmblaCarouselType} props.emblaApi - The embla carousel API.
 * @returns {JSX.Element} The carousel navigation dots.
 */
const EmblaCarouselDotsNavButton = ({
  emblaApi,
  fillType = 'default',
}: {
  emblaApi: EmblaCarouselType;
  fillType: 'fill' | 'default';
}): JSX.Element => {
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const dots: number[] = Array.from(
    { length: scrollSnaps.length },
    (_, i) => i,
  );
  const selectedIndexSet: Set<number> = new Set([selectedIndex]);
  return (
    <div className="embla__dots">
      {dots.map((index: number) => (
        <DotButton
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={`embla__dot${selectedIndexSet.has(index) ? (fillType == 'fill' ? ' embla__dot__fill--selected' : ' embla__dot--selected') : ''}`}
        />
      ))}
    </div>
  );
};

/**
 * Renders the next and previous navigation buttons for an EmblaCarousel.
 * @param {Object} props - The props for the component.
 * @param {EmblaCarouselType} props.emblaApi - The EmblaCarousel API.
 * @returns {JSX.Element} The rendered next and previous navigation buttons.
 */
const EmblaCarouselNextPrevNavButton = ({
  emblaApi,
  fillType = 'default',
}: {
  emblaApi: EmblaCarouselType;
  fillType: 'fill' | 'default';
}): JSX.Element => {
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <div className="embla__buttons">
      <PrevButton
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        fillType={fillType}
      />
      <NextButton
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        fillType={fillType}
      />
    </div>
  );
};

/**
 * Renders a carousel component with customizable options.
 *
 * @param {EmblaCarouselCustomType} props - The props for the carousel component.
 * @param {Array<SlideType>} props.slides - The array of slides to be rendered in the carousel.
 * @param {EmblaCarouselOptionsType} props.options - The options for the carousel.
 * @param {string} [props.navButtons='dot'] - The type of navigation buttons to be rendered.
 * @return {JSX.Element} The rendered carousel component.
 */
const EmblaCarousel: React.FC<EmblaCarouselCustomType> = ({
  slides,
  options,
  navButtons = 'dot',
  fillType = 'default',
}): JSX.Element => {
  const [emblaRed, emblaApi] = useEmblaCarousel(options);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on('slidesInView', updateSlidesInView);
    emblaApi.on('reInit', updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return (
    <div className={fillType === 'fill' ? 'embla__fill' : 'embla'}>
      <div className="embla__viewport" ref={emblaRed}>
        <div className="embla__container">
          {slides &&
            slides.map((slide, index) => (
              <LazyLoadImage
                key={index}
                index={index}
                imgSrc={slide.imgUrl}
                inView={slidesInView.indexOf(index) > -1}
                fillType={fillType}
              />
            ))}
        </div>
      </div>

      <div
        className={
          fillType === 'fill' ? 'embla__controls_fill' : 'embla__controls'
        }>
        {navButtons === 'dot' && emblaApi && (
          <EmblaCarouselDotsNavButton emblaApi={emblaApi} fillType={fillType} />
        )}
        {navButtons === 'arrow' && emblaApi && (
          <EmblaCarouselNextPrevNavButton
            emblaApi={emblaApi}
            fillType={fillType}
          />
        )}
      </div>
    </div>
  );
};

export default EmblaCarousel;

import { Card, CardContent, CardFooter, CardHeader } from './card';
import EmblaCarousel, { SlideType } from './EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import DuplicateIcon from '../../assets/icons/duplicate-icon.svg?react';

type TemplateCardType = {
  slideImages: SlideType[];
  navButtons?: 'dot' | 'arrow';
  fillType?: 'fill' | 'default';
};

interface Styles {
  [key: string]: string;
}

const OPTIONS: EmblaOptionsType = {};

/**
 * Generate a Templates Card component based on the given TemplateCardType.
 *
 * @param {TemplateCardType} slideImages - the images to be displayed in the card
 * @param {string} navButtons - the type of navigation buttons ('dot' by default)
 * @param {string} fillType - the type of fill ('default' by default)
 * @return {JSX.Element} the rendered Templates Card component
 */
export default function TemplatesCard({
  slideImages,
  navButtons = 'dot',
  fillType = 'default',
}: TemplateCardType): JSX.Element {
  const isFillType = fillType == 'fill';
  const styles: Styles = {
    card: 'bg-background min-h-460 w-322 flex flex-col items-center justify-center border-0',
    cardClass: isFillType
      ? 'bg-template-card w-full rounded-none border-0 shadow-none relative'
      : 'bg-template-card w-full rounded-none border-0 shadow-none',
    header: isFillType
      ? 'font-extra-bold-italic flex flex-row items-center justify-start space-y-0 p-0 pb-1 text-sm absolute z-10 top-0'
      : 'font-extra-bold-italic flex flex-row items-center justify-start space-y-0 p-0 pb-1 text-sm',
    headerClass:
      'bg-template-card-head-bg/25 text-template-card-head-fg px-2.5 py-1.5 uppercase',
    content: isFillType ? 'bg-template-card p-0' : 'bg-template-card',
    footer: 'bg-background p-0 pb-3 pt-3',
    footerClass: 'flex w-full items-center justify-between',
    name: 'flex flex-col',
    price: 'text-template-card-price-fg',
  };

  return (
    <div className={styles.card}>
      <Card className={styles.cardClass}>
        <CardHeader className={styles.header}>
          <div className={styles.headerClass}>New</div>
          <div className={`${styles.headerClass} ml-1`}>Ordered</div>
        </CardHeader>
        <CardContent className={styles.content}>
          <EmblaCarousel
            slides={slideImages}
            options={OPTIONS}
            navButtons={navButtons}
            fillType={fillType}
          />
        </CardContent>
        <CardFooter className={styles.footer}>
          <div className={styles.footerClass}>
            <div className={styles.name}>
              <div>Naveen</div>
              <div className={styles.price}>$178</div>
            </div>
            <div className="pr-5">
              <DuplicateIcon className="cursor-pointer" title="Duplicate" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

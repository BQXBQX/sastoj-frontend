import React, { memo, useEffect, useRef, useState } from 'react';
import { Button, type CarouselItemProps, CarouselItem } from '..';
import classNames from 'classnames';
import styles from './Carousel.module.scss';

export interface CarouselProps {
  /**
   * width of the carousel
   */
  width?: number;
  /**
   * height of the Carousel
   */
  height?: number;
  /**
   * CarouselItems of the carousel
   */
  CarouselItems?: CarouselItemProps[];
  /**
   * onChange : the onChange of the Carousel
   */
  onChange?: (value: number) => void;
  /**
   * defaultselect the defaultselect of the Carousel
   */
  defaultSelected?: number;
  /**
   * select of the Carousel
   */
  selected?: number;
}

interface ContentProps {
  CarouselItems: CarouselItemProps[];
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    { width = 400, CarouselItems = undefined, height, onChange, defaultSelected, selected },
    ref,
  ) => {
    const [select, setSelect] = useState<number>(defaultSelected || 0);
    const [startX, setStartX] = useState<number>(0);
    const [endX, setEndX] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [difference, setDifference] = useState<number>(0);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [itemsNumber, setItemsNumber] = useState<number>(0);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      selected && setSelect(selected);
    }, [selected]);
    const pre = () => {
      select !== 0 && setSelect(select - 1);
    };

    const next = () => {
      select !== itemsNumber - 1 && setSelect(select + 1);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      setStartX(e.clientX);
      setStartTime(Date.now());
      setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      const currentX = e.clientX;
      const difference = startX - currentX;
      setDifference(difference);
    };

    useEffect(() => {
      if (divRef.current) {
        divRef.current.style.transition = 'auto';
        divRef.current.style.transform = `translateX(${-(width * select + difference)}px)`;
      }
    }, [difference, select, width]);

    useEffect(() => {
      if (difference === 0 && divRef.current) {
        divRef.current.style.transition = '';
        divRef.current.style.transform = `translateX(-${width * select}px)`;
      }
    }, [select, width, difference]);

    const handleMouseUp = (e: React.MouseEvent) => {
      setEndX(e.clientX);
      setEndTime(Date.now());
      if (Math.abs(difference) >= width / 2 && difference > 0 && select !== itemsNumber - 1) {
        setSelect(select + 1);
        setIsChanged(true);
      }
      if (Math.abs(difference) >= width / 2 && difference < 0 && select !== 0) {
        setSelect(select - 1);
        setIsChanged(true);
      }
      if (
        Math.abs(difference) < width / 2 &&
        divRef.current &&
        select === itemsNumber - 1 &&
        select === 0
      ) {
        divRef.current.style.transform = `translateX(-${width * select}px)`;
      }
      setDifference(0);
      setIsDragging(false);
    };

    useEffect(() => {
      onChange && onChange(select);
    }, [select, onChange]);

    useEffect(() => {
      if (difference === 0 && !isChanged) {
        const duration = endTime - startTime;
        const space = endX - startX;
        const v = space / duration;
        v < -0.5 && select !== itemsNumber - 1 && setSelect(select + 1);
        v > 0.5 && select != 0 && setSelect(select - 1);
      }
      setIsChanged(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [difference]);

    const carouselClass = classNames(styles['base']);

    useEffect(() => {
      CarouselItems && setItemsNumber(CarouselItems.length);
    }, [CarouselItems]);

    const Content = memo(function content({ CarouselItems }: ContentProps) {
      return (
        <>
          {CarouselItems?.map((item, index) => {
            return (
              <CarouselItem
                key={index}
                width={item.width || width}
                height={item.height || height}
              >
                {item.children}
              </CarouselItem>
            );
          })}
        </>
      );
    });

    return (
      <>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
        >
          <Button
            onClick={pre}
            color="ghost"
          >
            Pre
          </Button>
          <div
            className={carouselClass}
            ref={ref}
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <div
              className={styles['carouselAll']}
              ref={divRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              {CarouselItems && <Content CarouselItems={CarouselItems}></Content>}
            </div>
          </div>
          <Button
            onClick={next}
            color="ghost"
          >
            Next
          </Button>
        </div>
      </>
    );
  },
);

Carousel.displayName = 'Carousel';
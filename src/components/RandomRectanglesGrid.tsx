import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface RectangleProps {
  width: number;
  height: number;
}

const Rectangle: React.FC<RectangleProps> = ({ width, height }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: 'lightblue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
      }}
    />
  );
};

const RandomRectanglesGrid: React.FC = () => {
  const [rectangles, setRectangles] = useState<RectangleProps[]>([]);
  const params = useParams();

  useEffect(() => {
    const getRandomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateRandomRectangle = (): RectangleProps => {
      const width = getRandomNumber(0, 11) * 20;
      const height = getRandomNumber(0, 11) * 20;
      return { width, height };
    };

    const populateGridContainer = (numberOfRectangles: number): void => {
      const rectanglesArray = Array.from(
        { length: numberOfRectangles },
        generateRandomRectangle
      );
      setRectangles(rectanglesArray);
    };

    populateGridContainer(10);
  }, [params.colorID]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 20px)',
        gridTemplateRows: 'repaeat(10, 20px)',
        gridGap: '10px',
        padding: '10px',
        width: '100%',
        maxWidth: '100vw',
        backgroundColor: 'yellow',
      }}
    >
      {rectangles.map((rectangle, index) => (
        <Rectangle key={index} {...rectangle} />
      ))}
    </div>
  );
};

export default RandomRectanglesGrid;

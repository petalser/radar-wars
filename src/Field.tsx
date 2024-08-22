import styled from "styled-components";
import { useState, useEffect } from "react";
import calc from "./utils/calc";
import splitter from "./utils/splitter";
import proximity from "./utils/proximity";

type Props = {
  className?: string;
};

const Square = ({
  className,
  handleClick,
}: {
  className?: string;
  handleClick: () => void;
}) => {
  return <div className={className} onClick={handleClick}></div>;
};

type StyleProps = {
  backgroundColor: string;
};

const Sqr = styled(Square)<StyleProps>`
  height: 4px;
  width: 4px;
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    background-color: red;
  }
`;

const Field = ({ className }: Props) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [hits, setHits] = useState<number[]>([]);
  const [circle, setCircle] = useState<number[]>([]);
  const handleClick = (index: number) => {
    if (checked.length < 2) {
      setChecked((prev) => [...prev, index]);
      console.log(checked);
    } else {
      setHits((prev) => [...prev, index]);
      const distance = proximity(index, checked);
      const radius = calc(index, distance);
      setCircle((prev) => [...prev, ...radius]);
    }
  };

  const squares = Array.from({ length: 10000 }).map((_, index) => (
    <Sqr
      key={index}
      handleClick={() => handleClick(index)}
      backgroundColor={
        checked.includes(index)
          ? "dodgerblue"
          : hits.includes(index)
          ? "red"
          : circle.includes(index)
          ? "#222"
          : "black"
      }
    />
  ));

  return <div className={className}>{squares}</div>;
};

const StyledField = styled(Field)`
  display: grid;
  grid-template-columns: repeat(100, 4px); /* 100 columns, each 4px wide */
  grid-template-rows: repeat(100, 4px); /* 100 rows, each 4px high */
  gap: 0; /* No gap between the grid items */
  width: 400px;
  height: 400px;
  background-color: dodgerblue;
  border: 3px solid #333;
  &:hover {
    cursor: none;
  }
`;

export default StyledField;

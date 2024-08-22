import styled from "styled-components";
import Field from "./Field";

type Props = {
  className?: string;
};

function App({ className }: Props) {
  return (
    <div className={className}>
      <Field />
    </div>
  );
}

const StyledApp = styled(App)`
  max-width: 1280px;
  height: 100%;
  margin: auto;
  border: 2px solid gray;
  place-items: center;
  background-color: gray;
`;

export default StyledApp;

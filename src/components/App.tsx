import { useState, useEffect } from "react";
import styled from "styled-components";
import Introduce from "./Introduce";
import Lobby from "./Lobby";
import { socket } from "../config/socket";

type Props = {
  className?: string;
};

function App({ className }: Props) {
  const [status, setStatus] = useState<GameStatus>("introduction");

  useEffect(() => {
    socket.on("statusChange", (status) => {
      console.log(status);
      setStatus(status);
    });

    return () => {
      socket.off("statusChange");
    };
  }, []);
  return (
    <div className={className}>
      {status === "introduction" && <Introduce className="" />}
      {status === "lobby" && <Lobby className="" />}
    </div>
  );
}

const StyledApp = styled(App)`
  height: 100dvh;
  background-color: #240;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

export default StyledApp;

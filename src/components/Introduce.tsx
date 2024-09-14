import { useRef, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { socket } from "../config/socket";
import styled from "styled-components";

export interface IntroduceProps {
  className?: string;
}

const Introduce = ({ className }: IntroduceProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [prevNames, setPrevNames] = useState<string[]>([]);

  useEffect(() => {
    usernameRef.current?.focus();
    const nicknames = Cookies.get("aka")?.split(",");
    if (nicknames) setPrevNames(nicknames);
  }, []);

  const joinLobby = (name: string) => {
    socket.emit("joinRoom", { room: "lobby", name });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = usernameRef?.current?.value;
    if (name && prevNames.indexOf(name) === -1) {
      const newNames = [...prevNames, name];
      setPrevNames(newNames);
      Cookies.set("aka", newNames.join(","));
    }
    if (name) {
      joinLobby(name);
      usernameRef.current.value = "";
    }
  };

  const handleUsingPrevName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    e.preventDefault();
    joinLobby(name);
  };
  return (
    <main className={className}>
      <h1>Please, introduce yourself</h1>
      <p>Only latin characters, no punctuation or spaces</p>
      <form onSubmit={handleSubmit} className="inputForm">
        <label htmlFor="username">
          <input type="text" ref={usernameRef} />
        </label>
        <button className="btn">Enter lobby</button>
      </form>
      {prevNames.length > 0 && (
        <>
          <ul>
            {prevNames.map((item, index) => (
              <li key={index}>
                <button
                  onClick={(e) => handleUsingPrevName(e, item)}
                  className="btn"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

const StyledIntroduce = styled(Introduce)`
  width: 40%;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1rem;
  * {
    padding-top: 0.2rem;
  }
  color: var(--lightGreen);
  background-color: black;
  border-radius: 27px;

  ul {
    display: flex;
    flex-wrap: wrap;
    * {
      margin-right: 0.1rem;
    }
  }
`;

export default StyledIntroduce;

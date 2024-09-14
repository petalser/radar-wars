import { useRef } from "react";
import styled from "styled-components";
import Chat from "./Chat";

type Props = {
  className: string;
};

const Lobby = ({ className }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const data = new FormData(formRef.current);
      console.log(data);
    }
  };
  return (
    <main>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="name" />
        <input type="text" name="name" id="name" maxLength={7} minLength={1} />
        <label htmlFor="arena" />
        <input
          type="text"
          name="arena"
          id="arena"
          maxLength={7}
          minLength={1}
        />
        <button>Create arena</button>
      </form>
      <div>
        <Chat room="lobby" />
      </div>
      {/* {users.length > 0 ? () : "No active arenas"} */}
    </main>
  );
};

const StyledLobby = styled(Lobby)`
  height: 100dvh;
  background-color: #240;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

export default StyledLobby;

type GameStatus = "introduction" | "lobby";

interface Message {
  user: string;
  text: string;
  admin: boolean;
}

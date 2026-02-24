export type Board = {
  id: string;
  name: string;
  cards?: Card[];
};

type Card = {
  id: string;
  name: string;
  sequence: number;
};

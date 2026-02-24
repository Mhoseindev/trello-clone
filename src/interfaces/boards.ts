export type Board = {
  id: number;
  name: string;
  cards?: Card[];
};

type Card = {
  id: number;
  name: string;
};

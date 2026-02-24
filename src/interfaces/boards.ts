export type Comment = {
  id: number;
  text: string;
  author?: string;
  createdAt?: string;
};

export type Card = {
  id: number;
  uid?: string;
  name: string;
  comments?: Comment[];
};

export type Board = {
  id: number;
  name: string;
  cards?: Card[];
};

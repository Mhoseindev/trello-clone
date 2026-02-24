export type Board = {
  id?: string;
  name: string;
  columns?: Columns[];
};

type Columns = {
  id: string;
  name: string;
  sequence: number;
};

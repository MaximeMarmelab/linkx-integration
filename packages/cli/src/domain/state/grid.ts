export type Grid = Array<Array<string>>;

export type Adjacencies = {
  sourceTag: string;
  targetNodes: { [key: string]: number };
};

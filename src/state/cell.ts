export type cellTypes = "code" | "text";

export interface Cell {
  id: string;
  type: cellTypes;
  content: string;
}

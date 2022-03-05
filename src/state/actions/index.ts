import { ActionType } from "../action-types";
import { cellTypes } from "../cell";

export type Direction = "up" | "down";

export interface MoveCell {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface UpdateCell {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface DeleteCell {
  type: ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

export interface InsertCellAfter {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: cellTypes;
  };
}

export interface BundleCreatedAction {
  type: ActionType.BUNDLE_CREATED;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export type Action =
  | MoveCell
  | UpdateCell
  | DeleteCell
  | InsertCellAfter
  | BundleCreatedAction;

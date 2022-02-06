import { ActionType } from "../action-types";
import {cellTypes} from "../cell";

export type Direction = 'up' | 'down';

export interface MoveCell {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: "up" | "down";
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

export interface InsertCellBefore {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: cellTypes;
  };
}

export type Action = MoveCell | UpdateCell | DeleteCell | InsertCellBefore;

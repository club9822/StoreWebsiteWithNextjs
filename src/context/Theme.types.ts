import { IAction } from '@/types/SharedTypes';

export enum ITheme{
  Dark,
  White
}
export interface IThemeState {
  theme: ITheme;
}
export interface IThemeAction extends IAction {
  type : string;
  payload:{theme:ITheme;};
}

/**
 *
 *
 *
 */
export const CHANGE_THEME = 'CHANGE_THEME';

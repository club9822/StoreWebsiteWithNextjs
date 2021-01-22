import { createContext, useContext, useReducer } from 'react';
import {
  CHANGE_THEME, ITheme, IThemeAction, IThemeState,
} from './Theme.types';

const ThemeStateContext = createContext(null);
const ThemeDispatchContext = createContext(null);

const INITIAL_STATE:IThemeState = {
  theme: ITheme.White,
};

const reducer = (state:IThemeState, action:IThemeAction):IThemeState => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: action.payload.theme };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <ThemeDispatchContext.Provider value={dispatch}>
      <ThemeStateContext.Provider value={state}>
        {children || null}
      </ThemeStateContext.Provider>
    </ThemeDispatchContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeStateContext);
export const useDispatchTheme = () => useContext(ThemeDispatchContext);

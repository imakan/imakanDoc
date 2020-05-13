import React from 'react'

export const themes = {
  light: {
    foreground: '#ffffff',
    background: '#222222',
  },
  dark: {
    foreground: '#000000',
    background: 'rgb(228,174,31)',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);
export const LocalContext = React.createContext(
  themes.light
   // 默认值
);



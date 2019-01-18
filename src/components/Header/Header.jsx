import React from 'react';

import { dinoCat } from '../../static/emojis';

function Header() {
  return (
    <header className="app-header">
      <img className="app-header__icon" src={dinoCat} alt="" />
      <span className="app-header__splash">habender</span>
    </header>
  );
}

export default Header;

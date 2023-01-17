import React from "react";

import "./themePicker.scss";

function ThemePicker(props) {
  const { colorTheme, handleColorChange, style } = props;

  return (
    <div className={style}>
      <div className={colorTheme}>
        <select defaultValue="" className="mt-1" onChange={handleColorChange}>
          <option value="" disabled selected className="hidden">
            Theme
          </option>
          <option value="default">Brown</option>
          <option value="purple">Purple</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
        </select>
      </div>
    </div>
  );
}

export default ThemePicker;

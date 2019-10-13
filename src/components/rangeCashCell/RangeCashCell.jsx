import React, { useRef } from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";

const RangeCashCell = props => {
  const minTextBox = useRef(null);
  const maxTextBox = useRef(null);

  const inRange = (current, { min, max }) =>
    (min === null || current >= min) && (max === null || current <= max);

  const onChange = event => {
    props.onChange({
      value: { min: minTextBox.current.value, max: maxTextBox.current.value },
      operator: inRange,
      syntheticEvent: event.syntheticEvent
    });
  };

  const onClearButtonClick = event => {
    event.preventDefault();
    props.onChange({
      value: null,
      operator: "",
      syntheticEvent: event
    });
  };

  const value = props.value || null;

  return (
    <div>
      От:
      <span style={{ margin: "0 16px 0 2px" }}>
        <NumericTextBox
          width="80px"
          value={value && value.min}
          ref={minTextBox}
          onChange={onChange}
          min={0}
          max={1000}
        />
      </span>
      До:
      <span style={{ margin: "0 2px 0 4px" }}>
        <NumericTextBox
          width="80px"
          value={value && value.max}
          ref={maxTextBox}
          onChange={onChange}
          min={0}
          max={1000}
        />
      </span>
      <button
        className="k-button k-button-icon k-clear-button-visible"
        title="Очистить"
        disabled={!value}
        onClick={onClearButtonClick}
      >
        <span className="k-icon k-i-filter-clear" />
      </button>
    </div>
  );
};

export default RangeCashCell;

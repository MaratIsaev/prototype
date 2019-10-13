import React from "react";

const CommandCell = ({ editClick, removeClick }) => props => {
  const {
    dataItem,
    dataItem: { id }
  } = props;

  return (
    <td className="k-command-cell">
      <button
        className="k-primary k-button k-grid-edit-command"
        onClick={() => editClick(dataItem)}
      >
        Изменить
      </button>
      <button
        className="k-button k-grid-remove-command"
        onClick={() => removeClick(id)}
      >
        Удалить
      </button>
    </td>
  );
};

export default CommandCell;

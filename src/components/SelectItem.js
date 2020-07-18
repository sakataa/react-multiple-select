import React from 'react';

const SelectItem = (props) => {
  const { item, hasChildren, onChange, onCollapse, ...otherProps } = props;
  const { id, name, checked, level, disabled, parentId } = item;

  const itemClassName = `multiple-select-item ${hasChildren ? 'treeview-select-item' : ''} level-${level}`;
  const itemStyle = hasChildren ? { paddingLeft: level * 20 } : null;

  const handleChange = () => {
    onChange(item);
  };

  return (
    <li className={itemClassName} style={itemStyle} {...otherProps}>
      {hasChildren && <button className="btnCaretOption" onClick={onCollapse}></button>}
      <input
        id={id}
        type="checkbox"
        className="option-checkbox"
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
      />
      <label className="option-label" htmlFor={id}>
        {name}
      </label>
    </li>
  );
};

export default SelectItem;

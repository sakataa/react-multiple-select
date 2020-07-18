import React from 'react';
import PropTypes from 'prop-types';

import SelectItem from './SelectItem';

const MultipleSelectList = (props) => {
  const { dataSource, onChange } = props;
  const renderSelectList = () => {
    const selectList = dataSource.map((item) => {
      const { id, level } = item;
      const itemKey = `${level}-${id}-optionItem`;
      const hasChildren = !!dataSource.find((x) => x.parentId === id);

      return <SelectItem id={itemKey} key={itemKey} item={item} hasChildren={hasChildren} onChange={onChange} />;
    });

    return selectList;
  };

  if (!dataSource?.length) {
    return <span>No information</span>;
  }

  return <ul className="multiple-select-options">{renderSelectList()}</ul>;
};

MultipleSelectList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};

MultipleSelectList.defaultProps = {};

export default MultipleSelectList;

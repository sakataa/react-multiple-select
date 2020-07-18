import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { convertToFlattenedData } from '../utils/treeDataConverter';
import { processCheckingItem } from '../utils/treeCheckingHandler';
import MultipleSelectList from './MultipleSelectList';

const MultipleSelectContainer = (props) => {
  const {
    dataSource,
    onCheck,
    idField,
    nameField,
    childrenField,
    selectedIds,
    disabledIds,
    disabledLevels,
    needToConvertEntry,
    cascadeChecking,
  } = props;

  const [flattenedDataSource, setFlattenedDataSource] = useState([]);

  const handleOnChange = (item) => {
    const handleChecking = processCheckingItem(item, cascadeChecking);
    const newDataSource = handleChecking(flattenedDataSource);

    setFlattenedDataSource(newDataSource);
  };

  useEffect(() => {
    const data = needToConvertEntry
      ? convertToFlattenedData(
          dataSource,
          idField,
          nameField,
          childrenField,
          selectedIds,
          disabledIds,
          disabledLevels,
          cascadeChecking
        )
      : dataSource;

    setFlattenedDataSource(data);
  }, [
    dataSource,
    idField,
    nameField,
    childrenField,
    selectedIds,
    disabledIds,
    disabledLevels,
    needToConvertEntry,
    cascadeChecking,
  ]);

  return (
    <div className="multiple-select-container">
      <div className="multiple-select-default multiple-select-options-container" style={{ display: 'block' }}>
        <MultipleSelectList dataSource={flattenedDataSource} onChange={handleOnChange} />
      </div>
    </div>
  );
};

MultipleSelectContainer.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({})),
  idField: PropTypes.string,
  nameField: PropTypes.string,
  childrenField: PropTypes.string,
  onCheck: PropTypes.func,
  needToConvertEntry: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  disabledIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  disabledLevels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  cascadeChecking: PropTypes.bool,
};

MultipleSelectContainer.defaultProps = {
  dataSource: [],
  idField: 'id',
  nameField: 'name',
  childrenField: 'children',
  onCheck: () => [],
  needToConvertEntry: true,
  selectedIds: [],
  disabledIds: [],
  disabledLevels: [],
  cascadeChecking: true,
};

export default MultipleSelectContainer;

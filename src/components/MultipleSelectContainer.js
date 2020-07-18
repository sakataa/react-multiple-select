import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { convertToFlattenedData } from '../utils/treeDataConverter';

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
    <div>
      <ul>
        {flattenedDataSource.map((x) => {
          return <li>{JSON.stringify(x)}</li>;
        })}
      </ul>
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

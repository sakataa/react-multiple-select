export const convertToFlattenedData = (
  dataSource,
  idField,
  nameField,
  childrenField,
  selectedIds,
  disabledIds,
  disabledLevels,
  cascadeChecking,
  level = 0,
  parentId = null
) => {
  const result = [];

  if (dataSource?.length) {
    for (let i = 0; i < dataSource.length; i++) {
      const item = dataSource[i];
      const { [idField]: id, [nameField]: name, [childrenField]: children } = item;
      const flattenedItem = {
        id,
        name,
        level,
        parentId,
        disabled: !!disabledIds?.includes(id) || !!disabledLevels?.includes(level),
      };

      const hasChildren = !!children?.length;
      flattenedItem.checked =
        cascadeChecking && hasChildren
          ? children.every((child) => selectedIds.includes(child[idField]))
          : !!selectedIds?.includes(id);

      result.push(flattenedItem);

      if (hasChildren) {
        const flattenedChildren = convertToFlattenedData(
          children,
          idField,
          nameField,
          childrenField,
          selectedIds,
          disabledIds,
          disabledLevels,
          cascadeChecking,
          level + 1,
          flattenedItem.id
        );
        result.push(...flattenedChildren);
      }
    }
  }

  return result;
};

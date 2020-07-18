export const processCheckingItem = (item, cascadeChecking) => {
  const { id, checked, level } = item;
  const newChecked = !checked;

  const handleUpdateTreeViewData = (flattenedTreeData) => {
    const activeItem = flattenedTreeData.find((x) => x.id === id && x.level === level);
    if (!activeItem) {
      return;
    }

    activeItem.checked = newChecked;
    if (!cascadeChecking) {
      return;
    }

    const children = getChildren(flattenedTreeData, id, level);

    // handle for children of checking item
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.checked = newChecked;

      const { id: childId, level: childLevel } = child;
      const dataItemChildren = getChildren(flattenedTreeData, childId, childLevel);

      if (dataItemChildren?.length) {
        updateCheckingForChildren(dataItemChildren, newChecked, flattenedTreeData);
      }
    }

    const parents = getParents(flattenedTreeData, activeItem.parentId, activeItem.level);

    // handle for parent and upper of checking item
    for (let i = 0; i < parents.length; i++) {
      const parentItem = parents[i];

      if (shouldChangeCheckingParent(flattenedTreeData, parentItem)) {
        parentItem.checked = !parentItem.checked;
      }
    }

    return [...flattenedTreeData];
  };

  return handleUpdateTreeViewData;
};

const updateCheckingForChildren = (children, parentChecked, flattenedTreeData) => {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    child.checked = parentChecked;

    const itemChildren = getChildren(flattenedTreeData, child.id, child.level);

    if (itemChildren?.length) {
      updateCheckingForChildren(itemChildren, parentChecked, flattenedTreeData);
    }
  }
};

const shouldChangeCheckingParent = (flattenedTreeData, parent) => {
  const children = getChildren(flattenedTreeData, parent.id, parent.level);
  if (children.length === 0) {
    return false;
  }

  const isCheckedAll = children.length === children.filter((x) => x.checked).length;

  return parent.checked !== isCheckedAll;
};

const getChildren = (flattenedTreeData, itemId, parentLevel) => {
  return flattenedTreeData?.filter((x) => x.parentId === itemId && x.level === parentLevel + 1 && !x.disabled) ?? [];
};

const getParents = (flattenedTreeData, itemParentId, itemLevel) => {
  const parents = [];

  if (itemLevel > 0) {
    const parentItem = flattenedTreeData?.find(
      (x) => x.id === itemParentId && x.level === itemLevel - 1 && !x.disabled
    );
    if (parentItem) {
      parents.push(parentItem);

      if (!!parentItem.parentId) {
        parents.push(...getParents(flattenedTreeData, parentItem.parentId, parentItem.level));
      }
    }
  }

  return parents;
};

function useTraverse() {
  function addData(tree, currentFolderId, nameOfFolder, isFolder) {
    if (tree.id === currentFolderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().toISOString(),
        name: nameOfFolder,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestitem = [];
    latestitem = tree.items.map((val) => {
      return addData(val, currentFolderId, nameOfFolder, isFolder);
    });
    return { ...tree, items: latestitem };
  }

  return { addData };
}

export default useTraverse;

import React, { useState } from 'react'
import Folder from './components/Folder'
import actualData from './data/folderData'
import useTraverse from './hooks/use-traverse'

function FileStructure() {
  const [folderdata, setFolderDate] = useState(actualData)

  const { addData } = useTraverse()

  const addDataHandler = (currentFolderId, nameOfFolder, isFolder) => {
    const addedData = addData(folderdata, currentFolderId, nameOfFolder, isFolder)
    setFolderDate(addedData)
  }

  return (
    <Folder addDataHandler={addDataHandler} data={folderdata} />
  )
}

export default FileStructure
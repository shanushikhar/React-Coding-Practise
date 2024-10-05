import React, { useState } from "react";

function Folder({ data, addDataHandler }) {
  const [openFolder, setOpenFolder] = useState(false)
  const [inputValue, setInputValue] = useState({
    visible: false,
    isFolder: false
  })

  const showInputHandler = (e, isFolderVal) => {
    e.stopPropagation()
    setOpenFolder(true)
    setInputValue({ visible: true, isFolder: isFolderVal })
  }

  const handleInputValue = (e) => {
    if (e.keyCode === 13 && e.target.value) {

      addDataHandler(data.id, e.target.value, inputValue.isFolder)

      setInputValue({ ...inputValue, visible: false })
    }
  }

  if (data.isFolder) {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", marginTop: 8, gap: 6 }} onClick={() => setOpenFolder(!openFolder)} >
          <span >📂 {data.name}</span>
          <button onClick={(e) => showInputHandler(e, true)} > + Folder</button>
          <button onClick={(e) => showInputHandler(e, false)}> + File</button>
        </div>

        <div style={{ display: openFolder ? "block" : "none", gap: 5, marginLeft: 10 }}>

          {inputValue.visible && <div>
            <span>{inputValue.isFolder ? "📂" : "📜"}</span>
            <input
              type="text"
              autoFocus
              onKeyDown={handleInputValue}
              onBlur={() => setInputValue({ ...inputValue, visible: false })}
            />
          </div>}

          {data.items.map((exp) => {
            return (
              <Folder addDataHandler={addDataHandler} key={exp.id} data={exp} />
            );
          })}
        </div>

      </>
    );
  } else {
    return <span style={{ display: "block", marginTop: 6 }}>📜 {data.name}</span>
  }
}

export default Folder;

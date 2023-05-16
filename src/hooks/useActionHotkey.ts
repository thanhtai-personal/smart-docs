import { useCallback, useEffect } from "react";

const useModalHotkey = (selectedItem: any, events: any) => {
  const { onDelete, onEdit } = events;

  const handleKeyDown = useCallback(
    (event: any) => {
        console.log("event.key", event.key)
      if (!selectedItem) return;
      if (event.ctrlKey && event.key === "Delete") {
        onDelete(selectedItem)
      }
      if (event.key === "Enter") {
        onEdit(selectedItem)
      }
    },
    [selectedItem, onDelete, onEdit]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);
};

export default useModalHotkey;
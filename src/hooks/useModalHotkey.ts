import { useEffect, useState } from "react";

const useModalHotkey = () => {
  const [jsonInputModalOpen, setJsonInputModalOpen] = useState(false);

  const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.key === "o") {
      event.preventDefault();
      setJsonInputModalOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return [jsonInputModalOpen, setJsonInputModalOpen];
};

export default useModalHotkey;

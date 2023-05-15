import { useCallback, useEffect, useState } from "react";

const useLocalStorageData = (key: string, defaultData?: any) => {
  const [jsonData, setJsonData] = useState("");

  useEffect(() => {
    const storageData = localStorage.getItem(key);
    setJsonData(storageData || JSON.stringify(defaultData));
  }, [key, defaultData]);

  const handleUpdateJson = useCallback((data: string) => {
    setJsonData(data);
    localStorage.setItem(key, data);
  }, [key]);

  return [jsonData, jsonData ? JSON.parse(jsonData) : {}, handleUpdateJson];
};

export default useLocalStorageData;

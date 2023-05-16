import { useCallback, useEffect, useState } from "react";

const useLocalStorageData = (key: string, defaultData?: any) => {
  const [jsonData, setJsonData] = useState("");

  useEffect(() => {
    console.log("key", key)
    if (key) {
      const storageData = localStorage.getItem(key);
    console.log("storageData", storageData)
    console.log("defaultData", defaultData)
    if (storageData) {
      setJsonData(storageData);
    } else if (defaultData) {
      setJsonData(defaultData);
    }
    }
  }, [key, defaultData]);

  const handleUpdateJson = useCallback(
    (data: string) => {
      setJsonData(data);
      localStorage.setItem(key, data);
    },
    [key]
  );

  return [jsonData, jsonData ? JSON.parse(jsonData) : {}, handleUpdateJson];
};

export default useLocalStorageData;

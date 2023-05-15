import { useCallback, useEffect, useState } from "react";

const useFormInModalLogic = (props: any) => {
  const { mappingSubmitData, initialData, onSubmit } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    if (initialData) {
      setValues(initialData);
    }
  }, [initialData]);

  const handleUpdateData = useCallback(() => {}, []);

  const handleUpdateRelatedFields = useCallback(() => {}, []);

  const handleUpdateErrors = useCallback(() => {}, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
    setValues({});
  }, []);

  const handleOpenModal = useCallback((values?: any) => {
    setValues(values || {});
    setIsOpenModal(true);
  }, [])

  const handleSubmit = useCallback(() => {
    const dataSubmit = mappingSubmitData ? mappingSubmitData(values) : values;
    onSubmit && onSubmit(dataSubmit);
  }, []);

  return [
    {
      isOpenModal,
      values
    },
    {
      handleUpdateData,
      handleUpdateRelatedFields,
      handleUpdateErrors,
      handleOpenModal,
      handleCloseModal,
      handleSubmit,
    },
  ];
};

export default useFormInModalLogic;

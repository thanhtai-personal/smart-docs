import { useCallback, useEffect, useState } from "react";

const useFormInModalLogic = (props: any) => {
  const { mappingSubmitData, initialData, onSubmit } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setValues(initialData);
    }
  }, [initialData]);

  const handleUpdateData = useCallback((name: string, value: any) => {
    if (!name) return;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleUpdateRelatedFields = useCallback((item: any, newValue: any) => {
    if (!item.updateRelatedFields) return
    item.updateRelatedFields(newValue, errors);
  }, []);

  const handleUpdateErrors = useCallback((name: string, error: any) => {
    if (!name) return;
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
    setValues({});
  }, []);

  const handleOpenModal = useCallback((values?: any) => {
    setValues(values || {});
    setIsOpenModal(true);
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      const dataSubmit = mappingSubmitData ? mappingSubmitData(values) : values;
      if (onSubmit) {
        await onSubmit(dataSubmit);
      }
    } catch (error) {
    } finally {
      handleCloseModal();
    }
  }, [values, onSubmit, handleCloseModal, mappingSubmitData]);

  return [
    {
      isOpenModal,
      values,
      errors
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

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

  const handleAdd = useCallback(() => {}, []);

  const handleEdit = useCallback(() => {}, []);

  const handleUpdateData = useCallback(() => {}, []);

  const handleUpdateRelatedFields = useCallback(() => {}, []);

  const handleUpdateErrors = useCallback(() => {}, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
    setValues({});
  }, []);

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
      handleAdd,
      handleEdit,
      handleUpdateData,
      handleUpdateRelatedFields,
      handleUpdateErrors,
      handleCloseModal,
      handleSubmit,
    },
  ];
};

export default useFormInModalLogic;

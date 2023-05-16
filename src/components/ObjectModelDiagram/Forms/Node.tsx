import Form from "app/components/Form";
import useFormInModalLogic from "app/hooks/useFormInModalLogic";
import { nodeTypesMapping } from "app/utils/constants";
import { memo, useMemo } from "react";

const NodeForm = (props: any) => {
  const { nodeType, nodes, edges, onUpdateJson, onNodesChange, initialValues } =
    props;

  const mappingNodeSubmitData = useMemo(() => {
    return nodeTypesMapping[nodeType].mappingSubmitData
      ? nodeTypesMapping[nodeType].mappingSubmitData
      : (values: any) => values;
  }, [nodeType]);

  const [nodeFormData, nodeFormEvents] = useFormInModalLogic({
    formData: {
      nodes,
      edges,
    },
    initialData: initialValues,
    onUpdateFormData: (changes: Array<any>) => {
      onNodesChange && onNodesChange(changes);
      onUpdateJson({
        nodes,
        edges,
      });
    },
    onSubmit: async (newNode: any) => {
      onUpdateJson({
        edges: edges || [],
        nodes: [...(nodes || []), newNode],
      });
    },
    mappingSubmitData: mappingNodeSubmitData,
    mappingInitialValues: nodeTypesMapping[nodeType].mappingInitialValues
  });

  return (
    <Form
      title={nodeTypesMapping[nodeType].createTitle}
      values={nodeFormData.values}
      validate={nodeTypesMapping[nodeType].validate}
      model={nodeTypesMapping[nodeType].model}
      onSubmit={nodeFormEvents.handleSubmit}
      getOptions={nodeTypesMapping[nodeType].getOptions}
      errors={nodeFormData.errors}
      dataSelected={{
        nodes,
        edges,
        supportedNodeClassname: [
          {
            key: "heading",
            value: "heading",
            label: "heading",
          },
        ],
      }}
      onUpdateForm={nodeFormEvents.handleUpdateData}
      onRelatedUpdate={nodeFormEvents.handleUpdateRelatedFields}
      onErrorUpdate={nodeFormEvents.handleUpdateErrors}
    />
  );
};

export default memo(NodeForm);

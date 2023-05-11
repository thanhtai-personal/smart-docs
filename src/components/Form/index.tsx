import React, { useMemo } from "react";
import { Form as FomikForm, Formik, FormikProps } from "formik";
import Field from "@/components/Field";

interface FormProps {
  title: string;
  initialValues: any;
  validate: any;
  model: any;
  onSubmit: any;
  getOptions?: any;
  dataSelected?: any;
}

const Form = (props: FormProps) => {
  const {
    title,
    initialValues = {},
    validate = (values: any) => {
      return true;
    },
    model = {},
    onSubmit,
    getOptions = {},
    dataSelected,
  } = props;

  const passedDataGetOptions = useMemo(() => {
    return Object.keys(getOptions).reduce((prev: any, current: string) => {
      return {
        ...prev,
        [current]: getOptions[current](dataSelected),
      };
    }, {});
  }, [getOptions]);

  const fields = useMemo(
    () =>
      Object.keys(model)
        .map((key) => ({
          ...model[key],
          name: key,
        }))
        .sort((a, b) => (a.priority || 1) - (b.priority || 1)),
    [model]
  );

  return (
    <div
      style={{
        minWidth: "40vw",
        maxWidth: "75vw",
        padding: "8px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          borderBottom: "solid 1px rgba(0,0,0, 0.125)",
          padding: "8px",
        }}
      >
        <h1 style={{ fontWeight: 700, textTransform: "uppercase" }}>{title}</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        validateOnChange={false}
        enableReinitialize
        onSubmit={async (values, actions) => {
          try {
            await (onSubmit && onSubmit(values));
          } catch (error) {
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {(props: FormikProps<any>) => (
          <FomikForm>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "16px",
              }}
            >
              {fields.map((item) => {
                return (
                  <Field
                    key={`item-${item.priority}-${item.id}`}
                    item={item}
                    getOptions={passedDataGetOptions}
                  />
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                padding: "8px 0",
              }}
            >
              <button
                type="submit"
                disabled={props.isSubmitting}
                style={{
                  background: "steelblue",
                  padding: "8px",
                }}
              >
                Save
              </button>
            </div>
          </FomikForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;

import React, { useMemo } from "react";
import { Formik } from "formik";

interface FormProps {
  title: string;
  initialValues: any;
  validate: any;
  model: any;
  onSubmit: any;
}

const Form = (props: FormProps) => {
  const {
    title,
    initialValues = {},
    validate = (values: any) => {
      return true
    },
    model = {},
    onSubmit,
  } = props;

  const fields = useMemo(
    () =>
      Object.keys(model)
        .map((key) => model[key])
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
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await (onSubmit && onSubmit(values));
          } catch (error) {
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          validateForm,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "16px",
                }}
              >
                {fields.map((item) => {
                  return (
                    <div
                      key={`item-${item.priority}`}
                      style={{
                        marginTop: "8px",
                      }}
                    >
                      {item.render({
                        item,
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        validateForm,
                      })}
                    </div>
                  );
                })}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Form;

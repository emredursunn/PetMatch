import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  animalType: Yup.string().when("step", {
    is: 1,
    then: (schema) => schema.required("Animal type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  breed: Yup.string().when("step", {
    is: 2,
    then: (schema) => schema.required("Breed is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  gender: Yup.string().when("step", {
    is: 3,
    then: (schema) => schema.required("Gender is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  title: Yup.string().when("step", {
    is: 4,
    then: (schema) =>
      schema.max(16, "Title is too long").required("Title is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  colors: Yup.array().when("step", {
    is: 4,
    then: (schema) =>
      schema
        .min(1, "At least one color is required")
        .required("Colors are required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  photos: Yup.array()
    .of(Yup.string())
    .when("step", {
      is: 5,
      then: (schema) =>
        schema
          .min(1, "At least one photo is required")
          .required("Photos are required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  description: Yup.string().when("step", {
    is: 5,
    then: (schema) => schema.required("Description is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

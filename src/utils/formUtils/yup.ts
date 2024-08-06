import * as Yup from "yup";

export const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Hayvanın ismini girin"),
    breed: Yup.string().required("Cins seçin"),
    gender: Yup.string().required("Cinsiyet seçin"),
    description: Yup.string().required("Açıklama girin"),
    color: Yup.array()
      .min(1, "Renk seçin")
      .max(2, "En fazla 2 renk seçebilirsiniz")
      .required("Renk seçin"),
    photos: Yup.array()
      .of(Yup.string().url("Invalid photo URL"))
      .min(1, "At least one photo is required"),
  });
};

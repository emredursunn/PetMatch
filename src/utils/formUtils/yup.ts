import * as Yup from "yup";

export const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Hayvanın ismini girin"),
    breed: Yup.string().required("Cins seçin"),
    gender: Yup.string().required("Cinsiyet seçin"),
    description: Yup.string().required("Açıklama girin"),
    color: Yup.string().required("Renk seçin"),
  });
};

import { AnimalMarker } from "../types/AnimalMarker";
import { animalTypes } from "./constants";

export const dummyPetList: AnimalMarker[] = [
  {
    id: "1",
    latitude: 37.548271,
    longitude: -121.988571,
    title: "Kedi",
    data: {
      animalType: animalTypes.cat,
      title: "Boncuk",
      age: "1-2 years old",
      gender: "female",
      breed: "Tekir",
      colors: ["White"],
      images: [
        "https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg",
        "data:image/jpeg;base64,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",
      ],
      contact: "+905455430857",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
  },
  {
    id: "2",
    latitude: 37.521817,
    longitude: -121.950214,
    title: "Kedi",
    data: {
      animalType: animalTypes.cat,
      title: "Misket",
      age: "3-4 years old",
      gender: "male",
      breed: "Angora",
      colors: ["Gray"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjprtCGa3uN64o4Cz5jWOh98a2iZiJI2vdSg&s",
      ],
      contact: "+905455430857",
      description:
        "Misket, sevimli ve oyuncu bir Angora kedisidir. 3-4 yaşlarında, gri renkte ve erkek. Ailesini seven ve enerjik bir arkadaş arıyor. İyi bir ev ortamında mutlu olacaktır.",
    },
  },
  {
    id: "3",
    latitude: 37.414182,
    longitude: -121.9784,
    title: "Kedi",
    data: {
      animalType: animalTypes.cat,
      title: "Şeker",
      age: "2 years old",
      gender: "female",
      breed: "British Shorthair",
      colors: ["Cream"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfnh1rknRRYVddKPdBn0cSD1mWwx9_TH78_g&s",
      ],
      contact: "+905455430857",
      description:
        "Şeker, 2 yaşında bir British Shorthair dişisidir. Krem rengindeki tüyleriyle dikkat çeker ve oldukça nazlıdır. Sakin bir yaşam alanında huzur içinde yaşamak istiyor.",
    },
  },
  {
    id: "4",
    latitude: 37.4222936,
    longitude: -122.043922,
    title: "Kedi",
    data: {
      animalType: animalTypes.cat,
      title: "Limon",
      age: "1 year old",
      gender: "male",
      breed: "Siyam",
      colors: ["Orange"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3qh9ksCl1vjuAA2VpS18ZxBwsRpeQ0kJ2vw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyG_Vd3eyrEgdlOcPXnjKTI1ClXdeohxcLA&s",
      ],
      contact: "+905455430857",
      description:
        "Limon, 1 yaşında bir Siyam kedisidir. Turuncu renkteki tüyleri ve enerjik yapısıyla dikkat çeker. Oynamayı seven bu genç kedi, yeni bir aileye katılmayı dört gözle bekliyor.",
    },
  },
  {
    id: "5",
    latitude: 37.4525936,
    longitude: -122.095922,
    title: "Kedi",
    data: {
      animalType: animalTypes.cat,
      title: "Pamuk",
      age: "2-3 years old",
      gender: "female",
      breed: "Maine Coon",
      colors: ["Black"],
      images: [
        "data:image/jpeg;base64,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",
      ],
      contact: "+905455430857",
      description:
        "Pamuk, 2-3 yaşlarında bir Maine Coon dişisidir. Siyah tüyleri ve büyük, dikkat çekici gözleri ile tanınır. Huzurlu bir yaşam alanında mutlu olacaktır ve iyi bir aile dostu olacaktır.",
    },
  },
];

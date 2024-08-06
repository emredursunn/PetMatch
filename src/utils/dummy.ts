import { AnimalMarker } from "../types/AnimalMarker";

export const dummyPetList: AnimalMarker[] = [
  {
    id: "1",
    latitude: 37.4220936,
    longitude: -122.083922,
    title: "Kedi",
    data: {
      name: "Boncuk",
      age: "1-2 years old",
      sex: "female",
      species: "Tekir",
      color: "White",
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
    latitude: 37.4223936,
    longitude: -122.084222,
    title: "Kedi",
    data: {
      name: "Misket",
      age: "3-4 years old",
      sex: "male",
      species: "Angora",
      color: "Gray",
      images:[],
      contact: "+905455430857",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
  },
  {
    id: "3",
    latitude: 37.4226936,
    longitude: -122.084522,
    title: "Kedi",
    data: {
      name: "Şeker",
      age: "2 years old",
      sex: "female",
      species: "British Shorthair",
      color: "Cream",
      images:[],
      contact: "+905455430857",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
  },
  {
    id: "4",
    latitude: 37.4229936,
    longitude: -122.084822,
    title: "Kedi",
    data: {
      name: "Limon",
      age: "1 year old",
      sex: "male",
      species: "Siyam",
      color: "Orange",
      images:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3qh9ksCl1vjuAA2VpS18ZxBwsRpeQ0kJ2vw&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyG_Vd3eyrEgdlOcPXnjKTI1ClXdeohxcLA&s"],
      contact: "+905455430857",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
  },
  {
    id: "5",
    latitude: 37.4232936,
    longitude: -122.085122,
    title: "Kedi",
    data: {
      name: "Pamuk",
      age: "2-3 years old",
      sex: "female",
      species: "Maine Coon",
      color: "Black",
      images:["data:image/jpeg;base64,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"],
      contact: "+905455430857",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
  },
];
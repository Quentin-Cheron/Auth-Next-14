export const steps = [
  {
    title: "Information personnelle",
    fields: [
      {
        name: "name",
        label: "Name",
        placeholder: "John Doe",
        type: "text",
      },
      {
        name: "email",
        label: "Email",
        placeholder: "john.doe@exemple.com",
        type: "email",
      },
      {
        name: "phone",
        label: "Phone",
        placeholder: "06 12 34 56 78",
        type: "text",
      },
    ],
  },
  {
    title: "Information de connexion",
    fields: [
      {
        name: "password",
        label: "Password",
        placeholder: "******",
        type: "password",
      },
      {
        name: "confirmPassword",
        label: "Confirm password",
        placeholder: "*******",
        type: "password",
      },
    ],
  },
  {
    title: "Information professionnelle",
    fields: [
      {
        name: "profession",
        fields: [
          "Hypnotherapist",
          "Psychologist",
          "Psychotherapist",
          "Coach",
          "Other",
        ],
        label: "Profession",
        placeholder: "Select your profession",
        type: "text",
      },
      {
        name: "speciality",
        label: "Speciality",
        placeholder: "Hypnosis",
        type: "text",
      },
      {
        name: "description",
        label: "Description",
        placeholder: "I am a hypnotherapist who helps people with th...",
        type: "text",
      },
      {
        name: "image",
        label: "Image",
        placeholder: "",
        type: "text",
      },
    ],
  },
  {
    title: "Information d'adresse",
    fields: [
      {
        name: "address",
        label: "Address",
        placeholder: "5 rue de la paix",
        type: "text",
      },
      {
        name: "city",
        label: "City",
        placeholder: "Paris",
        type: "text",
      },
      {
        name: "zip",
        label: "Postal code",
        placeholder: "75000",
        type: "text",
      },
      {
        name: "country",
        label: "Country",
        placeholder: "France",
        type: "text",
      },
    ],
  },
];

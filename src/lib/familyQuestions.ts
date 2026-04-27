export type FamilyQuestion = {
  question: string;
  options: string[];
};

export const familyQuestions: FamilyQuestion[] = [
  {
    question: "Where did Jamie & Tin get married?",
    options: ["Barbados", "Antarctica", "Italy", "New Zealand", "Mongolia"],
  },
  {
    question: "Where did Tin grow up?",
    options: [
      "On a farm near Wyrallah",
      "In a high rise city apartment in Japan",
      "On a remote jungle island off the coast of Papua New Guinea",
      "Deep in the Amazon rainforest",
      "Hollywood Hills near Los Angeles",
    ],
  },
  {
    question: "How many children do Tin & Jamie have?",
    options: ["6", "4", "2", "None"],
  },
];

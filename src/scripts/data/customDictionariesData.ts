export type TCustomDictionary = {
  id: number;
  name: string;
};

export default function customDictionariesData() {
  const data: TCustomDictionary[] = [
    {
      id: 1,
      name: "Alpha lexicon",
    },
    {
      id: 2,
      name: "Beta lexicon",
    },
    {
      id: 3,
      name: "Gamma lexicon",
    },
    {
      id: 30,
      name: "Old gamma lexicon",
    },
    {
      id: 4,
      name: "Delta lexicon",
    },
  ];
  return data;
}

export type TDictionariesData = {
  id: number;
  name: string;
  enabled: boolean;
}[];

export default function dictionariesData() {
  const data: TDictionariesData = [
    { id: 1, name: "Mahavyutpatti", enabled: true },
    { id: 2, name: "Erik pema kunsang", enabled: true },
    { id: 3, name: "Ives waldo", enabled: true },
    { id: 4, name: "Jeffrey hopkins", enabled: false },
    { id: 5, name: "Lobsang monlam", enabled: true },
    { id: 6, name: "Verb lexicon", enabled: true },
    { id: 7, name: "Tibetan multi", enabled: false },
    { id: 8, name: "Tibetan medicine", enabled: true },
    { id: 9, name: "Lotus king", enabled: false },
    { id: 10, name: "Jim Welby", enabled: false },
    { id: 11, name: "84000", enabled: false },
    { id: 12, name: "Laine Abbreviations", enabled: false },
    { id: 13, name: "Tsig Dzo Chenmo", enabled: false },
    { id: 14, name: "Negi Sanskrit", enabled: false },
    { id: 15, name: "Tsepak Rigdzin", enabled: false },
    { id: 16, name: "Yogacharabhumi Sanskrit", enabled: false },
    { id: 17, name: "Sera", enabled: true },
    { id: 18, name: "Chandra Sanskrit", enabled: false },
    { id: 19, name: "Dag Yig", enabled: false },
    { id: 20, name: "Monlam", enabled: false },
  ];
  return data;
}

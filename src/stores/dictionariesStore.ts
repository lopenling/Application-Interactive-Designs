import { defineStore } from "pinia";
import { useTeamsStore } from "@stores/teamsStore";

export type TNativeDictionary = {
  id: number;
  name: string;
};
export type TCustomDictionary = {
  id: number;
  name: string;
};
export type TDictionaryTypes = {
  native: TSingularDictionaryType;
  custom: TSingularDictionaryType;
};
export type TSingularDictionaryType = {
  value: string;
  label: string;
};

type TAddDictionary = { dictionaryName: string; dictionaryId?: number; teamId: number };
type TRenameCustomDictionary = { dictionaryId: number; dictionaryName: string };

const nativeDictionaries: TNativeDictionary[] = [
  {
    id: 1,
    name: "Mahavyutpatti",
  },
  {
    id: 2,
    name: "Erik pema kunsang",
  },
  {
    id: 3,
    name: "Ives waldo",
  },
  {
    id: 4,
    name: "Jeffrey hopkins",
  },
  {
    id: 5,
    name: "Lobsang monlam",
  },
  {
    id: 6,
    name: "Verb lexicon",
  },
  {
    id: 7,
    name: "Tibetan multi",
  },
  {
    id: 8,
    name: "Tibetan medicine",
  },
  {
    id: 9,
    name: "Lotus king",
  },
  {
    id: 10,
    name: "Jim Welby",
  },
  {
    id: 11,
    name: "84000",
  },
  {
    id: 12,
    name: "Laine Abbreviations",
  },
  {
    id: 13,
    name: "Tsig Dzo Chenmo",
  },
  {
    id: 14,
    name: "Negi Sanskrit",
  },
  {
    id: 15,
    name: "Tsepak Rigdzin",
  },
  {
    id: 16,
    name: "Yogacharabhumi Sanskrit",
  },
  {
    id: 17,
    name: "Sera",
  },
  {
    id: 18,
    name: "Chandra Sanskrit",
  },
  {
    id: 19,
    name: "Dag Yig",
  },
  {
    id: 20,
    name: "Monlam",
  },
];

const customDictionaries: TCustomDictionary[] = [
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
    id: 4,
    name: "Delta lexicon",
  },
  {
    id: 5,
    name: "Epsilon lexicon",
  },
  {
    id: 51,
    name: "Zeta lexicon",
  },
  {
    id: 52,
    name: "Old Zeta lexicon",
  },
];

export const dictionaryTypes: TDictionaryTypes = {
  native: {
    value: "native",
    label: "Native",
  },
  custom: {
    value: "custom",
    label: "Custom",
  },
};

export const useDictionariesStore = defineStore("dictionariesStore", {
  state: () => ({
    nativeDictionaries: nativeDictionaries,
    customDictionaries: customDictionaries,
  }),
  getters: {
    getNativeDictionaryById: (state) => {
      return (dictionaryId: number) =>
        state.nativeDictionaries.find((dictionary) => dictionary.id === dictionaryId);
    },
    getCustomDictionaryById: (state) => {
      return (dictionaryId: number) =>
        state.customDictionaries.find((dictionary) => dictionary.id === dictionaryId);
    },
    getNativeDictionariesByIds: (state) => {
      return (dictionaryIds: number[]) =>
        state.nativeDictionaries.filter((dictionary) => dictionaryIds.includes(dictionary.id));
    },
    getCustomDictionariesByIds: (state) => {
      return (dictionaryIds: number[]) =>
        state.customDictionaries.filter((dictionary) => dictionaryIds.includes(dictionary.id));
    },
    getAllNativeDictionaryIds: (state) => {
      return () => state.nativeDictionaries.map((dictionary) => dictionary.id);
    },
    getNewCustomDictionaryId: (state) => {
      return () => {
        const highestId = Math.max(...state.customDictionaries.map((dictionary) => dictionary.id));
        return highestId + 1;
      };
    },
    getCustomDictionaryIndexById: (state) => {
      return (dictionaryId: number) =>
        state.customDictionaries.findIndex((dictionary) => dictionary["id"] === dictionaryId);
    },
  },
  actions: {
    addNewCustomDictionary({ dictionaryName, dictionaryId, teamId }: TAddDictionary) {
      const teamsStore = useTeamsStore();
      const newDictionaryId = this.getNewCustomDictionaryId();
      teamsStore.addCustomDictionaryToTeam({ dictionaryId: newDictionaryId, teamId: teamId });

      this.$patch((state) => {
        state.customDictionaries.push({
          id: dictionaryId || newDictionaryId,
          name: dictionaryName,
        });
      });
    },
    renameCustomDictionary({ dictionaryId, dictionaryName }: TRenameCustomDictionary) {
      const dictionaryIndex = this.getCustomDictionaryIndexById(dictionaryId);
      this.$patch((state) => (state.customDictionaries[dictionaryIndex].name = dictionaryName));
    },
  },
  persist: true,
});

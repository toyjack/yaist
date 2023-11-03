import { atom } from "jotai";

export const termAtom = atom("");

export const settingsAtom = atom({
  searchBtnLoading: false,
  decomposeBtnLoading: false,
});
export const state = () => ({
  template: "",
  pasteType: "character",
});

export const mutations = {
  updateTemplate(state, data) {
    state.template = data;
  },
  updatePasteType(state, value) {
    state.pasteType = value;
  },
};

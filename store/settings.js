export const state = () => ({
  template: `<glyph xml:id="[[unicode]]">
    <mapping type="IDS">[[IDS]]</mapping>
    <mapping type="Unicode">[[character]]</mapping>
    <mapping type="alt">[[standard]]</mapping>
    <figure>
        <graphic url="[[GlyphWikiSVG]]"/>
    </figure>
</glyph>
`,
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

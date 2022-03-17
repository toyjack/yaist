import { defineStore } from 'pinia'

type SortTypes = 'unicode' | 'stroke'
type CopyTypes = 'character' | 'code' | 'template'
type SearchRangeTypes = 'unicode' | 'glyphwiki'

const template =`
<glyph xml:id="[[unicode]]">
    <mapping type="IDS">[[IDS]]</mapping>
    <mapping type="Unicode">[[character]]</mapping>
    <mapping type="alt">[[standard]]</mapping>
    <figure>
        <graphic url="[[GlyphWikiPNG]]"/>
    </figure>
</glyph>
`
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('settings', {
  // other options...
  state: () => ({
    rightDrawerOpen: false,
    searchRange:<SearchRangeTypes>"unicode",
    sortType: <SortTypes>"unicode",
    copyType: <CopyTypes>"character",
    template: <string> template
  }),

  actions: {
    toggleRightDrawer(): void {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
    changeSortType(newSortType: SortTypes) {
      this.sortType = newSortType
    },
    changeCopyType(newCopyType: CopyTypes) {
      this.copyType = newCopyType
    }
  }


})
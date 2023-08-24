import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  bookmarksId: number[] = [];

  constructor() {
    const localStorageData = localStorage.getItem('bookmarks');
    if (localStorageData) this.bookmarksId = JSON.parse(localStorageData);
  }

  getBookmarkValue(id: number) {
    return this.bookmarksId.includes(id);
  }

  bookmarkToggle(id: number) {
    const existence = this.bookmarksId.includes(id);
    if (existence) {
      const index = this.bookmarksId.indexOf(id);
      if (index > -1) {
        this.bookmarksId.splice(index, 1);
      }
    }
    if (!existence) {
      this.bookmarksId.push(id);
    }
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarksId));
  }
}

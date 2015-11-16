'use strict';
/**
 * model
 */
export default class extends think.model.base {
    getFoodList(currentPage) {
        return this.getFoodListByPage(currentPage, 10);
    }
    getFoodListByPage(currentPage, everyPage) {
        return this.page(currentPage, everyPage).select();
    }
}

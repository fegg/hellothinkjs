'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //auto render template file index_index.html
    
    let foodModel = this.model('food');
    let foodList = await foodModel.getFoodList(1);

    this.assign({
		  foodList: foodList
    });

    return this.display('good');
  }
  async moreAction() {
    let param = this.post();
    let currentPage = param.page || 1;

    let foodModel = this.model('food');
    let foodList = await foodModel.getFoodList(currentPage);

    console.log(foodList);

    return this.success(foodList);
  }
}
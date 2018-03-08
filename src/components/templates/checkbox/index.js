/**
 * html
 *  <template wx:for="{{list}}" is="checkbox" data="{{...checkboxs[index]}}" />   [ checkbox = {checked:true} ]
 *  onLoad() {
 *      inject({
 *        // 默认是数组,这个数组的index可以用来使用函数 getCheckedByIndex
 *        dataName:'checkboxs',
 *        length:10,
 *        target:this,
 *      })
 *    }
 *
 ** @param target 为了能正常响应事件，target 务必是 page 或者 component，用来储存template中默认的事件响应函数
 */
export default function inject(options = {}) {
  const {target, dataName = "checkboxs", length = 1} = options;

  let anies = Array(length).fill('*').map((item, index) => {
    return {
      checked: false,
      index
    }
  });
  target.setData({
    [dataName]: anies
  });
  Object.assign(target.getWxPage(), {
    onCheck(e) {
      const {index = 0, checked} = e.target.dataset;
      const checkedList = target.data[dataName] || anies;
      let options = checkedList[index];
      options.checked = checked;
      checkedList[index] = options;
      target.setData({
        [dataName]: checkedList
      })
    }
  });
  Object.assign(target, {
    getChecked(){
      return this.getCheckedByIndex();
    },
    getCheckedByIndex(indexs) {
      let datum = target.data[dataName] || anies;
      if (Array.isArray(indexs)) {
        return indexs.map(index => !!datum[index]&&datum[index].checked)
      }
      return !!datum[0].checked;
    }
  })
}

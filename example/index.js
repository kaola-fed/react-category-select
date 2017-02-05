const React = require('react');
const ReactDOM = require('react-dom');
const CategorySelect = require('../index');

require('../assets/index.css');

const categories = [
  { cateId: 100, cateName: '测试100' },
  { cateId: 101, cateName: '测试101' },
  {
    cateId: 102,
    cateName: '测试102',
    cateList: [
      { cateId: 200, cateName: '测试200' },
      { cateId: 201, cateName: '测试201' },
    ]
  },
  { cateId: 103, cateName: '测试103' },
  { cateId: 104, cateName: '测试104' },
  { cateId: 105, cateName: '测试105' },
];

const onChange = function(id) {
  console.log('Select: ' + id);
}

ReactDOM.render(
  <div>
    <span>类目选择：</span>
    <CategorySelect categories={categories} selected={100} onChange={onChange} />
  </div>
  , document.getElementById('app'));
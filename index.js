var React = require('react');

var CategorySelect = React.createClass({
  getInitialState: function() {
    return {
      show: false,
      selected: this.props.selected,
      childCateList: null,
    }
  },

  onChange: function(category) {
    var idKey = this.props.idKey || 'cateId';
    var onChange = this.props.onChange;
    onChange && onChange(category[idKey]);
    this._toggleShow(true);
  },

  _toggleShow: function(forceHide) {
    var show = !this.state.show;
    if (forceHide) show = false;
    this.setState({ show: show, childCateList: null });
  },

  _collapse: function(category, e) {
    e.stopPropagation();
    var childName = this.props.childName || 'cateList';
    this.setState({ childCateList: category[childName] });
  },

  _getSelectedName: function() {
    var selected = this.state.selected;
    var selectedName = this.props.defaultName || '全部类目';
    if (!selected) return selectedName;
    var idKey = this.props.idKey || 'cateId';
    var nameKey = this.props.cateName || 'cateName';
    var childName = this.props.childName || 'cateList';
    var categories = this.props.categories || [];
    categories.forEach(function(category) {
      if (category[idKey] / 1 === selected / 1) {
        selectedName = category[nameKey];
        return;
      }
      if (category[childName]) {
        category[childName].forEach(function(category2) {
          if (category2[idKey] / 1 === selected / 1) {
            selectedName = category2[nameKey];
            return;
          }
        });
      }
    });
    return selectedName;
  },

  render: function() {
    var categories = this.props.categories;
    var childCateList = this.state.childCateList;
    var idKey = this.props.idKey || 'cateId';
    var nameKey = this.props.cateName || 'cateName';
    var childName = this.props.childName || 'cateList';
    var show = this.state.show;
    return (
      <div className="u-category-dropdown">
        <div className="dropdown_hd" onClick={this._toggleShow.bind(this, false)}>
          <a className="u-category-btn">{this._getSelectedName()}<span className="u-category-arrow"></span></a>
        </div>
        {show ?
        <div
          className="dropdown_bd dropdown_bd-1"
          >
          <ul className="m-category-listview">
          {
            categories.map(function(category) {
              return (
                <li onClick={this.onChange.bind(this, category)}>
                  <span>{category[nameKey]}</span>
                  {category[childName] ?
                  <span
                    className="u-category-collapse"
                    onClick={this._collapse.bind(this, category)}
                  >展开</span> : ''
                  }
                </li>
              )
            }.bind(this))
          }
          </ul>
        </div> : ''
        }
        {show && childCateList ?
        <div
          className="dropdown_bd dropdown_bd-2"
          >
          <ul className="m-category-listview">
          {
            (childCateList || []).map(function(category) {
              return (
                <li onClick={this.onChange.bind(this, category)}>
                  <span>{category[nameKey]}</span>
                </li>
              )
            }.bind(this))
          }
          </ul>
        </div> : ''
        }
      </div>
    )
  }
});

module.exports = CategorySelect;
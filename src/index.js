const React = require('react');

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    const defaultCate = { [props.idKey]: '', [props.nameKey]: props.defaultName };
    this.state = {
      show: false,
      childCateList: null,
      categories: [ defaultCate ,...props.categories],
    }
  }

  onChange(category) {
    const { idKey, onChange } = this.props;
    onChange && onChange(category[idKey]);
    this.toggleShow(true);
  }

  toggleShow(forceHide = false) {
    let { show } = this.state;
    show = forceHide ? false : !show;
    this.setState({ show, childCateList: null }); 
  }

  collapse(category, e) {
    e.stopPropagation();
    const { childName } = this.props;
    this.setState({ childCateList: category[childName] });
  }

  getSelectedName() {
    const {
      selected,
      defaultName,
      idKey,
      nameKey,
      childName,
    } = this.props;

    let selectedName = defaultName;
    if (!selected) return selectedName;
    this.state.categories.forEach(category => {
      if (category[idKey] / 1 === selected / 1) {
        selectedName = category[nameKey];
        return;
      }
      if (category[childName]) {
        category[childName].forEach(category2 => {
          if (category2[idKey] / 1 === selected / 1) {
            selectedName = category2[nameKey];
            return;
          }
        });
      }
    });
    return selectedName;
  }

  render() {
    const { categories, childCateList, show } = this.state;
    const { idKey, nameKey, childName } = this.props;
    return (
      <div className="u-category-dropdown">
        <div className="dropdown_hd" onClick={this.toggleShow.bind(this, false)}>
          <a className="u-category-btn">{this.getSelectedName()}<span className="u-category-arrow"></span></a>
        </div>
        {show ?
        <div
          className="dropdown_bd dropdown_bd-1"
          >
          <ul className="m-category-listview">
          {
            categories.map(category => {
              return (
                <li onClick={this.onChange.bind(this, category)}>
                  <span>{category[nameKey]}</span>
                  {category[childName] ?
                  <span
                    className="u-category-collapse"
                    onClick={this.collapse.bind(this, category)}
                  >展开</span> : ''
                  }
                </li>
              )
            })
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
            (childCateList || []).map(category => {
              return (
                <li onClick={this.onChange.bind(this, category)}>
                  <span>{category[nameKey]}</span>
                </li>
              )
            })
          }
          </ul>
        </div> : ''
        }
      </div>
    )
  }
}

CategorySelect.defaultProps = {
  idKey: 'cateId',
  nameKey: 'cateName',
  childName: 'cateList',
  defaultName: '全部类目',
  categories: [],
}

module.exports = CategorySelect;
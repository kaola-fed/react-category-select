const React = require('react');

class CategorySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      childCateList: null,
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
  }

  onMouseDown(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.toggleShow(true);
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
      categories,
    } = this.props;

    let selectedName = defaultName;
    if (!selected) return selectedName;
    categories.forEach(category => {
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

  // Get a random integer between `min` and `max`.
  // Reference: https://gist.github.com/kerimdzhanov/7529623
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    const { childCateList, show } = this.state;
    const { categories, idKey, nameKey, childName, defaultName } = this.props;

    const defaultCate = { [idKey]: '', [nameKey]: defaultName };
    const _categories = [ defaultCate ,...categories];

    const smallInt = 1;
    const largeInt = 1000;

    return (
      <div className="u-category-dropdown" ref={(node) => (this.wrapperRef = node)}>
        <div className="dropdown_hd" onClick={this.toggleShow.bind(this, false)}>
          <a className="u-category-btn">{this.getSelectedName()}<span className="u-category-arrow"></span></a>
        </div>
        {show ?
        <div
          className="dropdown_bd dropdown_bd-1"
          >
          <ul className="m-category-listview">
          {
            _categories.map(category => {
              return (
                <li key={this.getRandomInt(smallInt, largeInt)} onClick={this.onChange.bind(this, category)}>
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
                <li key={this.getRandomInt(smallInt, largeInt)} onClick={this.onChange.bind(this, category)}>
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

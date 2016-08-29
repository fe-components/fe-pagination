import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
// import Select from 'fe-select'

import styles from './index.styl'
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class extends Component {

  static propTypes = {
    currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    totalCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showPageSize: PropTypes.bool,
    pageSizeList: PropTypes.array,
    onChange: PropTypes.func,
    theme: PropTypes.shape({
      highlightColor: PropTypes.string,
      primaryColor: PropTypes.string,
      secondaryColor: PropTypes.string
    })
  }

  static defaultProps = {
    currentPage: 1,
    totalPage: 1,
    pageSizeList: [{value: 10, label: '10'}, {value: 20, label: '20'}, {value: 50, label: '50'}],
    theme: {
      highlightColor: '#fff',
      primaryColor: '#2c97e8',
      secondaryColor: '#2c97e8'
    }
  }

  state = {
    currentPage: this.props.currentPage
  }

  componentDidUpdate = (prep, pres) => {
    if (prep.currentPage !== this.props.currentPage) {
      this.setState({currentPage: this.props.currentPage})
    }
  }

  renderPageNum = (currentPage, totalPage) => {
    const theme = this.props.theme
    const activeStyle = {
      color: theme.highlightColor,
      background: theme.primaryColor,
      borderColor: theme.primaryColor
    }
    let pageSize = []
    for (let i = 0; i < totalPage; i++) {
      pageSize.push(i + 1)
    }

    if (totalPage === 0) {
      return <button disabled>1</button>
    } else if (totalPage > 0 && totalPage < 5) {
      return pageSize.map((v, i) => <button key={i} onClick={this.changePage.bind(null, v)} style={v === currentPage ? activeStyle : null}>{v}</button>)
    } else if (totalPage >= 5) {
      return pageSize.map((v, i) => {
        if (v === 1) {
          return <span key={i}><button onClick={this.changePage.bind(null, v)} style={v === currentPage ? activeStyle : null}>{v}</button>{currentPage <= 3 ? null : <span>...</span>}</span>
        } else if (v === totalPage) {
          return <span key={i}>{totalPage - currentPage <= 2 ? null : <span>...</span>}<button onClick={this.changePage.bind(null, v)} style={v === currentPage ? activeStyle : null}>{v}</button></span>
        } else if (Math.abs(v - currentPage) < 2 || ((currentPage === 1 || currentPage === totalPage) && Math.abs(v - currentPage) < 3)) {
          return <button key={i} onClick={this.changePage.bind(null, v)} style={v === currentPage ? activeStyle : null}>{v}</button>
        }
      })
    }
  }

  changePage = (v, e) => {
    if (v === 'pageSize') {
      this.props.onChange({pageSize: e.target.value})
    } else if (this.props.currentPage !== v) {
      this.props.onChange({currentPage: v})
    }
  }

  onInputChange = (e) => {
    this.setState({currentPage: e.target.value})
  }

  onInputPage = (e) => {
    let v = Math.min((Math.max(1, this.state.currentPage) || 1), this.props.totalPage)
    this.props.onChange({currentPage: v})
  }

  render () {
    const {
      showPageSizeInfo,
      showPageSize,
      pageSizeList,
      totalCount
    } = this.props

    const pageSize = parseInt(this.props.pageSize)
    const currentPage = parseInt(this.props.currentPage)
    const totalPage = parseInt(this.props.totalPage)

    return (
      <div styleName='wrap'>
        {
          showPageSize
          ? <div styleName='pageSizeContainer'>
            每页&nbsp;
            <select value={pageSize} options={pageSizeList} onChange={this.changePage.bind(null, 'pageSize')} inputWidth='50px' />
            &nbsp;条
          </div>
          : null
        }
        {
          showPageSizeInfo
          ? <div styleName='pageSizeContainer'>
            每页&nbsp;{pageSize}&nbsp;条，共&nbsp;{totalCount}&nbsp;条
          </div>
          : null
        }
        <button onClick={this.changePage.bind(null, currentPage - 1)} disabled={currentPage <= 1}>上一页</button>
        {this.renderPageNum(currentPage, totalPage)}
        <button onClick={this.changePage.bind(null, currentPage + 1)} disabled={currentPage >= totalPage}>下一页</button>
        <div styleName='inputContainer'>
          第&nbsp;
          <input type='text' onChange={this.onInputChange} value={this.state.currentPage} />
          &nbsp;页
          <button onClick={this.onInputPage} style={{color: this.props.theme.highlightColor, background: this.props.theme.primaryColor, borderColor: this.props.theme.primaryColor}}>确定</button>
        </div>
      </div>
    )
  }
}

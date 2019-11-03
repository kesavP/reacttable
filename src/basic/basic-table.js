/* eslint max-len: 0 */
import React from 'react';
import BootstrapTable from '../bootstraptable/BootstrapTable';
import TableHeaderColumn from '../bootstraptable/TableHeaderColumn';
import '../css/style.css';

export default class BasicTable extends React.Component {

constructor(props){
  super(props);
  this.state = {
    devName : 'kesav',
    order : 'desc',
    sortName: [],
    sortOrder: []
  }

  fetch('../propertieslimited.json')
  .then((res) => res.json())
  .then((data) => {
    this.setState({
      properties: data
    })
  })

  this.onSortChange = this.onSortChange.bind(this);
  this.cleanSort = this.cleanSort.bind(this);
}

stylingID = (cell, row, ridx, cidx) => {
    console.log('current row  ', row);
    console.log('current cell  ', cell);
    console.log('current ridx  ', ridx);
    console.log('current cidx  ', cidx);
    return { color: 'green' };
  }

  customTitle(cell, row, rowIndex, colIndex) {
    return `${row.key} for ${cell}`;
  }

  revertSortFunc(a, b, order) {   // order is desc or asc
    console.log(order)
  if (order === 'desc') {
    return a.price - b.price;
  } else {
    return b.price - a.price;
  }
}

customSortStyle = (order, dataField) => {
  console.log('734y55t9',dataField);
    if (order === 'desc') {
      return 'sort-desc';
    }
    return 'sort-asc';
  }

  handleBtnClick = () => {
    console.log('fgfdg',this.state.order)
    if (this.state.order === 'desc') {
      this.refs.propTab.handleSort('asc', 'key');
      this.setState({order: 'asc'})
    } else {
      this.refs.propTab.handleSort('desc', 'key');
      this.setState({order: 'desc'})
    }
  }

  onSortChange (key, order) {
    console.info('onSortChange', arguments);
    const sortName = [];
    const sortOrder = [];
    for (let i = 0; i < this.state.sortName.length; i++) {
      if (this.state.sortName[i] !== key) {
        sortName.push(this.state.sortName[i]);
        sortOrder.push(this.state.sortOrder[i]);
      }
    }

    sortName.push(key);
    sortOrder.push(order);
    this.setState({
      sortName,
      sortOrder
    });
  }

  cleanSort() {
    this.setState({
      sortName: [],
      sortOrder: []
    });
  }

  render() {
    // console.log('data:', this.state.properties);
    const options = {
      noDataText: 'This is custom text for empty data',
      sortName: this.state.sortName,
      sortOrder: this.state.sortOrder,
      onSortChange: this.onSortChange,
      // defaultSortName: 'key',
      // defaultSortOrder: 'asc',
      // withoutNoDataText: true, // this will make the noDataText hidden, means only showing the table header
    };

    const tdAttr = {
      'data-attr1': 'value1',
      'data-attr2': 'value2'
    };
    return (
      <React.Fragment>
      <button onClick={ this.handleBtnClick }>Sort Property Key</button>
      <button className='btn ben-default' onClick={ this.cleanSort }>Clean</button>
       <p style={ { color: 'red' } }>sort: sortName={ this.state.sortName }, sortOrder={ this.state.sortOrder }</p>
      <BootstrapTable
      ref='propTab'
      multiColumnSort={ 2 } // this to be verified
      data={ this.state.properties }
      options={ options }
      striped={ true }
      hover={ true }
      condensed={ true }
      // bordered={ false }
      height='250'
      scrollTop={ 'Bottom' }
      >
          <TableHeaderColumn dataField='id'
          dataAlign='center'
          tdStyle={ this.stylingID }
          thStyle={ { 'fontWeight': 'lighter' } }
          columnTitle={ this.customTitle }
          headerTitle={ false }
          tdAttr={ tdAttr }
          // columnTitle={ true } // shows the column value as title on element hover
          // hidden={ true }
          // columnTitle='Hard code string'
          // headerText='Custom Title'
          isKey={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn
          dataSort={ true }
          sortHeaderColumnClassName={ this.customSortStyle }
          dataField='key'>Property Name</TableHeaderColumn>
          <TableHeaderColumn
          dataSort={ true }
          sortFunc={ this.revertSortFunc }
          sortHeaderColumnClassName='sorting'
          dataField='value'>Property Value</TableHeaderColumn>
      </BootstrapTable>
      </React.Fragment>
    );
  }
}

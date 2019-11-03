/* eslint max-len: 0 */
import React from 'react';
import BootstrapTable from '../bootstraptable/BootstrapTable';
import TableHeaderColumn from '../bootstraptable/TableHeaderColumn';

let order = 'desc';
export default class BasicTable extends React.Component {

constructor(props){
  super(props);
  this.state = {
    devName : 'kesav',
    order : 'desc',
    sortName: undefined,
    sortOrder: undefined
  }

  fetch('../propertieslimited.json')
  .then((res) => res.json())
  .then((data) => {
    this.setState({
      properties: data
    })
  })

  this.onSortChange = this.onSortChange.bind(this);
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

  onSortChange (sortName, sortOrder) {
    console.info('onSortChange', arguments);
    this.setState({
      sortName,
      sortOrder
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
          dataField='key'>Property Name</TableHeaderColumn>
          <TableHeaderColumn dataField='value'>Property Key</TableHeaderColumn>
      </BootstrapTable>
      </React.Fragment>
    );
  }
}

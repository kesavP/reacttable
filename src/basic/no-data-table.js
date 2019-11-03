/* eslint max-len: 0 */
import React from 'react';
import BootstrapTable from '../bootstraptable/BootstrapTable';
import TableHeaderColumn from '../bootstraptable/TableHeaderColumn';


const products = [];

export default class NoDataTable extends React.Component {
  render() {
    const options = {
      noDataText: 'This is custom text for empty data'
      // withoutNoDataText: true, // this will make the noDataText hidden, means only showing the table header
    };
    return (
      <BootstrapTable data={ products } options={ options }>
          <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

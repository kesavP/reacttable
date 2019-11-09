/* eslint max-len: 0 */
/*global event*/
/*eslint no-restricted-globals: ["error", "event"]*/
import React from 'react';
import BootstrapTable from '../bootstraptable/BootstrapTable';
import TableHeaderColumn from '../bootstraptable/TableHeaderColumn';
import ReactDOM from 'react-dom';
require ('../css/style.css');
require('../css/customMultiSelect.css');

class Checkbox extends React.Component {
  componentDidMount() { this.update(this.props.checked); }
  componentWillReceiveProps(props) { this.update(props.checked); }
  update(checked) {
    ReactDOM.findDOMNode(this).indeterminate = checked === 'indeterminate';
  }
  render() {
    return (
      <input className='react-bs-select-all'
        type='checkbox'
        name={ 'checkbox' + this.props.rowIndex }
        id={ 'checkbox' + this.props.rowIndex }
        checked={ this.props.checked }
        onChange={ this.props.onChange } />
    );
  }
}

export default class BasicTable extends React.Component {

constructor(props){
  super(props);
  this.state = {
    devName : 'kesav',
    order : 'desc',
    sortName: [],
    sortOrder: [],
    selected: []
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
  this.selectedRowClass = this.selectedRowClass .bind(this);
}

onRowSelect(row, isSelected, e, rowIndex) {
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': "' + row[prop] + '"';
  }
  console.log(e);
  alert(`Selected: ${isSelected}, rowIndex: ${rowIndex}, row: ${rowStr}`);
}

onSelectAll(isSelected, rows) {
  alert(`is select all: ${isSelected}`);
  if (isSelected) {
    alert('Current display and selected data: ');
  } else {
    alert('unselect rows: ');
  }
  for (let i = 0; i < rows.length; i++) {
    alert(rows[i].id);
  }
}

selectedRowClass(row, isSelect) {
  console.log('roe id ',row.id);
    if (isSelect) {
      if (row.id >= 3) {
        return 'bigger-than-three-select-row';
      } else {
        return 'less-than-three-select-row';
      }
    } else {
      return '';
    }
  }

qualityType = {
  'good': 'good',
  'Bad': 'Bad',
  'unknown': 'unknown',
  'auto-alert': 'auto-alert'
};

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

onAfterDeleteRow(rowKeys, rows) {
  alert('The rowkey you drop: ' + rowKeys);
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

  sizePerPageListChange(sizePerPage) {
    alert(`sizePerPage: ${sizePerPage}`);
  }

  onPageChange(page, sizePerPage) {
    alert(`page: ${page}, sizePerPage: ${sizePerPage}`);
  }

  cleanSort() {
    this.setState({
      sortName: [],
      sortOrder: []
    });
  }

onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
}

//this way only filter data, but dont show in filter
handleTextFilterBtnClick = () => {
    this.refs.propTab.handleFilterData({ key: 'auto' });
  }

  handleTextFiilterBtnClick = () => {
    this.refs.keyCol.applyFilter('auto');
  }

  multiSelectCustomised = (props) => {
    const { type, checked, disabled, onChange, rowIndex } = props;
    console.log('selectedRow '+rowIndex);
    return (
        <div className='checkbox-personalized'>
          <Checkbox {...props}/>
          <label htmlFor={ 'checkbox' + rowIndex }>
            <div className='check'></div>
          </label>
        </div>
      );
  }

  selectRowProp = {
    // radio return single-select.
  mode: 'checkbox',
  customComponent: this.multiSelectCustomised,
//  unselectable: [ 3 ] ,// give rowkeys for unselectable row, comment-out custom component prop, to take this effect
  selected: [ 2 ],  // give a array which contain the row key you want to select // give a array which contain the row key you want to select.
  //bgColor: 'grey' // this style applied on row click
 //  bgColor: function(row, isSelect) { // this add backgroud to style element
 //   if (isSelect) {
 //     const { id } = row;
 //     if (id < 2) return 'blue';
 //     else if (id < 4) return 'red';
 //     else return 'yellow';
 //   }
 //   return null;
 // }
 className: this.selectedRowClass,  // add custom class on click
 onSelect: this.onRowSelect,
  onSelectAll: this.onSelectAll,
  showOnlySelected: true // button a top to show only selected checkbox rows
};

afterSearch(searchText, result) {
  console.log('Your search text is ' + searchText);
  console.log('Result is: ' + result);
  for (let i = 0; i < result.length; i++) {
    console.log('Fruit: ' + result[i].id + ', ' + result[i].key + ', ' + result[i].value  );
  }
}

filterType(cell, row) {
  // just return type for filtering or searching.
  return cell.type;
}

// nameFormatter(cell) {
//   return `<p><span class='glyphicons ${cell.icon}' aria-hidden='true'></span> ${cell.pname}, from ${cell.year}</p>`;
// }

priceFormatter(cell) {
  return `NTD ${cell}`;
}

customConfirm(next, dropRowKeys) {
  const dropRowKeysStr = dropRowKeys.join(',');
  if (confirm(`(It's a custom confirm)Are you sure you want to delete ${dropRowKeysStr}?`)) {
    // If the confirmation is true, call the function that
    // continues the deletion of the record.
    next();
  }
}

onBeforeSaveCell(row, cellName, cellValue) {
  console.log("editing "+row.id+" with value "+cellValue);
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}

onBeforeSaveCellAsync(row, cellName, cellValue, done) {
  // if your validation is async, for example: you want to pop a confirm dialog for user to confim
  // in this case, react-bootstrap-table pass a callback function to you
  // you are supposed to call this callback function with a bool value to perfom if it is valid or not
  // in addition, you should return 1 to tell react-bootstrap-table this is a async operation.

  // I use setTimeout to perform an async operation.
  // setTimeout(() => {
  //   done(true);  // it's ok to save :)
  //   done(false);   // it's not ok to save :(
  // }, 3000);
  // return 1;  // please return 1
}

cellEditProp = {
  mode: 'click',
  // nonEditableRows: function() {
  //       // if product id less than 3, will cause the whole row noneditable
  //       // this function should return an array of row keys
  //       return properties.filter(p => p.id < 3).map(p => p.id);
  //     }
  beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
};

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
  //     onRowClick: function(row, columnIndex, rowIndex, e) {
  //   alert(`You click row id: ${row.id}, column index: ${columnIndex}, row index: ${rowIndex}`);
  //   console.log(e);
  // },
  // onRowDoubleClick: function(row, e) {
  //   alert(`You double click row id: ${row.id}`);
  //   console.log(e);
  // },
  // prePage: <i className='glyphicon glyphicon-chevron-left' />,
  // nextPage: <i className='glyphicon glyphicon-chevron-right' />,
  // firstPage: <i className='glyphicon glyphicon-step-backward' />,
  // lastPage: <i className='glyphicon glyphicon-step-forward' />
  // pageStartIndex: 0, // where to start counting the pages
// paginationSize: 3,  // the pagination bar size.
prePage: 'Prev', // Previous page button text
nextPage: 'Next', // Next page button text
firstPage: 'First', // First page button text
lastPage: 'Last', // Last page button text
prePageTitle: 'Go to previous', // Previous page button title
nextPageTitle: 'Go to next', // Next page button title
firstPageTitle: 'Go to first', // First page button title
lastPageTitle: 'Go to Last', // Last page button title
onPageChange: this.onPageChange,
onSizePerPageList: this.sizePerPageListChange,
afterInsertRow: this.onAfterInsertRow,
afterDeleteRow: this.onAfterDeleteRow,
afterSearch: this.afterSearch,  // define a after search hook
searchDelayTime: 3000,
//defaultSearch: 'banana', // search the default
exportCSVSeparator: '##',
exportCSVText: 'my_export',
  insertText: 'my_insert',
  deleteText: 'my_delete',
  saveText: 'my_save',
  closeText: 'my_close',
  handleConfirmDeleteRow: this.customConfirm
};

    const tdAttr = {
      'data-attr1': 'value1',
      'data-attr2': 'value2'
    };
    return (
      <React.Fragment>
      <button onClick={ this.handleBtnClick }>Sort Property Key</button>
      <button className='btn ben-default' onClick={ this.cleanSort }>Clean</button>
      <button onClick={ this.handleTextFiilterBtnClick } className='btn btn-default'>Click to apply text filter</button>
       <p style={ { color: 'red' } }>sort: sortName={ this.state.sortName }, sortOrder={ this.state.sortOrder }</p>
      <BootstrapTable
      ref='propTab'
      multiColumnSort={ 2 } // this to be verified
      data={ this.state.properties }
      options={ options }
      striped={ true }
      hover={ true }
      condensed={ true }
      selectRow={ this.selectRowProp }
      search={ true }
      // bordered={ false }
      height='250'
      scrollTop={ 'Bottom' }
      insertRow={ true }
      deleteRow={ true }
      multiColumnSearch={ true }
      cellEdit={ this.cellEditProp }
      searchPlaceholder='Search delay 500ms'
      //strictSearch={ true }, // if this true multi search wont function
      exportCSV={ true }
      pagination
      >
          <TableHeaderColumn dataField='id'
          dataAlign='center'
          // tdStyle={ this.stylingID }
          thStyle={ { 'fontWeight': 'lighter' } }
          columnTitle={ this.customTitle }
          headerTitle={ false }
          tdAttr={ tdAttr }
          dataFormat={ this.priceFormatter }
          searchable={ false } // donot search this column
          // columnTitle={ true } // shows the column value as title on element hover
          // hidden={ true }
          // columnTitle='Hard code string'
          // headerText='Custom Title'
          isKey={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn
          dataSort={ true }
          sortHeaderColumnClassName={ this.customSortStyle }
          // possible filter options defaultValue: '0',condition: 'eq',
          // filter={ { type: 'TextFilter', delay: 1000 } }
          filter={ { type: 'SelectFilter', options: this.qualityType, condition: 'eq',selectText: 'Choose',defaultValue: 'auto-alert' } }
          ref='keyCol'
          dataField='key'>Property Name</TableHeaderColumn>
          <TableHeaderColumn
          // dataFormat={ this.nameFormatter }
          editable={ false }
          dataSort={ true }
          sortFunc={ this.revertSortFunc }
          sortHeaderColumnClassName='sorting'
          // Eg: [.]{1} to find string having '.' , [0] to find string contain 0
          filter={ { type: 'RegexFilter', delay: 1000 } }
          dataField='value'>Property Value</TableHeaderColumn>
      </BootstrapTable>
      </React.Fragment>
    );
  }
}

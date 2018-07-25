import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { render } from 'react-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ItemList extends React.Component {
  render() {
    return (
      <table className="table">
        <GenTableHead />
        <GenBlock item={this.props.items} onDeleteItem={this.props.onDeleteItem} />
      </table>
    );
  }
}

// class Item extends React.Component {
//   constructor(props) {
//     super(props);
//     this.deleteItem = this.deleteItem.bind(this);
//   }
//   deleteItem(event) {
//     this.props.onDeleteItem(this.props.id);
//   }
//   render() {
//     return <li className="item" key={this.props.id}>
//       <span>{this.props.name}</span>
//       <span>{this.props.amount}</span>
//       <span>{this.props.category}</span>
//       <span>{this.props.date}</span>
//       <button className="btn" onClick={this.deleteItem}>-</button></li>
//   }
// }
function GenTableHead() {
  return (
    <tr>
      <th>Наименование</th>
      <th>Стоимость(руб)</th>
      <th>Категория</th>
      <th>Дата</th>
      <th>-</th>
    </tr>

  );
}
class GenTable extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem(event) {
    this.props.onDeleteItem(this.props.item.id);
  }
  render() {
    const d = this.props.item.date;
    // const { classes } = this.props;
    return (
      <tr key={this.props.id}>
        <td>{this.props.item.details}</td>
        <td>{this.props.item.amount}</td>
        <td>{this.props.item.categories === null ? "" : this.props.item.categories.map(item => item.name).join(", ")}</td>
        <td><span>{d}</span></td>
        {/* <td><button onClick={this.deleteItem}>-</button></td> */}
        <td>
          <div onClick={this.deleteItem}>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </td>
      </tr>

    );
  }
}
function GenBlock(props) {
  var PropsItem = props.item;
  var displayBlock = PropsItem.map(function (header) {
    return (<GenTable item={header} key={header.id} onDeleteItem={props.onDeleteItem} />);
  });
  return (
    <tbody>
      {displayBlock}
    </tbody>
  );
}
let date = new Date();
export default ItemList;
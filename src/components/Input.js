import React from 'react';
import { render } from 'react-dom';
import DialogSelect from './DialogSelect';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.ForeClickDelete = this.ForeClickDelete.bind(this);
    this.handleCategoryAddChange = this.handleCategoryAddChange.bind(this);
  }
  handleCategoryAddChange(json) {
    this.props.handleCategoryAddChange(json)
  }

  handleNameChange(e) {
    this.props.NameChange(e.target.value);
  }
  handleCategoryChange(e) {
    this.props.CategoryChange(e.target.value);
  }
  handleAmountChange(e) {
    this.props.AmountChange(e.target.value);
  }
  ForeClickDelete(e) {
    this.props.handleClickDelete(e);
  }
  render() {
    // const valcat = this.props.category;
    return (
      <form onSubmit={this.submit}>
        <div className='form-row'>
          <div className='col'>
            <label key="1"  >Расход</label>
            <input
              className="form-control"
              type="text"
              placeholder="input name..."
              id="validationDefault01"
              value={this.props.name}
              onChange={this.handleNameChange}
              key="name"
              required
            />
          </div>
          <div className='col'>
            <label key="2">Введите стоимость</label>
            <div className='input-group'>
              <input
                className="form-control"
                // type="number"
                placeholder="input amount..."
                id="validationDefault02"
                value={this.props.amount}
                onChange={this.handleAmountChange}
                key="number"
                required
              />
              <div className='input-group-append'>
                <span className="input-group-text" id="inputGroupAppend2">₽</span>
              </div>
            </div>
          </div>
          <div>
            <label> Категория:</label>
            <div className='col'>
              <div className='input-group'>
                <SelectItems valcat={this.props.categories} CategoryAdd={this.props.CategoryAdd}
                  changeFunc={this.handleCategoryChange} />
                <DialogSelect CategoryAdd={this.props.CategoryAdd} CategoryAddChange={this.handleCategoryAddChange} ForeClickDelete={this.props.handleClickDelete} />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
// const CategoryApp = ["Категория не выбрана", "Прочее", "Еда"];
function SelectOpt(props) {
  return (
    <option value={props.item} key={props.id}>{props.item}</option>
  );
}

class SelectItems extends React.Component {
  render() {
    var listItems = this.props.CategoryAdd.map(function (item) {
      return <SelectOpt item={item.name} id={item.id} key={item.id} />
    });
    return (
      <select value={this.props.valcat} onChange={this.props.changeFunc} className='custom-select'>{listItems}</select>
    );
  }
}


export default Input;
//export default SelectItems;
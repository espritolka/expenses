import React from 'react';
import { render } from 'react-dom';
import DialogSelect from './DialogSelect';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

class Inputs extends React.Component {
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
    const { classes } = this.props;

    return (
      
      <div className={classes.root}>
      <TextField
          label="Наименование"
          id="validationDefault01"
          value={this.props.name}
          onChange={this.handleNameChange}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            'aria-label': 'Description',
          }}
        />
        <TextField
          label="Стоимость"
          id="validationDefault02"
          value={this.props.amount}
          onChange={this.handleAmountChange}
          className={classNames(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start">₽</InputAdornment>,
          }}
        />
        <TextField
          select
          label="Выберите категорию"
          className={classNames(classes.margin, classes.textField)}
          value={this.props.categories}
          onChange={this.handleCategoryChange}
          InputProps={{
            'aria-label': 'Description',
          }}
        >
        <DialogSelect CategoryAdd={this.props.CategoryAdd} CategoryAddChange={this.handleCategoryAddChange} ForeClickDelete={this.props.handleClickDelete} />
          {this.props.CategoryAdd.map(option => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        {/* <DialogSelect CategoryAdd={this.props.CategoryAdd} CategoryAddChange={this.handleCategoryAddChange} ForeClickDelete={this.props.handleClickDelete} /> */}
        
      </div>
      
    );
  }
}
// const CategoryApp = ["Категория не выбрана", "Прочее", "Еда"];
// function SelectOpt(props) {
//   return (
//     <option value={props.item} key={props.id}>{props.item}</option>
//   );
// }

// class SelectItems extends React.Component {
//   render() {
//     var listItems = this.props.CategoryAdd.map(function (item) {
//       return <SelectOpt item={item.name} id={item.id} key={item.id} />
//     });
//     return (
//       <select value={this.props.valcat} onChange={this.props.changeFunc} className='custom-select'>{listItems}</select>
//     );
//   }
// }
Inputs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inputs);
//export default SelectItems;
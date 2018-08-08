import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/ModeEdit';
import Delete from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
//import Icon from '@material-ui/core/Icon';
//import SelectItems from "./Input";
import Save from '@material-ui/icons/Save';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 140,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  textField: {
    flexBasis: 50,
  },
});
// function SelectIt(props) {
//   return (
//     <option value={props.id}>{props.item}</option>
//   );
// }

// class DeleteSelect extends React.Component {
//   constructor(props) {
//     super(props);
//     this.ChangeValue = this.ChangeValue.bind(this);
//   }
//   ChangeValue(e) {
//     this.props.ChangeValueCategory(e.target.value);
//   }
//   render() {
//     var listItems = this.props.CategoryAdd.map(function (item) {
//       return <SelectIt item={item.name} id={item.id} key={item.id} />
//     });
//     return (
//       <select onChange={this.ChangeValue} className='form-control' >{listItems}</select>
//     );
//   }
// }

class DialogSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      valcatid: 0,
      //valdel:"",
    };
    //this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.ChangeValueCategory = this.ChangeValueCategory.bind(this);
    //this.ChangeCategory=this.ChangeCategory.bind(this);
    // this.handleCategoryAddChange = this.handleCategoryAddChange.bind(this);
  }

  ChangeValueCategory(value) {
    console.log(value)
    //let name = [this.props.CategoryAdd === null ? "-" : this.props.CategoryAdd.find(id => id.id === value)['name']]
    this.setState({

      valcatid: value.target.value
      //  valuedel: name === null ? "-" : name
    });
    //console.log(this.state.valdel)
    console.log(this.state.valcatid)
  }
  // handleClickDelete(event) {
  //   event.preventDefault()
  //   //console.log("valcatid= "+ this.state.valcatid);
  //   fetch("http://178.62.212.14:8080/category/" + this.state.valcatid, { method: "DELETE" })
  //     .then(() => {
  //       var updatedItems = this.props.CategoryAdd.filter(item => {
  //         return item.id !== this.state.valcatid;
  //       });
  //     }
  //     )
  // };
  handleClickDelete(e) {
    e.preventDefault()
    this.props.ForeClickDelete(this.state.valcatid);
  }

  handleChange(name) {
    this.setState({
      name: name.target.value
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSaveCategory(e) {
    e.preventDefault()
    let CategoryObj = {
      description: "",
      name: this.state.name
    }
if(CategoryObj.name !==""){
    fetch("http://178.62.212.14:8080/category",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(CategoryObj)
      })
      .then(res => res.json())
      .then(json => this.props.CategoryAddChange(json))
    console.log(this.props.CategoryAdd)
    this.setState(
      {
        name: ''
      });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color="secondary" className={classes.button} aria-label="edit" onClick={this.handleClickOpen}>
          <AddIcon /> Редактировать категории
        </Button>
        {/* <button className="btn btn-outline-primary" type="button" onClick={this.handleClickOpen} > + </button> */}
        {/* <Button onClick={this.handleClickOpen}>+ редактировать список категорий</Button> */}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Добавление новой категории</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <TextField
                  label="Имя категории"
                  id="v01"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className={classNames(classes.margin, classes.textField)}
                  InputProps={{
                    'aria-label': 'Description',
                  }}
                />
                {/* <label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Введите категорию..."
                    value={this.state.name}
                    onChange={this.handleChange}
                  /> </label> */}
                {/* <button className="btn btn-outline-primary" onClick={this.handleSaveCategory} color="primary">
                  Добавить категорию
            </button> */}
                <Button variant="contained" color="primary" size="small" className={classes.button} onClick={this.handleSaveCategory}>
                  Добавить<Save className={classes.rightIcon} />
                </Button>
              </FormControl>
            </form>
          </DialogContent>
          <DialogTitle>Удаление категории из списка</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                {/* <label>
                  <DeleteSelect valcat={this.props.categories
                  } CategoryAdd={this.props.CategoryAdd} ChangeValueCategory={this.ChangeValueCategory} />
                </label> */}
                <InputLabel htmlFor="age-helper">Выберите </InputLabel>
                <Select
                  value={this.state.valcatid}
                  onChange={this.ChangeValueCategory}
                  // inputProps={{
                  //   name: 'age',
                  //   id: 'age-simple',
                  // }}
                  InputProps={{
                    'aria-label': 'Description',
                  }}
                >
                  {this.props.CategoryAdd.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))}
                </Select>
                <Button variant="contained" color="secondary" size="small" className={classes.button} onClick={this.handleClickDelete} >
                  Удалить<Delete className={classes.rightIcon} />
                </Button>
                {/* <button className="btn btn-outline-primary" onClick={this.handleClickDelete} color="primary">
                  Удалить категорию
            </button> */}
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Выйти
            </Button>
            {/* <Button onClick={this.handleSave} color="primary">
              Сохранить
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};



// class AddCategory extends React.Component {
//   render() {
//     return (
//       0
//     );
//   }
// }
export default withStyles(styles)(DialogSelect);
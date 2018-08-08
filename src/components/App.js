import Inputs from "./Inputs";
import InputsIncome from './InputsIncome';
//import './style.css';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { render } from 'react-dom';
import ItemList from "./ItemList";
import DialogSelect from './DialogSelect';
import 'bootstrap-css-only/css/bootstrap.css';
import Demo from './Demo';
import SimpleAppBar from './SimpleAppBar';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import pink from '@material-ui/core/colors/pink';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';

//import { Button } from "../node_modules/@material-ui/core";
import Button from '@material-ui/core/Button';


TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};
//let date = new Date();
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: '1 0 auto',
    margin: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit*2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    //textAlign: 'center',
    //color: theme.palette.text.secondary,
    flex: '1 0 auto',
    margin: theme.spacing.unit,
    backgroundColor: pink[100],
  },
 
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: "",
      // categories: "Категория не выбрана",
      categories: "",
      amount: "",
      sum: 0,
      income: 0,
      balance: 0,
      value: 0,
      CategoryAdd: []
    };
    this.handleClickIncome = this.handleClickIncome.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryAddChange = this.handleCategoryAddChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleDeleteDemoSelectedItems = this.handleDeleteDemoSelectedItems.bind(this);
    this.summFunc = this.summFunc.bind(this);
    this.sumIncome = this.sumIncome.bind(this);
    this.balanceFunc = this.balanceFunc.bind(this);
  }
  componentDidMount() {
    console.log("I was mounted");
    fetch("http://178.62.212.14:8080/expense")
      // .then(res => console.log(res.json()))
      .then((response) => response.json())
      .then((json) => this.setState(prev => prev.items = json))
      .then(() => this.summFunc(this.state.items))
      .then(() => this.sumIncome(this.state.items))
      .then(() => this.balanceFunc(this.state.income, this.state.sum));
    console.log(this.state.sum)
    console.log("Category was mounted");
    fetch("http://178.62.212.14:8080/category")
      //.then(res => console.log(res.json()))
      .then(response => response.json())
      .then((json) => this.setState(prev => prev.CategoryAdd = json));
    //console.log(this.summFunc(this.state.items) )
  }
  balanceFunc(income, expense) {
    let bal = income - expense;
    this.setState({
      balance: bal
    })
  }
  sumIncome(items) {
    let it = items.filter(item => {
      return item.type !== "EXPENSE";
    })
    let summ = it.reduce(function (a, b) { return a + b.amount }, 0)
    console.log(summ)
    this.setState({
      income: summ
    })
  }
  summFunc(items) {
    let it = items.filter(item => {
      return item.type !== "REVENUE";
    });
    let summ = it.reduce(function (a, b) { return a + b.amount }, 0)
    console.log(summ)
    this.setState({
      sum: summ
    })
  }
  handleCategoryAddChange(json) {
    this.setState(prevState => ({ "CategoryAdd": prevState.CategoryAdd.concat(json) }));
  }
  handleNameChange(name) {
    this.setState({
      name: name
    });
  }
  handleAmountChange(amount) {
    this.setState({
      amount: amount
    });
  }
  handleCategoryChange(categories) {
    this.setState({
      categories: categories
    });
  }
  handleDeleteDemoSelectedItems(selectedArr) {
    selectedArr.map((select) =>

      fetch("http://178.62.212.14:8080/expense/" + select, { method: "DELETE" })
        .then(() => {
          var updatedItems = this.state.items.filter(item => {
            return item.id !== select;
          });

          this.setState({
            items: [].concat(updatedItems)
          });
        }
        )
        .then(() => this.summFunc(this.state.items))
        .then(() => this.sumIncome(this.state.items))
        .then(() => this.balanceFunc(this.state.income, this.state.sum))
    );

  }
  handleDeleteItem(itemId) {

    fetch("http://178.62.212.14:8080/expense/" + itemId, { method: "DELETE" })
      .then(() => {
        var updatedItems = this.state.items.filter(item => {
          return item.id !== itemId;
        });

        this.setState({
          items: [].concat(updatedItems)
        });
      }
      )
      .then(() => this.summFunc(this.state.items))
      .then(() => this.sumIncome(this.state.items))
      .then(() => this.balanceFunc(this.state.income, this.state.sum))
  }
  handleClickDelete(eventid) {
    //  event.preventDefault()
    //console.log("valcatid= "+ this.state.valcatid);
    if (this.state.CategoryAdd[0].id !== eventid) {
      console.log("eventid= " + eventid)
      fetch("http://178.62.212.14:8080/category/" + eventid, { method: "DELETE" })
        .then(() => {
          var updatedCategoryAdd = this.state.CategoryAdd.filter(item => {
            return item.id !== eventid;
          });
          this.setState({
            CategoryAdd: [].concat(updatedCategoryAdd)
          });
        }
        )
    }
  };
  handleClickIncome(e) {
    let Obj = {
      details: this.state.name,
      categories: [{ name: "Доход" }],
      amount: this.state.amount,
      type: "REVENUE"
    }
    fetch("http://178.62.212.14:8080/expense",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Obj)
      })
      .then(res => res.json())
      .then(json => this.setState(prevState => ({ "items": prevState.items.concat(json) })))
      .then(() => this.summFunc(this.state.items))
      .then(() => this.sumIncome(this.state.items))
      .then(() => this.balanceFunc(this.state.income, this.state.sum));
    this.setState(
      {
        name: "",
        categories: "",
        // categories: "Категория не выбрана",
        amount: ''
      }
    )
    console.log({ items: this.state.items });
  }
  handleClick(e) {
    let Obj = {
      // id: Date.now() + Items[0].id + 1,
      details: this.state.name,
      categories: [{ name: this.state.categories }],
      amount: this.state.amount,
      type: "EXPENSE"
      // date: date.getDate() + "." + date.getMonth() + "." + date.getFullYear()
    }
    fetch("http://178.62.212.14:8080/expense",
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Obj)
      })
      .then(res => res.json())
      .then(json => this.setState(prevState => ({ "items": prevState.items.concat(json) })))
      .then(() => this.summFunc(this.state.items))
      .then(() => this.sumIncome(this.state.items))
      .then(() => this.balanceFunc(this.state.income, this.state.sum));
    this.setState(
      {
        name: "",
        categories: "",
        // categories: "Категория не выбрана",
        amount: ''
      }
    )
    console.log({ items: this.state.items });
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      
        <div className={classes.root}>
          <SimpleAppBar />
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Добавить расход" />
              <Tab label="Добавить доход" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              <Grid container spacing={0}>
                <Grid item xs={7} >
                  <Inputs id="newItem"
                    name={this.state.name}
                    categories={this.state.categories}
                    amount={this.state.amount}
                    NameChange={this.handleNameChange}
                    AmountChange={this.handleAmountChange}
                    CategoryChange={this.handleCategoryChange}
                    CategoryAdd={this.state.CategoryAdd}
                    handleClickDelete={this.handleClickDelete}
                    handleCategoryAddChange={this.handleCategoryAddChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" size="large" className={classes.button} onClick={this.handleClick}>Добавить</Button>
                </Grid>
              </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <Grid container spacing={0}>
                <Grid item xs={5} >
                  <InputsIncome
                    id="newItem2"
                    name={this.state.name}
                    categories={this.state.categories}
                    amount={this.state.amount}
                    NameChange={this.handleNameChange}
                    AmountChange={this.handleAmountChange}
                    CategoryChange={this.handleCategoryChange}
                    CategoryAdd={this.state.CategoryAdd}
                    handleClickDelete={this.handleClickDelete}
                    handleCategoryAddChange={this.handleCategoryAddChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" color="primary" size="large" className={classes.button} onClick={this.handleClickIncome}>Добавить</Button>
                </Grid>
              </Grid>
            </TabContainer>
          </SwipeableViews>
          <div className={classes.container}>
            {/* <Grid container spacing={0}>
        <Grid item xs={9} >
            <Inputs id="newItem"
              name={this.state.name}
              categories={this.state.categories}
              amount={this.state.amount}
              NameChange={this.handleNameChange}
              AmountChange={this.handleAmountChange}
              CategoryChange={this.handleCategoryChange}
              CategoryAdd={this.state.CategoryAdd}
              handleClickDelete={this.handleClickDelete}
              handleCategoryAddChange={this.handleCategoryAddChange}
            />
            </Grid>
            <Grid item xs={3}>
            <Button variant="contained" color="primary" size="large" onClick={this.handleClick}>Добавить</Button>
          </Grid>
          </Grid> */}
            <Demo items={this.state.items} onDeleteItem={this.handleDeleteDemoSelectedItems} sum={this.state.sum} balance={this.state.balance}/>

          </div>
         {/*  <Paper className={classes.paper} >
            <h2>Баланс: {this.state.balance}&nbsp;&nbsp; <h4>Всего расходов: {this.state.sum}</h4> </h2>
          </Paper>
          */}
        </div>
      
    );
  }
}
function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};
//const CategoryArr = ["Категория не выбрана", "Прочее", "Еда"];
// todo react https://codepen.io/search/projects?q=react%20todo&page=1
// tabl https://codepen.io/OStefani/pen/YYXKwr 

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// const Items = [
//   {
//     id: 1,
//     name: "Слон",
//     amount: 100500,
//     categories: "Прочее",
//     date: "3.6.2018"
//   },
//   {
//     id: 0,
//     name: "Сахар",
//     amount: 30,
//     categories: "Еда",
//     date: "3.6.2018"
//   }
// ];
export default withStyles(styles, { withTheme: true })(App);
// render(<App/>, document.getElementById("root"));


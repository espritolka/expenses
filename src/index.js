import Input from "./components/Input";
import './style.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import ItemList from "./components/ItemList";
import DialogSelect from './components/DialogSelect';
import 'bootstrap-css-only/css/bootstrap.css';
import Demo from './components/Demo';
import SimpleAppBar from './components/SimpleAppBar';
import Paper from '@material-ui/core/Paper';

//let date = new Date();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: "",
      categories: "Категория не выбрана",
      amount: "",
      sum: 0,
      CategoryAdd: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryAddChange = this.handleCategoryAddChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleDeleteDemoSelectedItems = this.handleDeleteDemoSelectedItems.bind(this);
    this.summFunc = this.summFunc.bind(this);
  }
  componentDidMount() {
    console.log("I was mounted");
    fetch("http://178.62.212.14:8080/expense")
      // .then(res => console.log(res.json()))
      .then((response) => response.json())
      .then((json) => this.setState(prev => prev.items = json))
      .then(() => this.summFunc(this.state.items));
    console.log(this.state.sum)
    console.log("Category was mounted");
    fetch("http://178.62.212.14:8080/category")
      //.then(res => console.log(res.json()))
      .then(response => response.json())
      .then((json) => this.setState(prev => prev.CategoryAdd = json));
    //console.log(this.summFunc(this.state.items) )
  }
  summFunc(items) {
    let summ = items.reduce(function (a, b) { return a + b.amount }, 0)
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
    console.log("и сюда попала")
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
  handleClick(e) {
    let Obj = {
      // id: Date.now() + Items[0].id + 1,
      details: this.state.name,
      categories: [{ name: this.state.categories }],
      amount: this.state.amount
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



    // this.setState(prevState => ({ "items": prevState.items.concat(Obj) }))
    this.setState(
      {
        name: "",
        categories: "Категория не выбрана",
        amount: ''
      }
    )
    console.log({ items: this.state.items });
  }
  // AddCategoryClick= () => {
  //   this.setState({ open: true });
  // };


  render() {
    return (
      <div className="app">
        {/* <SimpleAppBar/> */}
        <Paper>
          {/* <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"> */}
            <nav className="navbar navbar-dark bg-dark">
              <span className="navbar-brand mb-0 h1">Учет расходов</span>
            </nav>
            {/* <nav className="my-2 my-md-0 mr-md-3"> */}
            {/* <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
</nav> */}
            {/* <h5 class="my-0 mr-md-auto font-weight-normal">Учет расходов</h5> */}
          {/* </div> */}
        </Paper>
        <br/>
        <div className="container">
          {/* <Paper> */}
          <Input id="newItem"
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
          <br /><button className="btn btn-outline-primary btn-lg btn-block" type="submit"
            onClick={this.handleClick}>Добавить</button>
          {/* </Paper> */}
          {/* <ItemList name={this.state.name} categories={this.state.categories}
          amount={this.state.amount} items={this.state.items} onDeleteItem={this.handleDeleteItem}
        />*/}
          <Demo items={this.state.items} onDeleteItem={this.handleDeleteDemoSelectedItems} />
          {/* <Paper>
            Всего: {this.state.sum}
          </Paper> */}
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
            Всего: {this.state.sum}
  </div>
          </div>
        </div>
      </div>
    );
  }
}

//для products
//const CategoryArr = ["Категория не выбрана", "Прочее", "Еда"];
// todo react https://codepen.io/search/projects?q=react%20todo&page=1
// tabl https://codepen.io/OStefani/pen/YYXKwr 

const Items = [
  {
    id: 1,
    name: "Слон",
    amount: 100500,
    categories: "Прочее",
    date: "3.6.2018"
  },
  {
    id: 0,
    name: "Сахар",
    amount: 30,
    categories: "Еда",
    date: "3.6.2018"
  }
];
render(<App />, document.getElementById("root"));


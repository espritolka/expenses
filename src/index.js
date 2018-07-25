import Input from "./components/Input";
import './style.css';
import React, { Component } from 'react';
import { render } from 'react-dom';
import ItemList from "./components/ItemList";
import DialogSelect from './components/DialogSelect';
import 'bootstrap-css-only/css/bootstrap.css';
import Demo from './components/Demo';

let date = new Date();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: "",
      categories: "Категория не выбрана",
      amount: "",
      CategoryAdd: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryAddChange = this.handleCategoryAddChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleDeleteDemoSelectedItems=this.handleDeleteDemoSelectedItems.bind(this);
  }
  componentDidMount() {
    console.log("I was mounted");
    fetch("http://178.62.212.14:8080/expense")
      // .then(res => console.log(res.json()))
      .then((response) => response.json())
      .then((json) => this.setState(prev => prev.items = json));

    console.log("Category was mounted");
    fetch("http://178.62.212.14:8080/category")
      //.then(res => console.log(res.json()))
      .then(response => response.json())
      .then((json) => this.setState(prev => prev.CategoryAdd = json));
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
  handleDeleteDemoSelectedItems(selectedArr){
    console.log("и сюда попала")
selectedArr.map((select)=>
   
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
  )
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
       {/* <ItemList name={this.state.name} categories={this.state.categories}
          amount={this.state.amount} items={this.state.items} onDeleteItem={this.handleDeleteItem}
        />*/}
<Demo items={this.state.items} onDeleteItem={this.handleDeleteDemoSelectedItems}/>
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


import { Component } from '@angular/core';
import { NavController , AlertController, reorderArray} from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled = false;

  constructor(private todoProvider: TodoProvider, public navCtrl: NavController, private alertController:AlertController) {
    this.todos = todoProvider.getTodos();
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    console.log($event);
    reorderArray(this.todos, $event)
  }

  archiveTodo(todoIndex) {
    console.log("todoIndex: " + todoIndex);
    this.todos.splice(todoIndex,1);  // Delete one element with the given index
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title:"Add A Todo",
      message:"Enter Your Todo",
      inputs: [
        {
          type:"text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Todo",
          handler: (inputData)=>{
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo(todoText);
          }
        }
      ]

    });
    addTodoAlert.present();

  }

}

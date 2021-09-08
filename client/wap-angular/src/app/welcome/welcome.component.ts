import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Task, Type, WapType } from '../data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router:Router, private formBuilder:FormBuilder, private data:DataService) {}

  taskList: Task[] = [];

  welcomeForm = this.formBuilder.group({
    name: [null, [Validators.required,Validators.maxLength(20)]],
    type: [null, Validators.required],
    wapName: [null, [Validators.required,Validators.maxLength(20)]],
    wapType: [null, Validators.required]
  })

  taskForm = this.formBuilder.group({
    newTaskTitle: [null, [Validators.required,Validators.maxLength(150)]],
    newTaskUrgency: [null, Validators.required]
  })

  ngOnInit(): void {
  }

  addTask(): void {
    var t = new Task;
    t.title = this.taskForm.get("newTaskTitle").value;
    t.urgency = this.taskForm.get("newTaskUrgency").value;
    this.taskList.push(t)
    this.taskForm.reset()
  }

  removeTask(task: Task) {
    this.taskList.splice(this.taskList.indexOf(task),1)
  }

  onSubmit(): void {
    this.data.name = this.welcomeForm.get("name").value
    switch(this.welcomeForm.get("type").value){
      case "boi1":
        this.data.type = Type.boi1
        break
      case "boi2":
        this.data.type = Type.boi2
        break
    }
    this.data.wapName = this.welcomeForm.get("wapName").value
    switch(this.welcomeForm.get("wapType").value){
      case "dog":
        this.data.wapType = WapType.dog
        break
      case "cat":
        this.data.wapType = WapType.cat
      case "sheep":
        this.data.wapType = WapType.sheep
        break
      case "pikachu":
        this.data.wapType = WapType.pikachu
        break
      case "ghost":
        this.data.wapType = WapType.ghost
        break
      case "drako":
        this.data.wapType = WapType.drako
        break
    }
    this.data.taskList = this.taskList
    this.router.navigate(['/','game'])
  }

}

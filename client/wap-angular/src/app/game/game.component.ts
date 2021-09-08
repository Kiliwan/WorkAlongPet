import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import socketio from "socket.io-client";
import { DataService, Task, Type, WapType } from '../data.service';

export enum KEY_CODE {
  LEFT_ARROW = 37,
  UP_ARROW = 38, 
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40,
  DELETE = 8
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private data:DataService, private formBuilder:FormBuilder) {}

  private canvasWidth = 900;
  private canvasHeight = 500;

  private size = 30;
  private movement = 10;
  
  @ViewChild("wap")
  private wapCanvas: ElementRef;
  private context: any;
  
  private socket: any;
  
  messages:String[] = [];
  chatForm = this.formBuilder.group({
    message: [null, [Validators.required, Validators.maxLength(150)]]
  });
  private messagesToKeep: Number = 15;

  taskList: Task[];
  
  private name: String;
  private type: Type;
  private wapName: String;
  private wapType: WapType;
  private position: any = {x: null, y: null, wapx: null, wapy: null};
  
  private currentImage: number = 12;
  private wapCurrentImage: number = 6;
  private typeArray: any;
  private wapTypeArray: any;

  private boi1;
  private boi2;

  private dog;
  private kitty;
  private sheep;
  private drako;
  private ghost;
  private pikachu;

  public ngOnInit() {
    this.socket = socketio("http://localhost:3000",{
      withCredentials: true,
      extraHeaders: {
        "custom-header": "wap"
      }
    });
    this.name = this.data.name;
    this.type = this.data.type;
    this.wapName = this.data.wapName;
    this.wapType = this.data.wapType;
    this.position = {
      x: Math.floor(Math.random()*(this.canvasWidth-1)+1),
      y: Math.floor(Math.random()*(this.canvasHeight-1)+1),
      wapx: this.position.x-this.size,
      wapy: this.position.y+this.size/4
    };
    this.socket.emit("position", {name: this.name, type: this.type, wapName: this.wapName, wapType: this.wapType, position: this.position});
    this.taskList = this.data.taskList.sort((a,b)=>a.urgency<b.urgency?1:0);
  }
  
  public ngAfterViewInit() {
    this.context = this.wapCanvas.nativeElement.getContext("2d");
    this.context.font = "8px Arial"
    this.socket.on("players", players => {
      this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight)
      players.forEach(p => {
        switch(p.type) {
          case Type.boi1:
            this.typeArray = this.boi1;
            break;
          case Type.boi2:
            this.typeArray = this.boi2;
            break;
        }
        switch(p.wapType) {
          case WapType.dog:
            this.wapTypeArray = this.dog;
            break;
          case WapType.cat:
            this.wapTypeArray = this.kitty;
            break;
          case WapType.sheep:
            this.wapTypeArray = this.sheep;
            break;
          case WapType.drako:
            this.wapTypeArray = this.drako;
            break;
          case WapType.ghost:
            this.wapTypeArray = this.ghost;
            break;
          case WapType.pikachu:
            this.wapTypeArray = this.pikachu;
            break;
        }
        if (p.position!=null) {
          this.context.drawImage(this.typeArray[this.currentImage],p.position.x,p.position.y,this.size,this.size*1.25);
          this.context.fillText(p.name,p.position.x,p.position.y-this.size/4);
          this.context.drawImage(this.wapTypeArray[this.wapCurrentImage], p.position.wapx,p.position.wapy,this.size,this.size*1.25);
          this.context.fillText(p.wapName,p.position.wapx-this.size/4,p.position.wapy-this.size/4);
        }
      });
    });
    this.socket.on("chat", chat => {
      this.messages.push(chat);
      this.messages=this.messages.slice(-this.messagesToKeep);
    });
  }

  public ngAfterContentInit(): void {
        
        const dog = [document.getElementById('dog_left_1'), 
        document.getElementById('dog_left_2'), 
        document.getElementById('dog_right_1'),
        document.getElementById('dog_right_2'), 
        document.getElementById('dog_up_1'), 
        document.getElementById('dog_up_2'),
        document.getElementById('dog_down_1'), 
        document.getElementById('dog_down_2')];
    
        const drako = [document.getElementById('drako_left_1'), 
        document.getElementById('drako_left_2'), 
        document.getElementById('drako_right_1'),
        document.getElementById('drako_right_2'), 
        document.getElementById('drako_up_1'), 
        document.getElementById('drako_up_2'),
        document.getElementById('drako_down_1'), 
        document.getElementById('drako_down_2')];
    
        const ghost = [document.getElementById('ghost_left_1'), 
        document.getElementById('ghost_left_2'), 
        document.getElementById('ghost_right_1'),
        document.getElementById('ghost_right_2'), 
        document.getElementById('ghost_up_1'), 
        document.getElementById('ghost_up_2'),
        document.getElementById('ghost_down_1'), 
        document.getElementById('ghost_down_2')];
    
        const kitty = [document.getElementById('kitty_left_1'), 
        document.getElementById('kitty_left_2'), 
        document.getElementById('kitty_right_1'),
        document.getElementById('kitty_right_2'), 
        document.getElementById('kitty_up_1'), 
        document.getElementById('kitty_up_2'),
        document.getElementById('kitty_down_1'), 
        document.getElementById('kitty_down_2')];
    
        const pika = [document.getElementById('pika_left_1'), 
        document.getElementById('pika_left_2'), 
        document.getElementById('pika_right_1'),
        document.getElementById('pika_right_2'), 
        document.getElementById('pika_up_1'), 
        document.getElementById('pika_up_2'),
        document.getElementById('pika_down_1'), 
        document.getElementById('pika_down_2')];
    
        const sheep = [document.getElementById('sheep_left_1'), 
        document.getElementById('sheep_left_2'), 
        document.getElementById('sheep_right_1'),
        document.getElementById('sheep_right_2'), 
        document.getElementById('sheep_up_1'), 
        document.getElementById('sheep_up_2'),
        document.getElementById('sheep_down_1'), 
        document.getElementById('sheep_down_2')];
    
        const boi1 = [document.getElementById('boi_left_1'), 
        document.getElementById('boi_left_2'), 
        document.getElementById('boi_left_3'), 
        document.getElementById('boi_left_2'),
        document.getElementById('boi_right_1'),
        document.getElementById('boi_right_2'), 
        document.getElementById('boi_right_3'), 
        document.getElementById('boi_right_2'), 
        document.getElementById('boi_up_1'), 
        document.getElementById('boi_up_2'),
        document.getElementById('boi_up_3'),
        document.getElementById('boi_up_2'),
        document.getElementById('boi_down_1'), 
        document.getElementById('boi_down_2'),
        document.getElementById('boi_down_3'),
        document.getElementById('boi_down_2'),];
    
        const boi2 = [document.getElementById('boi2_left_1'), 
        document.getElementById('boi2_left_2'), 
        document.getElementById('boi2_left_3'), 
        document.getElementById('boi2_left_2'),
        document.getElementById('boi2_right_1'),
        document.getElementById('boi2_right_2'), 
        document.getElementById('boi2_right_3'), 
        document.getElementById('boi2_right_2'), 
        document.getElementById('boi2_up_1'), 
        document.getElementById('boi2_up_2'),
        document.getElementById('boi2_up_3'),
        document.getElementById('boi2_up_2'),
        document.getElementById('boi2_down_1'), 
        document.getElementById('boi2_down_2'),
        document.getElementById('boi2_down_3'),
        document.getElementById('boi2_down_2'),];

        this.boi1 = boi1;
        this.boi2 = boi2;

        this.dog = dog;
        this.kitty = kitty;
        this.ghost = ghost;
        this.drako = drako;
        this.pikachu = pika;
        this.sheep = sheep;
  }

  public move() {
    this.socket.emit("update", this.position);
  }
  
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.LEFT_ARROW && this.position.x > this.movement) {
      this.position.x -= this.movement;
      this.position.wapx = this.position.x+2*this.size;
      this.position.wapy = this.position.y+this.size/4;
      if (this.currentImage>=0 && this.currentImage<3) this.currentImage+=1
      else this.currentImage=0
      if (this.wapCurrentImage==0) this.wapCurrentImage=1
      else this.wapCurrentImage=0
    }
    if (event.keyCode === KEY_CODE.UP_ARROW && this.position.y > this.movement) {
      this.position.y -= this.movement;
      this.position.wapx = this.position.x+this.size/4;
      this.position.wapy = this.position.y+2*this.size;
      if (this.currentImage>7 && this.currentImage<11) this.currentImage+=1
      else this.currentImage=8
      if (this.wapCurrentImage==4) this.wapCurrentImage=5
      else this.wapCurrentImage=4
    }
    if (event.keyCode === KEY_CODE.RIGHT_ARROW && this.position.x < this.canvasWidth-this.size-this.movement) {
      this.position.x += this.movement;
      this.position.wapx = this.position.x-3*this.size/2;
      this.position.wapy = this.position.y+this.size/4;
      if (this.currentImage>3 && this.currentImage<7) this.currentImage+=1
      else this.currentImage=4
      if (this.wapCurrentImage==2) this.wapCurrentImage=3
      else this.wapCurrentImage=2
    }
    if (event.keyCode === KEY_CODE.DOWN_ARROW && this.position.y < this.canvasHeight-this.size-this.movement) {
      this.position.y += this.movement;
      this.position.wapx = this.position.x+this.size/4;
      this.position.wapy = this.position.y-3*this.size/2;
      if (this.currentImage>11 && this.currentImage<15) this.currentImage+=1
      else this.currentImage=12
      if (this.wapCurrentImage==6) this.wapCurrentImage=7
      else this.wapCurrentImage=6
    }
    this.move()
  }

  public sendMessage() {
    this.socket.emit("message",formatDate(Date.now(),'hh:mm:ss','en-US')+" : <"+this.name+"> : "+this.chatForm.get("message").value)
    this.chatForm.reset()
  }

  public taskDone(task: Task) {
    this.taskList.splice(this.taskList.indexOf(task),1)
  }

}
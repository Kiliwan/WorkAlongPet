import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  name: String;
  type: Type;
  wapName: String;
  wapType: WapType;
  taskList: Task[];
}

export enum Type {
  boi1,
  boi2
}

export enum WapType {
  dog,
  cat,
  sheep,
  pikachu,
  ghost,
  drako
}

export class Task {
  title: String;
  urgency: Number;
}
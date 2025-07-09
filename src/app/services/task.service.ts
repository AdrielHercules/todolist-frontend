import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[] = [
    {
      id: '1',
      icon: 'icon-calendar',
      text: 'First task',
      completed: false,
    },
    {
      id: '2',
      icon: 'icon-bowl',
      text: 'Second task',
      completed: false,
    },
    {
      id: '3',
      icon: 'icon-game-controller',
      text: 'Third task',
      completed: false,
    },
    {
      id: '4',
      icon: 'icon-add-to-list',
      text: 'Add to list',
      completed: false,
    },
    {
      id: '5',
      icon: 'icon-classic-computer',
      text: 'Fix classic computer',
      completed: true,
    },
    {
      id: '6',
      icon: 'icon-controller-fast-backward',
      text: 'Rewind recording',
      completed: false,
    },
    {
      id: '7',
      icon: 'icon-creative-commons-attribution',
      text: 'Update CC attribution',
      completed: false,
    },
    {
      id: '8',
      icon: 'icon-chevron-down',
      text: 'Review dropdown logic',
      completed: true,
    },
    {
      id: '9',
      icon: 'icon-warning',
      text: 'Handle warning alert',
      completed: false,
    },
    {
      id: '10',
      icon: 'icon-remove-user',
      text: 'Remove inactive user',
      completed: false,
    },
    {
      id: '11',
      icon: 'icon-document-landscape',
      text: 'Convert to landscape format',
      completed: true,
    },
    {
      id: '12',
      icon: 'icon-cloud',
      text: 'Sync to cloud',
      completed: false,
    },
    {
      id: '13',
      icon: 'icon-controller-play',
      text: 'Start playback',
      completed: true,
    },
  ];

  getTasks() {
    return this.taskList;
  }
}

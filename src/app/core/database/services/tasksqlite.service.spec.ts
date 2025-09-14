import { TestBed } from '@angular/core/testing';

import { TasksqliteService } from './tasksqlite.service';

describe('TasksqliteService', () => {
  let service: TasksqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksqliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

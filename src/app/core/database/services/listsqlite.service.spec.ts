import { TestBed } from '@angular/core/testing';

import { ListSQLiteService } from './listsqlite.service';

describe('ListsqliteService', () => {
  let service: ListSQLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSQLiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

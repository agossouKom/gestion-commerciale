import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pays } from 'src/app/my-modele/pays';

@Component({
  selector: 'app-my-table-helper',
  templateUrl: './my-table-helper.component.html',
  styleUrls: ['./my-table-helper.component.css']
})
export class MyTableHelperComponent implements OnInit{

  @Input() HeadArray :any[] = [];
  @Input() GridArray :any[] = [];
  //@Input() GridArray :Pays[] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  edit(item: any) {
    debugger;
    this.onEdit.emit(item);
  }
  delete(item: any) {
    debugger;
    this.onDelete.emit(item);
  }
}

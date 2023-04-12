import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthorDetails } from 'src/app/common-utils/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isHandset: boolean;
  @Input() author: AuthorDetails;
  @Output() profileClicked: EventEmitter<any> = new EventEmitter<any>();

  onProfileClicked(){
    this.profileClicked.emit()
  }
}

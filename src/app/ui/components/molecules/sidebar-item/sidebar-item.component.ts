import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/configuration/ngrx/app.state';
import { statusClassText } from '../../atoms/interfaces/text-class.interface';
import { MenuItem } from '../interfaces/sidebar-list.interface';
import { UserActions } from 'src/app/configuration/ngrx/user/user.actions';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {

  @Input() menuItem: MenuItem = new MenuItem();
  textStyle: statusClassText = statusClassText.SMALL_WHITE;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  /**
   * get param to log out if user selected 'log out'
  */
  logOut(title: string): void {
    if (!title.toLocaleLowerCase().includes('log out'.toLocaleLowerCase())) return;
    this.store.dispatch(UserActions.accessToken({token: ''}));
    this.router.navigate(['/auth/login']);
  }

}

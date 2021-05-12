import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Input() title: string = '';
  @Input() isSubscribedForNotifications: boolean = false;

  @Output() notificationsSubscribe: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  onNotifications(): void {
    this.isSubscribedForNotifications = this.isSubscribedForNotifications;

    this.notificationsSubscribe.emit(this.isSubscribedForNotifications);
  }

}

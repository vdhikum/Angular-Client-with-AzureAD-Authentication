import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationResult } from "@azure/msal-browser";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn = false;
  profile?: MicrosoftGraph.User;
  users?: MicrosoftGraph.User[];
  userNameFilter: string = "";

  constructor(ngbConfig: NgbConfig,private primengConfig: PrimeNGConfig,private authService: MsalService, private client: HttpClient) {
    this.login();
    ngbConfig.animation = false;
  }
  ngOnInit(): void {
    
      this.primengConfig.ripple = true;
  }
  checkAccount() {
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  login() {
    this.authService
      .loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
        this.checkAccount();
      });
  }

  logout() {
    this.authService.logout();
  }
  title = 'Dr Ram Krishna Singh';
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { TitleComponent } from './shared/title/title.component';
import { SettingsComponent } from './shared/settings/settings.component';
import { appRouting } from './app.routes';
import { SettingsService } from './services/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ZombiesModalsComponent } from './modals/zombies/zombiesmodals.component';
import { ZombiesComponent } from './zombies/zombies.component';
import { CerebrosModalsComponent } from './modals/cerebrosmodals/cerebrosmodals.component';
import { CerebrosComponent } from './cerebros/cerebros.component';
import { EditZombieComponent } from './modals/edit-zombie/edit-zombie.component';
import { EditCerebrosComponent } from './modals/edit-cerebros/edit-cerebros.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    ZombiesModalsComponent,
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    DashboardComponent,
    ProgressComponent,
    GraphsComponent,
    HeaderComponent,
    SidemenuComponent,
    TitleComponent,
    SettingsComponent,
    ZombiesComponent,
    CerebrosModalsComponent,
    CerebrosComponent,
    EditZombieComponent,
    EditCerebrosComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule, FormsModule, appRouting, HttpClientModule,CommonModule,ReactiveFormsModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

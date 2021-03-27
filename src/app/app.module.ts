import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoadmapContainerComponent } from './roadmap/roadmap-container/roadmap-container.component';
import { RoadmapService } from './roadmap/roadmap.service';

@NgModule({
  declarations: [
    AppComponent,
    RoadmapContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    RoadmapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

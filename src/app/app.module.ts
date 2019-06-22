import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MultiSelectComponent } from './common/multi-select/multi-select.component';
import { SearchPipe } from './common/filters/search.pipe';
import { ClickElsewhereDirective } from './common/directives/click-elsewhere.directive';
import { MultiSelectTemplateDirective } from './common/directives/multi-select-template.directive';
import { MinOptionsRequiredDirective } from './common/directives/min-options-required.directive';

@NgModule({
  declarations: [
    AppComponent,
    MultiSelectComponent,
    SearchPipe,
    ClickElsewhereDirective,
    MultiSelectTemplateDirective,
    MinOptionsRequiredDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

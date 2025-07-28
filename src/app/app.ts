import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { updatePrimaryPalette } from '@primeuix/themes';
import { GlaInputComponent } from 'gla.gob.sv';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, FormsModule, InputTextModule, GlaInputComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('gob.library.angular');

  value: string | undefined;

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('gsdark');
  }


  changePrimaryColor() {
    updatePrimaryPalette({
        50: '{indigo.50}',
        100: '{indigo.100}',
        200: '{indigo.200}',
        300: '{indigo.300}',
        400: '{indigo.400}',
        500: '{indigo.500}',
        600: '{indigo.600}',
        700: '{indigo.700}',
        800: '{indigo.800}',
        900: '{indigo.900}',
        950: '{indigo.950}'
    });
}

}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-nabbar',
  imports:[RouterLink],
  templateUrl: './nabbar.component.html',
  styleUrls: ['./nabbar.component.css']
})
export class NabbarComponent {}

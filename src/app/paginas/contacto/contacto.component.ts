import { Component } from '@angular/core'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({ selector: 'app-contacto', standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './contacto.component.html', 
  styleUrl: './contacto.component.css' })
   
export class ContactoComponent { 

}

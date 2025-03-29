import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../auth/services/clients.service';
import { EmployeesService } from '../../../auth/services/employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dominioEspecificoValidator } from '../../../validations/validators';
import { forkJoin } from 'rxjs';

interface Clients {
  idcliente: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  telefono: number;
  correo: string;
  contrasenia: string;
  created_at: string;
  updated_at: string;
}

interface Employees {
    idempleado: number;
    nombre: string;
    appaterno: string;
    apmaterno: string;
    telefono: number;
    nss: number;
    rfc: string;
    correo: string;
    contrasenia: string;
    created_at: string;
    updated_at: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

    clients: Clients[] = [];
    employees: Employees[] = [];
    showAddModal = false;
    showEditModal = false;
    showDeleteModal = false;
    userForm!: FormGroup;
    currentUser: Clients | Employees | null = null;

  constructor(private clientsService: ClientsService, private employeesService: EmployeesService , private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initForm();
  }

  initForm(user?: Clients | Employees) {
    this.userForm = this.fb.group({
      correo: [user?.correo || '', [Validators.required, Validators.email, Validators.maxLength(60) , dominioEspecificoValidator('@gmail.com')]],
      contrasenia: [user?.contrasenia || '', [Validators.required, Validators.maxLength(255)]],
    });
  }

  loadUsers() {
    forkJoin([
      this.clientsService.getClients(),
      this.employeesService.getEmployees()
    ]).subscribe({
      next: ([clients, employees]) => {
        console.log('Datos recibidos:', {clients, employees});
        this.clients = clients;
        this.employees = employees;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  private transformUserData(data: any): any {
    return {
      Correo: data.correo, 
      Contrasenia: data.contrasenia, 
    };
  }

  addUsers() {
    if (this.userForm.valid) {
      const userData = this.transformUserData(this.userForm.value); 
      this.clientsService.createClients;this.employeesService.createEmployees(userData).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
        },
      });
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}

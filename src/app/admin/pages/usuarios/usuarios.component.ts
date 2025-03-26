import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dominioEspecificoValidator } from '../../../validations/validators';

interface Users {
  idusuario: number;
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

  users: Users[] = [];
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  usersForm!: FormGroup;
  currentUsers: Users | null = null;

  constructor(private usersService: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
    this.initForm();
  }
  initForm(users?: Users) {
    this.usersForm = this.fb.group({
      correo: [users?.correo || '', [Validators.required, Validators.email, Validators.maxLength(60) , dominioEspecificoValidator('@gmail.com')]],
      contrasenia: [users?.contrasenia || '', [Validators.required, Validators.maxLength(255)]],
    });
  }

  validarCorreo(): void {
    const correoControl = this.usersForm.get('correo');
    if (correoControl?.invalid) {
      console.log('Correo inválido');
    } else {
      console.log('Correo válido');
    }
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (data: Users[]) => {
        console.log('Datos recibidos:', data);
        this.users = data;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        alert('Error al cargar usuarios');
      },
    });
  }

  openAddModal() {
    this.initForm();
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  private transformUserData(data: any): any {
    return {
      Correo: data.correo, 
      Contrasenia: data.contrasenia, 
    };
  }

  addUsers() {
    if (this.usersForm.valid) {
      const userData = this.transformUserData(this.usersForm.value); 
      this.usersService.createUsers(userData).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          this.loadUsers();
          this.closeAddModal();
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          alert('Error al crear el usuario');
        },
      });
    } else {
      this.markFormGroupTouched(this.usersForm);
    }
  }

  openEditModal(users: Users) {
    this.currentUsers = users;
    this.initForm(users);
    this.showEditModal = true;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  closeEditModal() {
    this.showEditModal = false;
    this.currentUsers = null;
  }

  updateUsers() {
    if (this.usersForm.valid && this.currentUsers) {
      const userData = this.transformUserData(this.usersForm.value); 
      this.usersService
        .updateUsers(this.currentUsers.idusuario, userData)
        .subscribe({
          next: (response) => {
            console.log('Usuario actualizado:', response);
            this.loadUsers();
            this.closeEditModal();
          },
          error: (error) => {
            console.error('Error al actualizar usuario:', error);
            alert('Error al actualizar el usuario');
          },
        });
    } else {
      this.markFormGroupTouched(this.usersForm);
    }
  }

  openDeleteModal(users: Users) {
    this.currentUsers = users;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.currentUsers = null;
  }

  deleteUsers() {
    if (this.currentUsers) {
      this.usersService.deleteUsers(this.currentUsers.idusuario).subscribe({
        next: (response) => {
          console.log('Usuario eliminado:', response);
          this.loadUsers();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
          alert('Error al eliminar el usuario');
        },
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../auth/services/sales.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloLetrasValidator, soloLetras, soloNumerosValidator, dominioEspecificoValidator } from '../../../validations/validators';

interface Sales {
  idventa: number;
  cliente: string;
  fechaventa: string;
  total: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-ventas',
  standalone: false,
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit{

          sales: Sales[] = [];
          showAddModal = false;
          showEditModal = false;
          showDeleteModal = false;
          salesForm!: FormGroup;
          currentSales: Sales | null = null;

          constructor(private salesService: SalesService, private fb: FormBuilder) {}

          ngOnInit(): void {
            this.loadSales();
            this.initForm();
        }

        initForm(sales?: Sales) {
          this.salesForm = this.fb.group({
            cliente: [sales?.cliente || '', [Validators.required, Validators.maxLength(40), soloLetrasValidator()]],
            fechaventa: [sales?.fechaventa || '', [Validators.required, Validators.maxLength(20)]],
            total: [sales?.total || '', [Validators.required, soloNumerosValidator(10)]],
        });
        }

    // Usa la función para evitar la entrada de números
    onKeyPress(event: KeyboardEvent): boolean {
      return soloLetras(event);
    }
  
    soloNumeros(event: KeyboardEvent): boolean {
      const charCode = event.key.charCodeAt(0);
      if (charCode >= 48 && charCode <= 57) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }
  
    limitarLongitud(event: Event, maxLength: number): void {
      const input = event.target as HTMLInputElement;
      if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
      }
    }

    loadSales() {
      this.salesService.getSales().subscribe({
        next: (data: Sales[]) => {
          console.log('Datos recibidos:', data);
          this.sales = data;
        },
        error: (error) => {
          console.error('Error al obtener ventas:', error);
          alert('Error al cargar ventas');
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
  
    private transformSalesData(data: any): any {
      return {
        Cliente: data.cliente, 
        FechaVenta: data.fechaventa,
        Total: data.total,
      };
    }

    addSales() {
      if (this.salesForm.valid) {
        const salesData = this.transformSalesData(this.salesForm.value); 
        this.salesService.createSales(salesData).subscribe({
          next: (response) => {
            console.log('Venta creado:', response);
            this.loadSales();
            this.closeAddModal();
          },
          error: (error) => {
            console.error('Error al crear venta:', error);
            alert('Error al crear el venta');
          },
        });
      } else {
        this.markFormGroupTouched(this.salesForm);
      }
    }

    openEditModal(sales: Sales) {
              this.currentSales = sales;
              this.initForm(sales);
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
              this.currentSales = null;
            }

            updateSales() {
              if (this.salesForm.valid && this.currentSales) {
                const salesData = this.transformSalesData(this.salesForm.value); 
                this.salesService
                  .updateSales(this.currentSales.idventa, salesData)
                  .subscribe({
                    next: (response) => {
                      console.log('Venta actualizado:', response);
                      this.loadSales();
                      this.closeEditModal();
                    },
                    error: (error) => {
                      console.error('Error al actualizar venta:', error);
                      alert('Error al actualizar el venta');
                    },
                  });
              } else {
                this.markFormGroupTouched(this.salesForm);
              }
            }

            openDeleteModal(sales: Sales) {
              this.currentSales = sales;
              this.showDeleteModal = true;
            }
          
            closeDeleteModal() {
              this.showDeleteModal = false;
              this.currentSales = null;
            }
    
            deleteSales() {
              if (this.currentSales) {
                this.salesService.deleteSales(this.currentSales.idventa).subscribe({
                  next: (response) => {
                    console.log('Venta eliminado:', response);
                    this.loadSales();
                    this.closeDeleteModal();
                  },
                  error: (error) => {
                    console.error('Error al eliminar venta:', error);
                    alert('Error al eliminar venta');
                  },
                });
              }
            }
}

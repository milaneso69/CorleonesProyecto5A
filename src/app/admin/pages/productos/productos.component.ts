import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../auth/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloLetrasValidator, soloLetras, soloNumerosValidator } from '../../../validations/validators';

interface Products {
  idproducto: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  created_at: string;
  updated_at: string;
} 

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
        
  products: Products[] = [];
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  productsForm!: FormGroup;
  currentProducts: Products | null = null;

  constructor(private productsService: ProductsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadProducts();
    this.initForm();
}

initForm(products?: Products) {
          this.productsForm = this.fb.group({
            nombre: [products?.nombre || '', [Validators.required, Validators.maxLength(50), soloLetrasValidator()]],
            precio: [products?.precio || '', [Validators.required, soloNumerosValidator(10)]],
            descripcion: [products?.descripcion || '', [Validators.required, Validators.maxLength(50)]],
            stock: [products?.stock || '', [Validators.required, soloNumerosValidator(10)]],
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

    loadProducts() {
      this.productsService.getProducts().subscribe({
        next: (data: Products[]) => {
          console.log('Datos recibidos:', data);
          this.products = data;
        },
        error: (error) => {
          console.error('Error al obtener productos:', error);
          alert('Error al cargar productos');
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
  
    private transformProductsData(data: any): any {
      return {
        Nombre: data.nombre, 
        Precio: data.precio,
        Descripcion: data.descripcion,
        STOCK: data.stock,
      };
    }

    addProducts() {
      if (this.productsForm.valid) {
        const productsData = this.transformProductsData(this.productsForm.value); 
        this.productsService.createProducts(productsData).subscribe({
          next: (response) => {
            console.log('Producto creado:', response);
            this.loadProducts();
            this.closeAddModal();
          },
          error: (error) => {
            console.error('Error al crear producto:', error);
            alert('Error al crear el producto');
          },
        });
      } else {
        this.markFormGroupTouched(this.productsForm);
      }
    }

        openEditModal(products: Products) {
          this.currentProducts = products;
          this.initForm(products);
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
          this.currentProducts = null;
        }

        updateProducts() {
          if (this.productsForm.valid && this.currentProducts) {
            const productsData = this.transformProductsData(this.productsForm.value); 
            this.productsService
              .updateProducts(this.currentProducts.idproducto, productsData)
              .subscribe({
                next: (response) => {
                  console.log('Producto actualizado:', response);
                  this.loadProducts();
                  this.closeEditModal();
                },
                error: (error) => {
                  console.error('Error al actualizar producto:', error);
                  alert('Error al actualizar el producto');
                },
              });
          } else {
            this.markFormGroupTouched(this.productsForm);
          }
        }

        openDeleteModal(products: Products) {
          this.currentProducts = products;
          this.showDeleteModal = true;
        }
      
        closeDeleteModal() {
          this.showDeleteModal = false;
          this.currentProducts = null;
        }

        deleteProducts() {
          if (this.currentProducts) {
            this.productsService.deleteProducts(this.currentProducts.idproducto).subscribe({
              next: (response) => {
                console.log('Producto eliminado:', response);
                this.loadProducts();
                this.closeDeleteModal();
              },
              error: (error) => {
                console.error('Error al eliminar producto:', error);
                alert('Error al eliminar el producto');
              },
            });
          }
        }
}

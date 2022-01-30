import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/services/alertify.service';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @Input() user: User | undefined;
  @Output() openEvent = new EventEmitter<boolean>();
  @Output() productEvent = new EventEmitter<Product>();
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    quentity: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required, Validators.minLength(2)]),
    userId: new FormControl('', Validators.required)
  });
  constructor(private productService: ProductService, private alertify: AlertifyService) { }

  ngOnInit() {
    console.log(this.user);
    if(this.user)
      this.productForm.get('userId')?.setValue(this.user.id);
  }
  setOpenEvent(open: boolean) {
    this.openEvent.emit(open);
  }
  add() {
      if (this.productForm.valid) {
        this.alertify.confirm('are you Sure to Add Product ??', () => {
           this.productService.postProduct(this.productForm.value).subscribe(
          d => {
            if(d){
              d.product.user = this.user;
              this.productEvent.emit(d.product);
              this.setOpenEvent(false);
              this.alertify.success('new Product Added .!!');
            }else{
              console.log("Error ...");
            }
            }, e => {
            console.log(e);

          }
        );
        });
      }
  }
  getConroller(name: string): AbstractControl | null{
    return this.productForm.get(name);
  }
  @HostListener('window:click', ['$event.target'])
  hide(event:any) {
    if (event.id === 'myModal') {
      this.setOpenEvent(false);
    }
  }
}

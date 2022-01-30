import { AfterViewInit, Component,  ViewChild, OnInit, OnDestroy } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Product } from 'src/models/product';
import { ProductService } from '../product.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { interval, of, timer } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { AlertifyService } from '../../services/alertify.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit, OnDestroy {
  dataSource: any | undefined;
  displayedColumns: string[] = ['id', 'name', 'price', 'quentity', 'category', 'user', 'remove'];
  subscription: any;
  searchForm = new FormGroup({
    name : new FormControl('', Validators.required)
  });
  data: any[] = [];
  user: User| undefined;
  photo: string | undefined;
  openAddProduct = false;
  constructor(private alertify: AlertifyService, private productService: ProductService, private authservice: AuthService) {
  }
  ngOnInit(){
    this.authservice.loadData();
    this.user = this.authservice.currentUser;
    this.photo = this.authservice.currentPhoto;
    this.productService.getAllProduct().subscribe(d => {
     this.dataSource = new MatTableDataSource(d);
     if(d)
       this.data = d;
    }, e => {
      console.log(e);
    });

    this.subscription = interval(20000)
      .pipe(
        switchMap(() => {
          return this.productService.getAllProduct()
            .pipe(catchError(err => {
              // Handle errors
              console.error(err);
              return of(undefined);
            }));
        }),
        filter(data => data !== undefined)
      )
      .subscribe(data => {
        this.alertify.success('data refresh Successfully .. !!');
        if(data){
          this.dataSource = new MatTableDataSource(data);
          this.data = {...data};

        }

      });
    }
  searchByName(event:any){
    const value = event.target.value;
    console.log(value);

    if(value.length > 2){
      const data = (this.dataSource as MatTableDataSource<Product>).data;
      this.dataSource = new MatTableDataSource(data.filter(p => p.name.includes(value)));
    }
    if(value.length == 0){
      this.dataSource = new MatTableDataSource(this.data);
    }
  }
  logout(){
    this.authservice.logout();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  setOpenAddProduct(state: boolean){
    this.openAddProduct = state;
  }
  AddProduct(product: Product){
    this.data.push(product);
    this.dataSource = new MatTableDataSource(this.data);
  }
  remove(productId: number){
    this.alertify.confirm('are you sure Delete Record??', () => {
      this.productService.remove(productId).subscribe(d => {
        this.alertify.success('data refresh Successfully .. !!');
        this.data = this.data?.filter(i => i.id != productId);
        this.dataSource = new MatTableDataSource(this.data);
      }, e => {
        console.log(e);
      })
    })
  }

}

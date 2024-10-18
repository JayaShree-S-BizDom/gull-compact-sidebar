import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  
  // Define properties to hold medicine data
  medicines = [
    {
      id: 1,
      name: "Benzonatate",
      price: 220,
      code: "MED001"
    },
    {
      id: 2,
      name: "Benadryl",
      price: 150,
      code: "MED002"
    },
    {
      id: 3,
      name: "Paracetamol",
      price: 10,
      code: "MED003"
    }
  ];
  
  injections = [
    {
      id: 1,
      name: "Benzonatate Injection",
      price: 30,
      code: "INJ001"
    },
    {
      id: 2,
      name: "Benadryl Injection",
      price: 80,
      code: "INJ002"
    },
    {
      id: 3,
      name: "Paracetamol Injection",
      price: 60,
      code: "INJ003"
    }
  ];
  
  Syrupts = [
    {
      id: 1,
      name: "Benzonatate Syrupt",
      price: 250,
      code: "SYP001"
    },
    {
      id: 2,
      name: "Dry Cough Syrupt",
      price: 180,
      code: "SYP002"
    },
    {
      id: 3,
      name: "Paracetamol Syrupt",
      price: 104,
      code: "SYP003"
    }
  ];
  
  PainReliefs = [
    {
      id: 1,
      name: "Benzonatate PainRelief",
      price: 20,
      code: "PRE001"
    },
    {
      id: 2,
      name: "Benadryl PainRelief",
      price: 50,
      code: "PRE002"
    },
    {
      id: 3,
      name: "Paracetamol PainRelief",
      price: 12,
      code: "PRE003"
    }
  ];

  public rows = [];
  public columns = [
    { name: "ID", prop: "ID" },
    { name: "MedicineName", prop: "MedicineName" },
    { name: "MedicineQuantity", prop: "MedicineQuantity" },
    { name: "MedicinePrice", prop: "MedicinePrice" }
  ];
  selectedProduct: any = null;
  QuantityValue: number
  cartItems: any[] = [];
  indexvalues: any[] = [];
  selectedOrder: any = null; // To hold the selected order details
  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    
    // this.rows = map((order, index) => ({
    //   ID: index + 1,
    //   MedicineName: order["mediname"],
    //   MedicineQuantity: order["MediQuanti"],
    //   MedicinePrice: order["MediPrice"],
    // }));

    // this.indexvalues = response['report']; // Populate indexvalues for order selection
    // this.cartItems.push({
    //   id: 1,
    //   name: 'Test Medicine',
    //   quantity: 2,
    //   price: 150,
    //   total: 300
    // });
  }

  openModal(content: any, product: any) {
    this.selectedProduct = product;
    this.modalService.open(content);
  }

  addToCart(quantity: number) {
  if (this.selectedProduct) { // Ensure a product is selected
    const cartItem = {
      id: this.cartItems.length + 1,  // Incremental ID for each cart item
      name: this.selectedProduct.name,
      quantity: quantity,
      price: this.selectedProduct.price,
      total: this.selectedProduct.price * quantity,
      code: this.selectedProduct.code
    };
    this.cartItems.push(cartItem);  // Add the item to the cart
    this.cd.detectChanges(); // Ensure the view updates
    console.log(this.cartItems);  // Check the cart in the console
  } else {
    console.error('No product selected to add to cart');
  }
}
}


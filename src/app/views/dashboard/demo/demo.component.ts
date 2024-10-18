import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from "moment";

interface Product {
  id: number;
  name: string;
  price: number;
  code: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent implements OnInit {
  rows: any[] = [];
  columns = [{ prop: 'name' }, { prop: 'quantity' }, { prop: 'price' }, {prop: 'total'}];

  // Define properties to hold medicine data
  medicines: Product[] = [
    { id: 1, name: "Benzonatate", price: 220, code: "MED001" },
    { id: 2, name: "Benadryl", price: 150, code: "MED002" },
    { id: 3, name: "Paracetamol", price: 10, code: "MED003" }
  ];

  injections: Product[] = [
    { id: 1, name: "Benzonatate Injection", price: 30, code: "INJ001" },
    { id: 2, name: "Benadryl Injection", price: 80, code: "INJ002" },
    { id: 3, name: "Paracetamol Injection", price: 60, code: "INJ003" }
  ];

  Syrupts: Product[] = [
    { id: 1, name: "Benzonatate Syrupt", price: 250, code: "SYP001" },
    { id: 2, name: "Dry Cough Syrupt", price: 180, code: "SYP002" },
    { id: 3, name: "Paracetamol Syrupt", price: 104, code: "SYP003" }
  ];

  PainReliefs: Product[] = [
    { id: 1, name: "Benzonatate PainRelief", price: 20, code: "PRE001" },
    { id: 2, name: "Benadryl PainRelief", price: 50, code: "PRE002" },
    { id: 3, name: "Paracetamol PainRelief", price: 12, code: "PRE003" }
  ];

  paymentType = [
    { id: 1, name: "Cash"},
    { id: 2, name: "Card"},
    { id: 3, name: "UPI"}
  ]

  public cartItems: any[] = [];
  selectedProduct: any = null;
  public cartItemsJson: any[] = [];
  selectedPaymentType: any = null;
  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Initialize the cartItems from a JSON data structure
    this.cartItemsJson = [
 
    ];
  
    console.log("Table Data",this.cartItems)
  }

  openModal(content: any, product: any) {
    this.selectedProduct = product;
    this.modalService.open(content);
  }

  addToCart(quantity: number) {
    if (this.selectedProduct && quantity > 0) {
      const cartItem = {
        id: this.cartItems.length + 1,
        name: this.selectedProduct.name,
        quantity: quantity,
        price: this.selectedProduct.price,
        total: this.selectedProduct.price * quantity,
        code: this.selectedProduct.code
      };
  
      // Add the item to the cart
      this.cartItems.push(cartItem); 
  
      // Ensure the view updates
      this.cd.detectChanges(); 
  
      // Update cartItemsJson with a new copy of cartItems
      this.cartItemsJson = [...this.cartItems];  // or use this.cartItems.slice()
  
      // Check the cart in the console
      console.log("Initial Items", this.cartItems); 
      console.log("Final cartItemsJson", this.cartItemsJson);
    } else {
      console.error('Invalid quantity. Please enter a positive number.');
    }
  }
  

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.total, 0);
  }

  selectPayment(payment: any) {
    this.selectedPaymentType = payment; // Store the selected payment type
    
    // Generate the final order JSON structure
    const orderJson = {
      cartItems: this.cartItemsJson,  // Keep the existing cart items array
      paymentTypeId: payment.id,  // Add the selected payment type ID
      OrderedDate: moment().format('YYYY-MM-DD'),// Get the current date
      OrderedDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),// Get the current date and time
      UpdatedDate:   moment().format('YYYY-MM-DD'),// Updated date (same as OrderedDate)
      UpdatedDateTime:  moment().format('YYYY-MM-DD HH:mm:ss') // Updated date and time (same as OrderedDateTime)
    };
  
    // Log the final order JSON structure
    console.log('Selected Payment ID:', payment.id);
    console.log('Final Order JSON:', orderJson);
  }
  
  
}

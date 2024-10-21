import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as moment from "moment";
import { SearchService } from 'src/app/shared/services/search.service';

interface Product {
  id: number;
  name: string;
  price: number;
  code: string;
  tax1?: string;  // Optional, only for products with specific tax rates
  tax2?: string;  // Optional, only for products with specific tax rates
  inclusive: boolean; 
  location: string;
  stockId: number;
  productId:number;
  ExpireDate: Date;
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
    { id: 1, name: "Benzonatate", price: 220, code: "MED001", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block A 1Selfs", stockId: 101, productId: 201, ExpireDate: new Date('2025-01-01') },
    { id: 2, name: "Benadryl", price: 150, code: "MED002", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block A 2Selfs", stockId: 102, productId: 202, ExpireDate: new Date('2025-06-01') },
    { id: 3, name: "Paracetamol", price: 10, code: "MED003", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block A 3Selfs", stockId: 103, productId: 203, ExpireDate: new Date('2024-12-01') },
    { id: 4, name: "Ibuprofen", price: 12, code: "MED004", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block A 1Selfs", stockId: 104, productId: 201, ExpireDate: new Date('2026-03-01') }
  ];

  injections: Product[] = [
    { id: 1, name: "Benzonatate Injection", price: 30, code: "INJ001", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block B 1Selfs", stockId: 201, productId: 301, ExpireDate: new Date('2025-07-01') },
    { id: 2, name: "Benadryl Injection", price: 80, code: "INJ002", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block B 2Selfs", stockId: 202, productId: 302, ExpireDate: new Date('2025-08-01') },
    { id: 3, name: "Paracetamol Injection", price: 60, code: "INJ003", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block B 3Selfs", stockId: 203, productId: 303, ExpireDate: new Date('2024-11-01') }
  ];

  Syrupts: Product[] = [
    { id: 1, name: "Benzonatate Syrupt", price: 250, code: "SYP001", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block C 1Selfs", stockId: 301, productId: 401, ExpireDate: new Date('2026-01-01') },
    { id: 2, name: "Dry Cough Syrupt", price: 180, code: "SYP002", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block C 2Selfs", stockId: 302, productId: 402, ExpireDate: new Date('2025-02-01') },
    { id: 3, name: "Paracetamol Syrupt", price: 104, code: "SYP003", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block C 3Selfs", stockId: 303, productId: 403, ExpireDate: new Date('2024-10-01') }
  ];

  PainReliefs: Product[] = [
    { id: 1, name: "Benzonatate PainRelief", price: 20, code: "PRE001", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block D 1Selfs", stockId: 401, productId: 501, ExpireDate: new Date('2025-03-01') },
    { id: 2, name: "Benadryl PainRelief", price: 50, code: "PRE002", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block D 2Selfs", stockId: 402, productId: 502, ExpireDate: new Date('2026-04-01') },
    { id: 3, name: "Paracetamol PainRelief", price: 12, code: "PRE003", tax1: "2.5%", tax2: "2.5%", inclusive: true, location: "Block D 3Selfs", stockId: 403, productId: 503, ExpireDate: new Date('2024-09-01') }
  ];

  paymentType = [
    { id: 1, name: "Cash"},
    { id: 2, name: "Card"},
    { id: 3, name: "UPI"}
  ]

  filteredProducts: Product[] = [];
  public cartItems: any[] = [];
  selectedProduct: any = null;
  public cartItemsJson: any[] = [];
  selectedPaymentType: any = null;
  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef,public searchService: SearchService) {}

  ngOnInit(): void {
    // Initialize the cartItems from a JSON data structure
    this.cartItemsJson = [];
    console.log("Table Data",this.cartItems)
  }

  openModal(content: any, product: any) {
    this.selectedProduct = product;
    this.modalService.open(content);
  }

  addToCart(quantity: number) {
    if (this.selectedProduct && quantity > 0) {
      const taxRate1 = parseFloat(this.selectedProduct.tax1) / 100; // Convert percentage to decimal
      const taxRate2 = parseFloat(this.selectedProduct.tax2) / 100; // Convert percentage to decimal
        
        const totalTax = (this.selectedProduct.price * taxRate1 + this.selectedProduct.price * taxRate2) * quantity;
        const totalPriceWithTax = (this.selectedProduct.price * quantity) + totalTax;
      const cartItem = {
            id: this.cartItems.length + 1,
            name: this.selectedProduct.name,
            quantity: quantity,
            price: this.selectedProduct.price,
            // total: totalPriceWithTax, // Set the total price with tax
            code: this.selectedProduct.code,
            tax1: totalTax * taxRate1, // Amount of tax1
            tax2: totalTax * taxRate2, // Amount of tax2
            totalamount:  quantity * this.selectedProduct.price,
      }
  
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
  

  getTotalPriceWithoutTax() {
    // Return 0 if cartItemsJson is empty
    if (this.cartItemsJson.length === 0) {
        return 0;
    }
    return this.cartItemsJson.reduce((total, item) => total + (item.price * item.quantity), 0);
}

getTotalTax() {
    // Return 0 if cartItemsJson is empty
    if (this.cartItemsJson.length === 0) {
        return 0;
    }
    return this.cartItemsJson.reduce((total, item) => total + (parseFloat(item.tax1) + parseFloat(item.tax2)), 0);
}

getSubtotal() {
    // Return 0 if cartItemsJson is empty
    if (this.cartItemsJson.length === 0) {
        return 0;
    }
    return this.getTotalPriceWithoutTax() + this.getTotalTax();
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
    this.cartItemsJson = [];  // This clears the cart
    this.cartItems = []; // This clears the cart
  } 

  filterProducts(searchTerm: string) {
    const term = searchTerm.toLowerCase(); // Convert search term to lowercase
    this.filteredProducts = [
      ...this.medicines,
      ...this.injections,
      ...this.Syrupts,
      ...this.PainReliefs
    ].filter(product => product.name.toLowerCase().includes(term)); // Filter products by name
  }
}

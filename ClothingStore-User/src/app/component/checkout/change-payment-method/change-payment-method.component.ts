import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-payment-method',
  templateUrl: './change-payment-method.component.html',
  styleUrls: ['./change-payment-method.component.css']
})
export class ChangePaymentMethodComponent implements OnInit {
  allTransaction:any
  isChoose:boolean=false
  transactionId:any
  transactionName=""

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePaymentMethodComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private transactionService: TransactionService,) { }

  ngOnInit(): void {
     
    this.getData()

  }
  getData()
  {
    this.transactionService.getAllTransaction().subscribe(res=>{
      this.allTransaction=res
      this.allTransaction=this.allTransaction.data
      for (let i = 0; i < this.allTransaction.length; i++) {
        this.allTransaction[i].checked = false 
      }
    })
  }
  showOptions($event:any): void {
    this.isChoose=false
  
    this.transactionId=$event.source.id
    for (let i = 0; i < this.allTransaction.length; i++) {
      if(i!=$event.source.id)
      this.allTransaction[i].checked = false 
    }
    for (let i = 0; i < this.allTransaction.length; i++) {
      if(this.allTransaction[i].checked ==true )
      
      {
        this.isChoose=true
        break
      }
    }
    
}
   
  chooseTransaction()
  {
    for (let i = 0; i < this.allTransaction.length; i++) {
      if(this.allTransaction[i].checked==true)
     {
       
      this.transactionName=this.allTransaction[i].name
      break;
     }
    }
      
      this.data ="Thanh toán qua "+  this.allTransaction[parseInt(this.transactionId)].name
       this.dialogRef.close(this.data)
   
  }
}

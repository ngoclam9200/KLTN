import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { StatusOrderService } from 'src/app/services/status-order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private statusOrderService: StatusOrderService, private orderService: OrderService, private orderDetailService: OrderDetailService) { }
  allStatus: any
  allOrder: any
  allProduct:any=[]
  prod:any
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.statusOrderService.getAllStatus().subscribe(res => {
       this.allStatus = res
      this.allStatus = this.allStatus.data

    })

  }
  getOrder($event: any) {
     let id = this.allStatus[$event.index].id
    if (id == "1") {
      this.orderService.getOrderWaitConfirm(localStorage.getItem("userId"))
        .subscribe(res => {
           this.allOrder = res
           console.log(res)
          this.allOrder = this.allOrder.data
          
          this.allProduct=[]
          for(let i=0 ; i< this.allOrder.length; i++)
          {
            this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res=>{
              this.prod=res
               this.prod=this.prod.data

              for(let i=0; i<this.prod.length;i++)
              {
                this.allProduct.push(this.prod[i])
              }
              console.log(this.allProduct)
             
             
            })
          }
           
        })
    }
    if (id == "2") {
      this.orderService.getOrderDelivering(localStorage.getItem("userId"))
        .subscribe(res => {
           this.allOrder = res
          this.allOrder = this.allOrder.data
          for(let i=0 ; i< this.allOrder.length; i++)
          {
            this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res=>{
              this.prod=res
               this.prod=this.prod.data
              this.allProduct=[]
              for(let i=0; i<this.prod.length;i++)
              {
                this.allProduct.push(this.prod[i])
              }
             
             
            })
          }
        })
    }
    if (id == "3") {
      this.orderService.getOrderDelivered(localStorage.getItem("userId"))
        .subscribe(res => {
           this.allOrder = res
          this.allOrder = this.allOrder.data
          for(let i=0 ; i< this.allOrder.length; i++)
          {
            this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res=>{
              this.prod=res
               this.prod=this.prod.data
              this.allProduct=[]
              for(let i=0; i<this.prod.length;i++)
              {
                this.allProduct.push(this.prod[i])
              }
             
             
            })
          }
        })

    }
    if (id == "4") {
      this.orderService.getOrderCancle(localStorage.getItem("userId"))
        .subscribe(res => {
           this.allOrder = res
          this.allOrder = this.allOrder.data
          for(let i=0 ; i< this.allOrder.length; i++)
          {
            this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res=>{
              this.prod=res
               this.prod=this.prod.data
              this.allProduct=[]
              for(let i=0; i<this.prod.length;i++)
              {
                this.allProduct.push(this.prod[i])
              }
             
             
            })
          }
        })
    }


  }

  estimateDelivery(date: any) {
    var day = new Date(date)
   
    var estimate = day.getFullYear() + "-" + (day.getMonth() + 1).toString() + "-" + (day.getDate() + 3).toString()
    return estimate

  }
}

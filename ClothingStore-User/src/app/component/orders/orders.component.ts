import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { StatusOrderService } from 'src/app/services/status-order.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private statusOrderService: StatusOrderService, private route: ActivatedRoute, private router: Router,
    private orderService: OrderService, private orderDetailService: OrderDetailService) { }
  allStatus: any
  allOrder: any
  allProduct: any = []
  prod: any
  isLoading = true
  statusOrder: any
  id: any
  ngOnInit(): void {

    this.getData()

  }
  getData() {
     this.statusOrderService.getAllStatus().subscribe(res => {
      this.allStatus = res
      this.allStatus = this.allStatus.data
      this.statusOrder = this.route.snapshot.paramMap.get('status');
      if (this.statusOrder == "wait-confirm") {
        this.id = 0;
         this.orderService.getOrderWaitConfirm(localStorage.getItem("userId"))
          .subscribe(res => {
             
            
            this.allOrder = res
            this.allOrder = this.allOrder.data

            this.allProduct = []
            for (let i = 0; i < this.allOrder.length; i++) {
              this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res => {
                this.prod = res
                this.prod = this.prod.data

                for (let i = 0; i < this.prod.length; i++) {
                  this.allProduct.push(this.prod[i])
                }


              })
             
              
            }
            this.isLoading = false

          })

      }
      if (this.statusOrder == "delivering") {
 
        this.id = 1;
        this.orderService.getOrderDelivering(localStorage.getItem("userId"))
          .subscribe(res => {
            this.allOrder = res
            this.allOrder = this.allOrder.data
            for (let i = 0; i < this.allOrder.length; i++) {
              this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res => {
                this.prod = res
                this.prod = this.prod.data
                this.allProduct = []
                for (let i = 0; i < this.prod.length; i++) {
                  this.allProduct.push(this.prod[i])
                }


              })
            }
            this.isLoading = false
          })
      }
      if (this.statusOrder == "delivered") {
        this.id = 2;
        this.orderService.getOrderDelivered(localStorage.getItem("userId"))
          .subscribe(res => {
            this.allOrder = res
            this.allOrder = this.allOrder.data
            for (let i = 0; i < this.allOrder.length; i++) {
              this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res => {
                this.prod = res
                this.prod = this.prod.data
                this.allProduct = []
                for (let i = 0; i < this.prod.length; i++) {
                  // this.allProduct.push(this.prod[i])
                  this.allProduct.forEach((c) => {
                    if (!this.allProduct.includes(c)) {
                        this.allProduct.push(c);
                    }})
                }


              })
            }
            this.isLoading = false
          })

      }
      if (this.statusOrder == "cancle") {
        this.id = 3;
        this.orderService.getOrderCancle(localStorage.getItem("userId"))
          .subscribe(res => {
            this.allOrder = res
            this.allOrder = this.allOrder.data
            for (let i = 0; i < this.allOrder.length; i++) {
              this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res => {
                this.prod = res
                this.prod = this.prod.data
                this.allProduct = []
                for (let i = 0; i < this.prod.length; i++) {
                  this.allProduct.push(this.prod[i])
                }


              })
            }
            this.isLoading = false
          })
      }

    })

  }
  getOrder($event: any) {

     
    this.isLoading = true
    this.allOrder = []
    this.allProduct = []
    let id = this.allStatus[$event.index].id

    if (id == "1" && this.id!=0) {
       this.router.navigate(['orders/wait-confirm'])
      this.id = 0
      this.orderService.getOrderWaitConfirm(localStorage.getItem("userId")).subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data

          this.allProduct = []
          for (let i = 0; i < this.allOrder.length; i++) {
            this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res => {
              this.prod = res
              this.prod = this.prod.data

              for (let i = 0; i < this.prod.length; i++) {
                this.allProduct.push(this.prod[i])
              }


            })
          }
          this.isLoading = false

        })

    }
    if (id == "2") {
      this.router.navigate(['orders/delivering'])
      this.id = 1
      this.orderService.getOrderDelivering(localStorage.getItem("userId"))
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          for (let i = 0; i < this.allOrder.length; i++) {
            this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res => {
              this.prod = res
              this.prod = this.prod.data
              this.allProduct = []
              for (let i = 0; i < this.prod.length; i++) {
                this.allProduct.push(this.prod[i])
              }


            })
          }
          this.isLoading = false
        })
    }
    if (id == "3") {
       this.router.navigate(['orders/delivered'])
      this.id = 2
      this.orderService.getOrderDelivered(localStorage.getItem("userId"))
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          for (let i = 0; i < this.allOrder.length; i++) {
            this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res => {
              this.prod = res
              this.prod = this.prod.data
              // this.allProduct = []
              for (let i = 0; i < this.prod.length; i++) {
                this.allProduct.push(this.prod[i])
              }


            })
          }
          this.isLoading = false
        })

    }
    if (id == "4") {
       this.router.navigate(['orders/cancle'])
      this.id = 3
      this.orderService.getOrderCancle(localStorage.getItem("userId"))
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          for (let i = 0; i < this.allOrder.length; i++) {
            this.orderDetailService.getOrderDetailByOrderId(this.allOrder[i].id).subscribe(res => {
              this.prod = res
              this.prod = this.prod.data
              this.allProduct = []
              for (let i = 0; i < this.prod.length; i++) {
                this.allProduct.push(this.prod[i])
              }


            })
          }
          this.isLoading = false
        })
    }


  }

  estimateDelivery(date: any) {
    var day = new Date(date)

    var estimate = day.getFullYear() + "-" + (day.getMonth() + 1).toString() + "-" + (day.getDate() + 3).toString()
    return estimate

  }
  cancleOrder(id) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn hủy đơn hàng?',
      text: "Đơn hàng sẽ bị hủy , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hủy đơn hàng'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancleOrder({id:id}).subscribe(res => {
          Swal.fire(
            'Đã hủy đơn hàng',
            'Đơn hàng đã bị hủy',
            'success'
          )
          this.getData()
        })




      }
    })

  }
}

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  openAlertDelete()
  {
    Swal.fire({
      title: 'Xóa sản phẩm này?',
      text: "Sản phẩm này sẽ không còn trong giỏ hàng!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa !'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Đã xóa !',
          'Sản phẩm đã được xóa.',
          'success'
        )
      }
    })
  }
}

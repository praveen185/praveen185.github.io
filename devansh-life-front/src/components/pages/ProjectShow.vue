<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Customer Purchase History</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-outline-info float-right" to="/"
          >View All Customers
        </router-link>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="history in purchaseHistory" :key="history.orderId">
              <td>{{ history.orderDate }}</td>
              <td>{{ history.productId }}</td>
              <td>{{ history.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";
import Swal from "sweetalert2";

export default {
  name: "Purchase History",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      purchaseHistory: [],
    };
  },
  created() {
    const id = this.$route.params.id;
    axios
      .get(
        `http://devansh-customer-be.eu-north-1.elasticbeanstalk.com/customer/v1/purchaseHistory/${id}`
      )
      .then((response) => {
        this.purchaseHistory = response.data;
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "An Error Occured!",
          showConfirmButton: false,
          timer: 1500,
        });
        return error;
      });
  },
  methods: {},
};
</script>

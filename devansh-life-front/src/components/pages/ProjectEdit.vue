<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Make Daily Entry</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-outline-info float-right" to="/"
          >View All Customers
        </router-link>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label>Select Product</label>
            <select
              class="form-control"
              v-model="entry.productKey"
              id="products"
            >
              <option
                v-for="prod in products"
                v-bind:value="prod.name"
                :key="prod.slug"
              >
                {{ prod.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Purchase Date</label>
            <VueDatePicker
              v-model="entry.purchaseDate"
              required
              id="todaysDate"
              format="yyyy-MM-dd"
            />
          </div>
          <div class="form-group">
            <label for="">Product Quantity</label>
            <input
              v-model="entry.quantity"
              required
              type="text"
              id="qty"
              class="form-control"
            />
          </div>
          <div></div>

          &nbsp;&nbsp;
          <button
            @click="handleSave()"
            :disabled="isSaving"
            type="button"
            class="btn btn-outline-primary mt-3"
          >
            Save Entry
          </button>
        </form>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  name: "ProjectEdit",
  components: {
    LayoutDiv,
    VueDatePicker,
  },
  data() {
    return {
      entry: {
        productKey: "",
        purchaseDate: ref(new Date()),
        quantity: "",
      },
      isSaving: false,
      products: "",
      customer: "",
    };
  },
  created() {
    const id = this.$route.params.id;
    axios
      .get(
        `http://devansh-customer-be.eu-north-1.elasticbeanstalk.com/customer/v1/${id}`
      )
      .then((response) => {
        this.customer = response.data;
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "An Error Occured while fetching customer detail!",
          showConfirmButton: false,
          timer: 1500,
        });
        return error;
      });
    axios
      .get(
        `http://devansh-product-be.eu-north-1.elasticbeanstalk.com/product/v1/products`
      )
      .then((response) => {
        this.products = response.data;
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "An Error Occured while fetching product list!",
          showConfirmButton: false,
          timer: 1500,
        });
        return error;
      });
  },
  methods: {
    handleSave() {
      this.isSaving = true;
      axios
        .post(
          `http://devansh-customer-be.eu-north-1.elasticbeanstalk.com/customer/v1/daily-entry/${this.customer.customerId}`,
          this.entry
        )
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Today's entry saved successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isSaving = false;
          this.$router.push("/");
          return response;
        })
        .catch((error) => {
          this.isSaving = false;
          Swal.fire({
            icon: "error",
            title: "An Error Occured!",
            showConfirmButton: false,
            timer: 1500,
          });
          return error;
        });
    },
  },
};
</script>

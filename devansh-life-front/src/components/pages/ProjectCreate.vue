<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Add New Customer</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-outline-info float-right" to="/"
          >View All Customers
        </router-link>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              v-model="customer.firstName"
              type="text"
              class="form-control"
              id="firstNameRegister"
              name="firstNameRegister"
            />
          </div>
          <div class="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              v-model="customer.lastName"
              type="text"
              class="form-control"
              id="lastNameRegister"
              name="lastNameRegister"
            />
          </div>
          <div class="form-group">
            <label htmlFor="emailId">Email Address</label>
            <input
              v-model="customer.emailId"
              type="text"
              class="form-control"
              id="emailRegister"
              name="emailRegister"
            />
          </div>
          <div class="form-group">
            <label htmlFor="mobileNo">Mobile Number</label>
            <input
              v-model="customer.mobileNo"
              type="text"
              class="form-control"
              id="mobileRegister"
              name="mobileRegister"
            />
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input
              v-model="customer.password"
              type="text"
              class="form-control"
              id="passwordRegister"
              name="passwordRegister"
            />
          </div>
          <div class="form-group">
            <label htmlFor="address.locality">Locality</label>
            <input
              v-model="customer.address.locality"
              type="text"
              class="form-control"
              id="localityRegister"
              name="localityRegister"
            />
          </div>
          <div class="form-group">
            <label htmlFor="address.city">City</label>
            <input
              v-model="customer.address.city"
              type="text"
              class="form-control"
              id="cityRegister"
              name="cityRegister"
            />
          </div>
          <button
            @click="handleSave()"
            :disabled="isSaving"
            type="button"
            class="btn btn-outline-primary mt-3"
          >
            Save Customer
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

export default {
  name: "CustomerCreate",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      customer: {
        firstName: "",
        lastName: "",
        emailId: "",
        mobileNo: "",
        password: "",
        address: {
          locality: "",
          city: "",
        },
      },
      isSaving: false,
    };
  },
  methods: {
    handleSave() {
      this.isSaving = true;
      alert(this.customer);
      axios
        .post(
          "http://devansh-customer-be.eu-north-1.elasticbeanstalk.com/customer/v1/customer",
          this.customer
        )
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Customer saved successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isSaving = false;
          this.customer.firstName = "";
          this.customer.lastName = "";
          this.customer.emailId = "";
          this.customer.password = "";
          this.customer.mobileNo = "";
          this.customer.address.locality = "";
          this.customer.address.city = "";
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

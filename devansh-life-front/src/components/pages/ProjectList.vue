<template>
  <layout-div>
    <div class="container">
      <h2 class="text-center mt-5 mb-3">Devansh Dairy Automation</h2>
      <div class="card">
        <div class="card-header">
          <router-link to="/create" class="btn btn-outline-primary"
            >Create New Customer
          </router-link>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Address</th>
                <th width="240px">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.customerId">
                <td>
                  {{ customer.customerId }}
                </td>
                <td>{{ customer.firstName }} {{ customer.lastName }}</td>
                <td>
                  {{ customer.mobileNo }}
                </td>
                <td>{{ customer.emailId }}</td>

                <td v-for="address in customer.address">
                  <v-if address.length></v-if>
                  <v-else>{{ address.locality }} {{ address.city }}</v-else>
                </td>

                <td>
                  <router-link
                    :to="`/show/${customer.customerId}`"
                    class="btn btn-outline-info mx-1"
                  >
                    View
                  </router-link>
                  <router-link
                    :to="`/edit/${customer.customerId}`"
                    class="btn btn-outline-success mx-1"
                    >Make Entry</router-link
                  >
                  <!--<button
                    @click="handleDelete(customer.customerId)"
                    className="btn btn-outline-danger mx-1"
                  >
                    D
                  </button>-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Modal @close="toggleModal" :modalActive="modalActive">
        <div class="modal-content">
          <h3 class="text-info">Make User Daily Entry</h3>
          <form>
            <div class="form-group">
              <label>Select Product</label>
              <select
                class="form-control"
                v-model="products.productId"
                id="products"
              >
                <option
                  v-for="prod in products"
                  v-bind:value="prod.slug"
                  :key="prod.slug"
                >
                  {{ prod.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Purchase Date</label>
              <VueDatePicker v-model="date" required id="purchaseDate" />
            </div>
            <div class="form-group">
              <label for="">Product Qty</label>
              <input
                v-bind:value="product.qty"
                required
                type="text"
                id="qty"
                class="form-control"
              />
            </div>
            <div></div>
            <button
              v-on:click.prevent="toggleModal"
              class="btn btn-secondary mr-1"
            >
              Cancel
            </button>
            &nbsp;&nbsp;
            <button
              v-on:click="handleSave(customer.customerId)"
              type="submit"
              class="btn btn-primary"
            >
              Save
            </button>
          </form>
        </div>
      </Modal>
    </div>
  </layout-div>
</template>

<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";
import Swal from "sweetalert2";
import Modal from "@/components/Modal.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
export default {
  name: "ProjectList",
  components: {
    LayoutDiv,
    Modal,
    VueDatePicker,
  },
  setup() {
    const modalActive = ref(false);
    const toggleModal = (id) => {
      modalActive.value = !modalActive.value;
      axios
        .get(
          `http://devansh-customer-be.eu-north-1.elasticbeanstalk.com/customer/v1/${id}`
        )
        .then((response) => {
          this.customer = response.data;
          alert("Fetch Customer " + this.customer);
          return response;
        })
        .catch((error) => {
          return error;
        });
    };
    return { modalActive, toggleModal };
  },
  data() {
    return {
      date: new Date(),
      products: [],
      product: "",
      customers: [],
      customer: "",
    };
  },
  async created() {
    this.fetchProjectList();
    await fetch(
      "http://devansh-product-be.eu-north-1.elasticbeanstalk.com/product/v1/products"
    )
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
        console.log("=====================" + JSON.stringify(this.products));
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    fetchProjectList() {
      axios
        .get(
          "http://devansh-customer-be.eu-north-1.elasticbeanstalk.com/customer/v1/customers"
        )
        .then((response) => {
          this.customers = response.data;
          return response;
        })
        .catch((error) => {
          return error;
        });
    },
    handleSave(id) {
      alert("Customer" + this.customer);
      const saveData = JSON.stringify({
        productKey: document.getElementById("products").value,
        purchaseDate: document.getElementById("todaysDate").value,
        quantity: document.getElementById("qty").value,
      });
      alert(saveData);
      axios
        .post(
          `http://devansh-customer-be.eu-north-1.elasticbeanstalk.com//customer/v1/daily-entry/${customerId}`,
          saveData
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
    handleDelete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`/api/projects/${id}`)
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Project deleted successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              this.fetchProjectList();
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
        }
      });
    },
  },
};
</script>

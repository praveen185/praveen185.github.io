<template>
  <div class="container">
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-content">
        <h1>Create Payment Against Bill</h1>
        <p>This is a modal message</p>
      </div>
    </Modal>
    <button @click="toggleModal" type="button">Open Modal</button>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
export default {
  name: "ModalShow",
  components: {
    Modal,
  },
  setup() {
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    return { modalActive, toggleModal };
  },
};
</script>

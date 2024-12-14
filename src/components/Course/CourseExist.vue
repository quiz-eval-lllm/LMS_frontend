<template>
  <div class="course-exist" v-if="show">
    <div class="modal-content">
      <h2>Warning</h2>
      <p>Nama Course sudah pernah digunakan.</p>
      <p>(Notes: Nama Course harus unik)</p>
      <div class="buttons">
        <button @click="closeModal">Mengerti</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.course-exist {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(137, 134, 134, 0.2);
  /* background-color: rgba(128, 128, 128, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0b1c2d;
}
</style>

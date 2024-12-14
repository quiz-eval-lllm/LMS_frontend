<template>
  <div class="success-modal" v-if="show">
    <div class="modal-content">
      <h2>Sukses!</h2>
      <img
        src="../../../public/img/checkList.png"
        alt="checklist image"
        style="width: 100px; height: 100px"
      />
      <p>Perubahan berhasil disimpan!</p>
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
};
</script>

<style scoped>
.success-modal {
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
</style>

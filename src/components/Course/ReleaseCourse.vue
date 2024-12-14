<template>
    <div class="release-course-modal" v-if="show">
      <div class="modal-content">
        <h2>Warning</h2>
        <p>Apakah anda yakin ingin merilis course ini?</p>
        <div class="buttons">
          <button @click="releaseCourse" class="release-button">Ya, Rilis</button>
          <button @click="closeModal">Batal</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      slugName: {
        type: String, 
        required: true, 
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      async releaseCourse() {
        try {
          const token = localStorage.getItem("token");
          await this.$axios.get(`api/v1/admin/course/release/${this.slugName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          this.$emit("release-course", this.courseId);
          this.closeModal();
        } catch (error) {
          console.error("Error releasing course:", error);
        }
      },
      closeModal() {
        // Emit an event to inform the parent component to close the modal
        this.$emit("close-modal");
      },
    },
  };
  </script>
  
  <style scoped>
  .release-course-modal {
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
  
  .release-button {
    background-color: rgb(125, 125, 239);
  }
  </style>
  
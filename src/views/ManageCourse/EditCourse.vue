<template>
  <div class="edit-course">
    <div class="navigation-pane">
      <h2>Navigation</h2>
      <div
        v-for="(subcourse, subIndex) in subcourses"
        :key="subIndex"
        class="nav-tile"
      >
        <div @click="scrollToSubcourse(subIndex)" class="subcourse-tile">
          <p v-if="subcourse.name">
            {{ subcourse.name }}
          </p>
          <p v-else>Subcourse {{ subIndex + 1 }}</p>
        </div>

        <ul>
          <li
            v-for="(material, matIndex) in subcourse.listMaterial"
            :key="matIndex"
            class="material-tile"
            @click="scrollToMaterial(subIndex, matIndex)"
          >
            <div>
              <h4 v-if="material.name">{{ material.name }}</h4>
              <h4 v-else>Material {{ matIndex + 1 }}</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="content-pane">
      <h1 ref="editCourseTitle">Edit Course</h1>
      <form @submit.prevent="editCourse">
        <div class="form-group">
          <label for="name">Nama:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="description">Deskripsi:</label>
          <!-- <textarea id="description" v-model="description" required></textarea> -->
          <QuillEditor
            id="description"
            theme="snow"
            contentType="html"
            v-model:content="description"
            :options="editorOptions"
            required
          ></QuillEditor>
        </div>
        <div class="form-group">
          <label for="price">Harga:</label>
          <div class="input-group">
            <span class="input-group-text">Rp.</span>
            <input
              type="number"
              id="price"
              v-model.number="price"
              required
              class="form-control"
            />
          </div>
        </div>

        <div class="form-group">
          <!-- <label for="image">Image:</label>
          <input
            type="file"
            id="image"
            ref="fileInput"
            @change="handleFileUpload"
            required
            accept="image/*"
            
          />
          <label for="image" class="file-placeholder">{{ image_url ? image_url : 'No file chosen' }}</label> -->
          <label for="image" class="file-label">
            <label for="image">Gambar:</label>
            <input
              type="file"
              id="image"
              ref="fileInput"
              @change="handleFileUpload"
              accept="image/*"
              style="display: none"
            />

            <span class="file-placeholder">
              <span class="file-button">Choose File</span
              >{{
                image && image.name
                  ? image.name.length > 100
                    ? image.name.substring(0, 100) + "..."
                    : image.name
                  : prev_image_url
                  ? prev_image_url.length > 100
                    ? prev_image_url.substring(0, 100) + "..."
                    : prev_image_url
                  : "No file chosen"
              }}</span
            >
          </label>
        </div>
        <div class="subcourses">
          <div
            v-for="(subcourse, subIndex) in subcourses"
            :key="subIndex"
            :ref="`subcourse-${subIndex}`"
            class="subcourse-container"
          >
            <h3>Subcourse {{ subIndex + 1 }}</h3>
            <div class="form-group">
              <label :for="'subcourse-name-' + subIndex">Name:</label>
              <input
                type="text"
                :id="'subcourse-name-' + subIndex"
                v-model="subcourse.name"
                required
              />
            </div>
            <div class="form-group">
              <label :for="'subcourse-description-' + subIndex"
                >Deskripsi:</label
              >
              <!-- <textarea
                  :id="'subcourse-description-' + subIndex"
                  v-model="subcourse.description"
                  required
                ></textarea> -->
              <QuillEditor
                :id="'subcourse-description-' + subIndex"
                theme="snow"
                contentType="html"
                v-model:content="subcourse.description"
                :options="editorOptions"
                required
                style="background-color: white"
              ></QuillEditor>
            </div>
            <div class="materials">
              <div
                v-for="(material, matIndex) in subcourse.listMaterial"
                :key="matIndex"
                :ref="`material-${subIndex}-${matIndex}`"
                class="material-container"
              >
                <h4>Material {{ matIndex + 1 }}</h4>
                <div class="form-group">
                  <label :for="'material-name-' + matIndex">Nama:</label>
                  <input
                    type="text"
                    :id="'material-name-' + matIndex"
                    v-model="material.name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label :for="'material-description-' + matIndex"
                    >Deskripsi:</label
                  >
                  <!-- <textarea
                      :id="'material-description-' + matIndex"
                      v-model="material.description"
                      required
                    ></textarea> -->
                  <QuillEditor
                    :id="'material-description-' + matIndex"
                    theme="snow"
                    contentType="html"
                    v-model:content="material.description"
                    :options="editorOptions"
                    required
                    style="background-color: white"
                  ></QuillEditor>
                </div>
                <div class="form-group">
                  <label :for="'material-type-' + matIndex">Tipe materi:</label>
                  <select
                    :id="'material-type-' + matIndex"
                    v-model="material.type"
                    required
                  >
                    <option value="VIDEO">Video</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                <div class="form-group">
                  <!-- <input
                    type="file"
                    :id="'material-file-' + matIndex"
                    @change="handleMaterialUpload($event, subIndex, matIndex)"
                    required
                    accept="video/*, application/pdf"
                  /> -->
                  <label
                    :for="'material-file-' + subIndex + '-' + matIndex"
                    class="file-label"
                  >
                    <label :for="'material-file-' + subIndex + '-' + matIndex"
                      >Upload file materi:</label
                    >
                    <input
                      type="file"
                      :id="'material-file-' + subIndex + '-' + matIndex"
                      @change="handleMaterialUpload($event, subIndex, matIndex)"
                      accept="video/*, application/pdf"
                      style="display: none"
                    />

                    <span class="file-placeholder">
                      <span class="file-button">Choose File</span
                      >{{
                        material.material && material.material.name
                          ? material.material.name.length > 100
                            ? material.material.name.substring(0, 100) + "..."
                            : material.material.name
                          : material.material_url
                          ? material.material_url.length > 100
                            ? material.material_url.substring(0, 100) + "..."
                            : material.material_url
                          : "No file chosen"
                      }}</span
                    >
                  </label>
                </div>
                <div class="form-group">
                  <label :for="'material-reading-time-' + matIndex"
                    >Lama waktu membaca/menonton materi:</label
                  >
                  <input
                    type="number"
                    :id="'material-reading-time-' + matIndex"
                    v-model.number="material.readingMinute"
                    required
                  />
                </div>
                <!-- <div
                  class="remove-material-button"
                  @click="removeMaterial(subIndex, matIndex)"
                > -->
                <div
                  class="remove-material-button"
                  @click="
                    removeMaterialModal(subIndex, matIndex, material.uuid)
                  "
                >
                  <TrashIcon size="30px" stroke="#fff" />
                  <p>Hapus Materi</p>
                </div>
              </div>
            </div>
            <div class="add-material-button" @click="addMaterial(subIndex)">
              <PlusIcon size="30px" style="padding-right: 10px" fill="#fff" />
              <p>Tambah Materi</p>
            </div>
            <br /><br />
            <!-- <button type="button" @click="removeSubcourse(subIndex)">
                Remove Subcourse
              </button> -->
            <!-- <div
              class="remove-material-button"
              @click="removeSubcourse(subIndex)"
            > -->
            <div
              class="remove-material-button"
              @click="removeSubcourseModal(subIndex, subcourse.uuid)"
            >
              <TrashIcon size="30px" stroke="#fff" />
              <p>Hapus Subcourse</p>
            </div>
          </div>
          <div class="subcourse-separator"></div>
        </div>
        <!-- <button type="button" @click="addSubcourse">Add Subcourse</button> -->
        <div class="add-material-button" @click="addSubcourse">
          <PlusIcon size="30px" style="padding-right: 10px" fill="#fff" />
          <p>Tambah Subcourse</p>
        </div>
        <br /><br />
        <!-- <button type="submit" class="btn edit-course-btn">
            Create Course
          </button> -->
        <div class="form-group">
          <label for="exam">Link Ujian:</label>
          <label for="exam">Mohon buat ujian terlebih dahulu di TC Exam. Setelah selesai, masukkan link ujian di sini.</label>
          <input type="text" id="exam" v-model="exam" required />
        </div>
        <button
          type="submit"
          class="btn edit-course-btn"
          :disabled="loading"
          :class="{ disabled: loading }"
        >
          <span v-if="!loading">Edit Course</span>
          <span v-else>
            <i>Loading...</i>
            <!-- <b-spinner label="Loading..."></b-spinner> -->
          </span>
        </button>
      </form>
      <SuccessModal :show="showSuccessModal" />
      <WaitingModal :show="loading" />
      <DeleteModal
        :show="showDeleteModal"
        :itemType="deleteType"
        @delete-modal="remove()"
        @close-modal="closeDeleteModal()"
      />
      <CourseExist :show="courseExistError" @close-modal="closeCourseExist()" />
    </div>
  </div>
</template>

<script>
import TrashIcon from "@/assets/icon/TrashIcon.vue";
import PlusIcon from "@/assets/icon/PlusIcon.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import SuccessModal from "@/components/Course/SuccessModal.vue";
import WaitingModal from "@/components/Course/WaitingModal.vue";
import DeleteModal from "@/components/Course/DeleteModal.vue";
import CourseExist from "@/components/Course/CourseExist.vue";

export default {
  name: "EditCourse",
  components: {
    TrashIcon,
    PlusIcon,
    QuillEditor,
    SuccessModal,
    WaitingModal,
    DeleteModal,
    CourseExist,
  },
  data() {
    return {
      loading: false,
      showSuccessModal: false,
      showDeleteModal: false,
      courseExistError: false,
      deleteID: "",
      deleteType: "",
      deleteSubIndex: -1,
      deleteMatIndex: -1,
      deleteMatUUIDList: [],
      deleteSubUUIDList: [],
      uuid: "",
      oldName: "",
      name: "",
      description: "",
      price: 0,
      image: null,
      image_url: "",
      image_token: "",
      exam: "",
      prev_image_url: "",
      subcourses: [{ name: "", description: "", listMaterial: [] }],
      editorOptions: {
        placeholder: "Enter text here...",
      },
    };
  },
  created() {
    this.checkIsAdmin();
    this.getCourse();
  },
  methods: {
    async getCourse() {
      try {
        const slugName = this.$route.params.slugName;
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/learn/${slugName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.uuid = response.data.data.uuid;
        this.name = response.data.data.name;
        this.oldName = response.data.data.name;
        this.description = response.data.data.description;
        this.price = response.data.data.price;
        this.image_url = response.data.data.image_url;
        this.image_token = response.data.data.image_token;
        this.prev_image_url = response.data.data.image_url;
        this.subcourses = response.data.data.listSubCourse;
        this.exam = response.data.data.examLink
      } catch (error) {
        if (error.code === "ERR_BAD_REQUEST") {
          this.$router.push("/404");
        }
      }
    },
    checkIsAdmin() {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const role = payload.sub.split("|")[1];
        if (role !== "ADMIN") {
          this.$router.push("/");
        }
      } else {
        this.$router.push("/");
      }
    },
    async editCourse() {
      if (this.name !== this.oldName) {
        if ((await this.checkCourseExist(this.name)) === true) {
          return;
        }
      }

      for (let mat of this.deleteMatUUIDList) {
        await this.deleteMaterial(mat);
      }
      for (let sub of this.deleteSubUUIDList) {
        await this.deleteSubcourse(sub);
      }
      this.loading = true;
      await this.uploadImage();
      await this.uploadMaterials();

      // Collect all subcourses data
      const subcoursesData = this.subcourses.map((subcourse) => ({
        uuid: subcourse.uuid,
        name: subcourse.name,
        description: subcourse.description,
        materials: subcourse.listMaterial.map((material) => ({ ...material })),
      }));

      const currentCourse = {
        uuid: this.uuid,
        name: this.name,
        description: this.description,
        price: this.price,
        image_url: this.image_url,
        image_token: this.image_token,
        subcourses: subcoursesData,
        examLink: this.exam
      };

      try {
        const token = localStorage.getItem("token");
        await this.$axios.put(
          `api/v1/admin/course/update/${currentCourse.uuid}`,
          currentCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error editing course:", error);
        alert("Failed to edit course. Please try again.");
        this.loading = false;
        return
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.loading = false;
      this.showSuccessModal = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.$router.push("/manage-course");
    },
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    async uploadImage() {
      if (this.image) {
        const file = this.image;
        const token = localStorage.getItem("token");
        try {
          const formData = new FormData();
          formData.append("media_file", file);
          formData.append("delete_token", this.image_token);
          formData.append("material_url", this.image_url);

          const response = await this.$axios.post(
            `api/v1/admin/upload-media`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          this.image_url = response.data.original_media_url;
          this.image_token = response.data.friendly_token;
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    },
    async uploadMaterials() {
      for (const subcourse of this.subcourses) {
        for (const material of subcourse.listMaterial) {
          const file = material.material;
          if (file) {
            const token = localStorage.getItem("token");
            try {
              const formData = new FormData();
              formData.append("media_file", file);
              formData.append("delete_token", material.token);
              formData.append("material_url", material.material_url);

              const response = await this.$axios.post(
                `api/v1/admin/upload-media`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
                  },
                }
              );
              if (material.type === "VIDEO") {
                material.material_url = response.data.url;
              } else {
                material.material_url = response.data.original_media_url;
              }
              material.token = response.data.friendly_token;
            } catch (error) {
              console.error("Error uploading material:", error);
            }
          }
        }
      }
    },
    async deleteSubcourse(ID) {
      try {
        const token = localStorage.getItem("token");
        await this.$axios.delete(`api/v1/admin/subcourse/delete/${ID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    },
    async deleteMaterial(ID) {
      try {
        const token = localStorage.getItem("token");
        await this.$axios.delete(`api/v1/admin/material/delete/${ID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    },
    openCourseExist() {
      this.courseExistError = true;
    },
    closeCourseExist() {
      this.courseExistError = false;
    },
    async checkCourseExist(courseName) {
      try {
        const token = localStorage.getItem("token");
        await this.$axios.get(
          `api/v1/admin/course/unique/${courseName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return false
      } catch (error) {
        this.openCourseExist();
        return true
      }
    },
    handleMaterialUpload(event, subIndex, matIndex) {
      this.subcourses[subIndex].listMaterial[matIndex].material =
        event.target.files[0];
    },
    remove() {
      if (this.deleteType === "subcourse") {
        this.removeSubcourse(this.deleteSubIndex);
      } else {
        this.removeMaterial(this.deleteSubIndex, this.deleteMatIndex);
      }
      this.closeDeleteModal();
    },
    removeSubcourseModal(subIndex, subcourseUUID) {
      this.showDeleteModal = true;
      this.deleteType = "subcourse";
      this.deleteSubIndex = subIndex;
      this.deleteID = subcourseUUID;
    },
    removeMaterialModal(subIndex, matIndex, materialUUID) {
      this.showDeleteModal = true;
      this.deleteType = "material";
      this.deleteSubIndex = subIndex;
      this.deleteMatIndex = matIndex;
      this.deleteID = materialUUID;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.deleteID = "";
      this.deleteType = "";
      this.deleteSubIndex = -1;
      this.deleteMatIndex = -1;
    },
    addSubcourse() {
      this.subcourses.push({ name: "", description: "", listMaterial: [] });
    },
    removeSubcourse(index) {
      this.subcourses.splice(index, 1);
      this.deleteSubUUIDList.push(this.deleteID);
    },
    addMaterial(subIndex) {
      this.subcourses[subIndex].listMaterial.push({
        name: "",
        description: "",
        type: "VIDEO",
        material_url: "",
        readingMinute: 0,
      });
    },
    removeMaterial(subIndex, matIndex) {
      this.subcourses[subIndex].listMaterial.splice(matIndex, 1);
      this.deleteMatUUIDList.push(this.deleteID);
    },
    scrollToSubcourse(subIndex) {
      const subcourseElement = this.$refs[`subcourse-${subIndex}`];
      if (subcourseElement && subcourseElement.length > 0) {
        // subcourseElement[0].scrollIntoView({ behavior: "smooth" });
        const offset = -70;
        window.scrollTo({
          top: subcourseElement[0].offsetTop + offset,
          behavior: "smooth",
        });
      }
    },
    scrollToMaterial(subIndex, matIndex) {
      const materialElement = this.$refs[`material-${subIndex}-${matIndex}`];
      if (materialElement && materialElement.length > 0) {
        // materialElement[0].scrollIntoView({ behavior: "smooth" });
        const offset = -70;
        window.scrollTo({
          top: materialElement[0].offsetTop + offset,
          behavior: "smooth",
        });
      }
    },
  },
  // beforeUnmount() {
  //   // Revoke the object URL to prevent memory leaks
  //   if (this.image_url) {
  //     URL.revokeObjectURL(this.image_url);
  //   }
  // },
};
</script>

<style scoped>
.edit-course {
  display: flex;
  padding: 50px;
  padding-bottom: 0px;
}

.navigation-pane {
  flex: 0 0 200px;
  padding: 20px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  position: sticky;
  top: 30px; /* Stick to the top of the container */
  height: calc(100vh - 40px);
}

.navigation-pane h2 {
  margin-bottom: 15px;
  font-size: 1.5em;
}

.nav-tile {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-tile p {
  font-weight: bold;
  margin-bottom: 5px;
}

.nav-tile ul {
  list-style: none;
  padding: 0;
}

.nav-tile ul li a {
  text-decoration: none;
  color: #333;
}

.nav-tile ul li a:hover {
  color: #1d3557;
}

.subcourse-tile {
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}

.subcourse-tile:hover {
  background-color: #e0e0e0;
}

.subcourse-tile h4 {
  margin-bottom: 5px;
}

.material-tile {
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #dee9f5;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}

.material-tile:hover {
  background-color: #e0e0e0;
}

.material-tile h4 {
  margin-bottom: 5px;
}

.content-pane {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.content-pane h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea,
.form-group input[type="file"],
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group textarea {
  min-height: 100px;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group-text {
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  height: 28px;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
}

.btn.edit-course-btn {
  padding: 10px 20px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn.edit-course-btn:hover {
  background-color: #0b1c2d;
}

.subcourses {
  margin-bottom: 20px;
}

.subcourses h3 {
  margin-top: 20px;
}

.subcourses button {
  margin-top: 10px;
}

.subcourse-container {
  background-color: #f0f0f0; /* Set background color */
  border-radius: 5px; /* Set border radius for rounded corners */
  padding: 20px; /* Add padding for content spacing */
  margin-bottom: 20px; /* Add margin to create separation */
  border: 2px solid #ccc;
}

.subcourse-separator {
  height: 10px; /* Adjust the height of the separator */
}

.material-container {
  background-color: #dbe8f7d4; /* Set background color */
  border-radius: 10px; /* Set border radius for rounded corners */
  padding: 20px; /* Add padding for content spacing */
  margin-bottom: 20px; /* Add margin to create separation */
  border: 2px solid #d0ddedd4;
}

.materials {
  margin-bottom: 20px;
}

.materials h4 {
  margin-top: 20px;
}

.remove-material-button {
  width: 200px; /* Adjust the size of the round div */
  height: 40px; /* Adjust the size of the round div */
  border-radius: 4px;
  background-color: rgb(239, 63, 47); /* Set the background color */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  color: #fff;
}

.remove-material-button:hover {
  background-color: rgb(133, 20, 20); /* Set the background color */
}

.add-material-button {
  width: 200px; /* Adjust the size of the round div */
  height: 40px; /* Adjust the size of the round div */
  border-radius: 4px;
  background-color: #1d3557; /* Set the background color */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: 5px;
  margin-left: auto;
  color: #fff;
}

.add-material-button:hover {
  background-color: #144282;
}

.disabled {
  cursor: not-allowed !important;
  opacity: 0.6;
  pointer-events: none;
}

.file-label {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.file-label input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.file-button {
  background-color: #1d3557;
  color: white;
  padding: 8px 12px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.file-button:hover {
  background-color: #144282;
}

/* Optional: Style the label to look like a button */
.file-placeholder {
  display: inline-block;
  padding: 3px 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  width: 98.5%;
  font-size: 14px;
}

/* Optional: Adjust styles when file is chosen */
.file-placeholder.chosen {
  background-color: #f0f0f0;
}
</style>

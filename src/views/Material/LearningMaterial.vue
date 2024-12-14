<template>
  <div class="learning-material">
    <!-- Flex direction row -->
    <div class="flex-row">
      <!-- Flex direction column for material and discussion -->
      <div class="flex-column">
        <!-- Flex 1.1 for material -->
        <div class="material">
          <!-- Display PDF here -->
          <iframe
            :src="material.material_url + '#toolbar=0'"
            width="100%"
            height="100%"
            v-if="material.type === 'PDF'"
          ></iframe>
          <!-- <video
            width="100%"
            height="100%"
            controls
            v-else-if="material.type === 'VIDEO'"
          >
            <source :src="material.material_url" type="video/mp4" />
            Your browser does not support the video tag.
          </video> -->
          <iframe
            width="100%"
            height="100%"
            v-else-if="material.type === 'VIDEO'"
            :src="materialUrl"
            allowfullscreen
          >
          </iframe>
        </div>
        <div class="extra-menu">
          <div class="tab-buttons">
            <div
              :class="{ 'active-tab': activeTab === 'material-description' }"
              @click="activeTab = 'material-description'"
            >
              Deskripsi Materi
            </div>
            <div
              :class="{ 'active-tab': activeTab === 'discussion-forum' }"
              @click="activeTab = 'discussion-forum'"
            >
              Forum Diskusi
            </div>
            <div
              :class="{ 'active-tab': activeTab === 'review' }"
              @click="activeTab = 'review'"
            >
              Review
            </div>
          </div>
          <div
            v-show="activeTab === 'material-description'"
            class="material-description"
          >
            <h2>Deskripsi Materi</h2>
            <p v-html="material.description"></p>
          </div>
          <div
            v-show="activeTab === 'discussion-forum'"
            class="discussion-forum"
          >
            <!-- Dummy content for discussion forum -->
            <h2 class="forum-title">Forum Diskusi</h2>
            <div v-if="material.listDiscussion.length === 0">
              <h2 style="color: #666">Belum ada diskusi untuk course ini</h2>
            </div>
            <div
              v-else
              v-for="(post, index) in material.listDiscussion"
              :key="index"
              class="post"
            >
              <!-- <h4 class="user">{{ post.title }} - {{ post.name }}</h4>
              <p class="message">{{ post.message }}</p> -->
              <div class="toggle-replies">
                <!-- User name and title -->
                <div class="message-content">
                  <h4 class="user">
                    {{ post.title }}
                  </h4>
                  <span class="timestamp"
                    >Posted by {{ post.name }} at
                    {{ formatDate(post.createdAt) }}</span
                  >
                  <p class="message">{{ post.message }}</p>
                </div>
                <!-- Add arrow icon to indicate toggle state -->
                <div class="icons">
                  <TrashIcon
                    size="30px"
                    class="trash-icon"
                    v-show="isAdmin"
                    @click="showDiscussionDeleteModal(post.uuid)"
                  />
                  <DeleteModal
                    :show="isDiscussionDeleteModalVisible"
                    @confirm-delete="deletePost()"
                    @close-modal="closeDiscussionDeleteModal()"
                  />
                  <div
                    class="arrow-icon"
                    @click="toggleReplies(index)"
                    v-show="post.listReply && post.listReply.length > 0"
                  >
                    <ArrowUp size="30px" v-if="post.showReplies" />
                    <ArrowDown size="30px" v-else />
                  </div>
                </div>
              </div>

              <!-- Replies -->
              <div class="replies-container" v-show="post.showReplies">
                <div
                  v-for="(reply, replyIndex) in post.listReply"
                  :key="replyIndex"
                  class="reply"
                >
                  <div class="reply-info">
                    <span class="user">{{ reply.name }}</span>
                    <span class="timestamp">{{
                      formatDate(reply.createdAt)
                    }}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <p class="message">{{ reply.message }}</p>
                    <TrashIcon
                      size="30px"
                      class="trash-icon"
                      v-show="isAdmin"
                      @click="showReplyDeleteModal(reply.uuid)"
                    />
                    <DeleteModal
                      :show="isReplyDeleteModalVisible"
                      @confirm-delete="deleteReply()"
                      @close-modal="closeReplyDeleteModal()"
                    />
                  </div>
                </div>
              </div>
              <div class="new-reply-form">
                <input
                  type="text"
                  v-model="post.newReply"
                  placeholder="Balasan"
                />
                <div class="new-reply-form-button" @click="addReply(post)">
                  Add Reply
                </div>
              </div>
            </div>
            <div class="new-discussion-form">
              <input
                type="text"
                v-model="newDiscussion.title"
                placeholder="Judul Diskusi"
              />
              <textarea
                v-model="newDiscussion.message"
                placeholder="Pesan"
              ></textarea>
              <div class="new-discussion-form-button" @click="addDiscussion">
                Add Discussion
              </div>
            </div>
          </div>
          <div v-show="activeTab === 'review'" class="review">
            <h2>Participant Review</h2>

            <!-- Flex container for average rating and bar chart -->
            <div v-if="course.listReview.length === 0">
              <h2 style="color: #666">Belum ada review untuk course ini</h2>
            </div>
            <div v-else class="flex-container">
              <!-- Div for average rating -->
              <div class="average-rating">
                <h3>Average Rating</h3>
                <div class="rating-box">
                  <div class="average-rating-text">
                    {{
                      typeof course.rating === "number"
                        ? course.rating.toFixed(2)
                        : "N/A"
                    }}
                  </div>
                  <div class="esrb-rating">Average Rating</div>
                </div>
              </div>

              <!-- Div for bar chart -->
              <div class="bar-chart">
                <h3>Rating Distribution</h3>
                <!-- Bar for each rating -->
                <div class="bar" v-for="rating in ratings" :key="rating.value">
                  <div class="review-bar-container">
                    <div
                      class="review-bar"
                      :style="{ width: rating.percentage + '%' }"
                    ></div>
                  </div>
                  <div class="bar-percentage">{{ rating.percentage }}%</div>
                  <div class="bar-label">
                    <span class="star-container" v-for="i in 5" :key="i">
                      <span v-if="i <= rating.value">★</span>
                      <span v-else>☆</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="personal-reviews">
              <h3 v-if="course.listReview.length > 0">Personal Reviews</h3>
              <div
                class="personal-review"
                v-for="(review, index) in course.listReview"
                :key="index"
              >
                <div class="user">{{ review.name }}</div>
                <div class="rating">
                  <!-- <span v-for="i in review.rating" :key="i">★</span> -->
                  <span class="star-container">
                    <span v-for="i in 5" :key="i">
                      <span v-if="i <= review.rating">★</span>
                      <span v-else>☆</span>
                    </span>
                  </span>
                </div>
                <div class="message">{{ review.message }}</div>
              </div>
              <div class="new-review" v-if="!isReviewed && !isAdmin">
                <div class="star-rating">
                  <span
                    v-for="star in 5"
                    :key="star"
                    @click="newReview.rating = star"
                    :class="{ filled: star <= newReview.rating }"
                  >
                    ★
                  </span>
                </div>
                <textarea
                  v-model="newReview.message"
                  placeholder="Write your review here"
                ></textarea>
                <div class="review-button" @click="sendReview">Submit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Flex 2 for the list of subcourses and materials -->
      <div class="subcourses-materials">
        <!-- List of subcourses and materials -->
        <h3 class="section-title">Subcourses and Materials</h3>
        <div
          class="subcourse"
          v-for="subCourse in course.listSubCourse"
          :key="subCourse.id"
        >
          <h4>{{ subCourse.name }}</h4>
          <ul>
            <li
              v-for="material in subCourse.listMaterial"
              :key="material.uuid"
              class="checkbox-and-material-tile"
            >
              <input
                type="checkbox"
                :checked="material.isFinished"
                @change="updateMaterial(material)"
                class="checkbox-material"
                v-show="!isAdmin"
              />
              <a
                :href="'/course/' + course.slugName + '/' + material.uuid"
                style="text-decoration: none; color: black; gap: 7px"
                class="material-tile"
                :class="{ 'material-tile-done': material.isFinished }"
              >
                <div style="flex: 1">{{ material.name }}</div>
                <div>{{ material.readingMinute }} menit</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowUp from "@/assets/icon/ArrowUp.vue";
import ArrowDown from "@/assets/icon/ArrowDown.vue";
import TrashIcon from "@/assets/icon/TrashIcon.vue";
import DeleteModal from "@/components/LearningMaterial/DeleteModal.vue";
export default {
  components: {
    ArrowUp,
    ArrowDown,
    TrashIcon,
    DeleteModal,
  },
  data() {
    return {
      course: {
        name: "",
        description: "",
        image_url: "",
        createdAt: "",
        listSubCourse: [],
        listReview: [],
      },
      material: {
        uuid: "",
        name: "",
        type: "",
        material_url: "",
        readingMinute: "",
        description: "",
        listDiscussion: "",
      },
      activeTab: "material-description",
      newReview: {
        rating: 0,
        message: "",
      },
      newDiscussion: {
        title: "",
        message: "",
      },
      isReviewed: false,
      isAdmin: false,
      isDiscussionDeleteModalVisible: false,
      isReplyDeleteModalVisible: false,
      discussionID: "",
      replyID: "",
      materialUrl: "",
    };
  },
  // watch: {
  //   $route: {
  //     handler: "refreshPage",
  //     immediate: true,
  //   },
  // },
  methods: {
    // showDeleteModal(type, id) {
    //   this.isDeleteModalVisible = true;
    //   if (type === "D") {
    //     this.discussionID = id;
    //   } else if (type === "R") {
    //     this.replyID = id;
    //   }
    // },
    showDiscussionDeleteModal(id) {
      this.isDiscussionDeleteModalVisible = true;
      this.discussionID = id;
    },
    showReplyDeleteModal(id) {
      this.isReplyDeleteModalVisible = true;
      this.replyID = id;
    },
    // closeDeleteModal() {
    //   this.isDeleteModalVisible = false;
    //   this.discussionID = "";
    //   this.replyID = "";
    // },
    closeDiscussionDeleteModal() {
      this.isDiscussionDeleteModalVisible = false;
      this.discussionID = "";
    },
    closeReplyDeleteModal() {
      this.isReplyDeleteModalVisible = false;
      this.replyID = "";
    },
    async deletePost() {
      try {
        const token = localStorage.getItem("token");
        await this.$axios.delete(
          `api/v1/admin/discussion/delete/${this.discussionID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await this.fetchMaterial();
        this.closeDiscussionDeleteModal();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    async deleteReply() {
      try {
        const token = localStorage.getItem("token");
        await this.$axios.delete(`api/v1/admin/reply/delete/${this.replyID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await this.fetchMaterial();
        this.closeReplyDeleteModal();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    async checkEnrollment() {
      try {
        const slugName = this.$route.params.slugName;
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/enrolled/${slugName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.isReviewed = response.data.data.isReviewed;
      } catch (error) {
        console.error("Error checking enrollment:", error);
        this.$router.push("/");
      }
    },
    checkIsAdmin() {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenParts = token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));
        const role = payload.sub.split("|")[1];
        this.isAdmin = role === "ADMIN";
      } else {
        this.$router.push("/");
      }
    },
    async finishMaterial() {
      try {
        const materialID = this.$route.params.materialID;
        const token = localStorage.getItem("token");
        await this.$axios.patch(
          `api/v1/course/tick/${materialID}`,
          {
            is_finished: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error finishing material:", error);
      }
    },
    async fetchCourse() {
      try {
        const slugName = this.$route.params.slugName;
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(`api/v1/course/${slugName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.course = response.data.data;
        await this.fetchFinishedStatus();
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    },
    async fetchMaterial() {
      try {
        const slugName = this.$route.params.slugName;
        const materialID = this.$route.params.materialID;
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/${slugName}/${materialID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.material = response.data.data;
      } catch (error) {
        if (error.code === "ERR_BAD_REQUEST") {
          this.$router.push("/404");
        }
      }
    },
    async sendReview() {
      try {
        const slugName = this.$route.params.slugName;
        const token = localStorage.getItem("token");
        const response = await this.$axios.post(
          `api/v1/course/review/${slugName}`,
          this.newReview,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Review submitted successfully:", response.data);

        await this.fetchCourse();

        this.newReview.rating = 0;
        this.newReview.message = "";

        alert("Review submitted successfully!");
        await this.checkEnrollment();
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Failed to submit review. You have already submit the review!");
      }
    },
    async addDiscussion() {
      try {
        const materialID = this.$route.params.materialID;
        const token = localStorage.getItem("token");
        await this.$axios.post(
          `api/v1/forum/${materialID}`,
          this.newDiscussion,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await this.fetchMaterial();
        this.newDiscussion.title = "";
        this.newDiscussion.message = "";
        await this.sendLog(
          `Memulai diskusi pada materi ${this.material.name} pada course ${this.course.name}`
        );
        alert("Discussion submitted successfully!");
      } catch (error) {
        console.error("Error submitting discussion:", error);
        alert("Failed to submit discussion. Please try again later.");
      }
    },
    async addReply(post) {
      try {
        const token = localStorage.getItem("token");
        await this.$axios.post(
          `api/v1/forum/reply/${post.uuid}`,
          { message: post.newReply },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await this.sendLog(
          `Membalas diskusi pada materi ${this.material.name} pada course ${this.course.name}`
        );
        await this.fetchMaterial();
        post.newReply = "";
        alert("Reply submitted successfully!");
      } catch (error) {
        console.error("Error submitting reply:", error);
        alert("Failed to submit reply. Please try again later.");
      }
    },

    async updateMaterial(material) {
      try {
        const materialID = material.uuid;
        material.isFinished = !material.isFinished;
        const token = localStorage.getItem("token");
        const isFinished = await this.getFinishedMaterial(materialID);
        await this.$axios.patch(
          `api/v1/course/tick/${materialID}`,
          {
            is_finished: !isFinished,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error finishing material:", error);
      }
    },

    async getFinishedMaterial(materialID) {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/material/progress/${materialID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.data.is_finished;
      } catch (error) {
        console.error("Error finishing material:", error);
      }
    },

    async fetchFinishedStatus() {
      // Fetch finished status for each material
      if (this.isAdmin) {
        return;
      }
      for (const subCourse of this.course.listSubCourse) {
        for (const material of subCourse.listMaterial) {
          material.isFinished = await this.getFinishedMaterial(material.uuid);
        }
      }
    },

    async sendLog(message) {
      if (this.isAdmin) {
        return;
      }
      try {
        const token = localStorage.getItem("token");
        await this.$axios.post(
          `api/v1/course/log-activity`,
          { log: message, course: this.course.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error sending log:", error);
      }
    },

    async determineMaterialUrl() {
      try {
        const urlMap = await this.createUrlMap();
        const directedUrl = await this.fetchDirectedUrl();
        if (directedUrl) {
          for (const [key, value] of Object.entries(urlMap)) {
            if (directedUrl.includes(key)) {
              this.materialUrl = value;
              return;
            }
          }
        }
        // Handle case where no matching URL is found
        this.materialUrl = ''; 
      } catch (error) {
        console.error('Error determining material url:', error);
        this.materialUrl = '';
      }
    },

    async createUrlMap() {
      await this.fetchMaterial();
      const urlMap = {};
      const urls = this.material.material_url.split(';').map(url => url.trim());
      urls.forEach(url => {
        const ipMatch = url.match(/\/\/(.*?)\//);
        if (ipMatch && ipMatch[1]) {
          urlMap[ipMatch[1]] = url;
        }
      });
      return urlMap;
    },

    async fetchDirectedUrl() {
      try {
        const response = await fetch('http://192.168.1.13:8000', {
          method: 'POST'
        });
        return response.url;
      } catch (error) {
        console.error('Error fetching directed url:', error);
        return null;
      }
    },

    // refreshPage() {
    //   this.load();
    // },

    load() {
      this.checkIsAdmin();
      if (this.isAdmin === true) {
        this.fetchCourse();
        this.fetchMaterial();
      } else {
        const materialID = this.$route.params.materialID;
        this.checkEnrollment();
        this.getFinishedMaterial(materialID)
          .then((isFinished) => {
            if (isFinished === false) {
              this.finishMaterial();
            }
            Promise.all([this.fetchCourse(), this.fetchMaterial()])
              .then(() => {
                if (this.checkLastLog(this.material.uuid)) {
                  this.sendLog(
                    `Mengakses materi ${this.material.name} pada course ${this.course.name}`
                  );
                  localStorage.setItem("lastMaterialID", this.material.uuid);
                  localStorage.setItem(
                    "lastAccessTime",
                    JSON.stringify(new Date())
                  );
                }
              })
              .catch((error) => {
                // Handle errors if any
                console.error(error);
              });
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);
          });
      }
    },

    toggleReplies(index) {
      this.material.listDiscussion[index].showReplies =
        !this.material.listDiscussion[index].showReplies;
    },
    formatDate(dateTimeString) {
      const dateTime = new Date(dateTimeString);

      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const month = months[dateTime.getMonth()];
      const day = dateTime.getDate();
      const year = dateTime.getFullYear();
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();

      const formattedDateTime = `${day} ${month} ${year}, ${hours
        .toString()
        .padStart(2, "0")}.${minutes.toString().padStart(2, "0")}`;

      return formattedDateTime;
    },
    checkLastLog(materialId) {
      const lastAccessTime = localStorage.getItem("lastAccessTime");
      const lastMaterialId = localStorage.getItem("lastMaterialID");

      if (lastAccessTime && lastMaterialId) {
        const lastAccessDateTime = new Date(JSON.parse(lastAccessTime));
        const currentTime = new Date();
        const timeDifferenceMs = currentTime - lastAccessDateTime;
        const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);
        if (timeDifferenceMinutes < 10 && materialId === lastMaterialId) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    },
  },
  computed: {
    ratings() {
      const ratingDistribution = this.course.ratingDistribution;
      const totalReviews = this.course.listReview.length;
      const ratings = [];

      // Loop through rating distribution data
      for (let ratingValue in ratingDistribution) {
        const count = ratingDistribution[ratingValue];
        const percentage = (count / totalReviews) * 100;
        ratings.push({
          value: parseInt(ratingValue),
          percentage: percentage.toFixed(1),
        });
      }
      return ratings;
    },
  },
  created() {
    this.load();
    this.determineMaterialUrl();
  },
};
</script>

<style scoped>
.learning-material {
  padding-top: 20px;
  display: flex;
}

.flex-row {
  display: flex;
  flex: 1;
}

.flex-column {
  display: flex;
  flex-direction: column;
  flex: 3;
}

.material {
  /* Add styling for material container */
  /* flex: 1; */
  padding-top: 33px;
  height: 80vh;
}

.extra-menu {
  flex: 1; /* Flex 1.2 */
  margin-top: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.tab-buttons {
  display: flex;
}

.tab-buttons > div {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-bottom: none;
  cursor: pointer;
  background-color: #f0f0f0;
}

.tab-buttons > div:hover {
  background-color: #e0e0e0;
}

.active-tab {
  /* border-top-left-radius: 8px;
  border-top-right-radius: 8px; */
  background-color: white;
  border-bottom: 1px solid white;
  font-weight: bold;
}

.forum-title {
  margin-bottom: 10px;
  color: #333;
}

.post {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.user {
  margin-bottom: 5px;
  color: #007bff; /* User name color */
}

.message {
  color: #333; /* Message color */
}

.trash-icon {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.trash-icon:hover {
  background-color: #f9e4e4;
}

.reply {
  background-color: #f7f7f7;
  border-left: 4px solid #007bff; /* Adjust the color to your preference */
  padding: 10px;
  margin-left: 20px; /* Indent the replies */
  margin-top: 10px;
}

.reply-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.reply-info .user {
  font-weight: bold;
  color: #333;
}

.timestamp {
  color: #666;
  font-size: 0.8em;
}

.new-discussion-form {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

/* Style for the form to add a new reply */
.new-reply-form {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-top: 10px;
}

/* Style for form inputs */
.new-discussion-form input[type="text"],
.new-reply-form input[type="text"],
.new-reply-form textarea {
  width: 99%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Style for form buttons */
.new-discussion-form-button,
.new-reply-form-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: auto;
  width: 113px;
}

.new-reply-form-button {
  width: 75px;
}

/* Style for form buttons on hover */
.new-discussion-form-button:hover,
.new-reply-form-button:hover {
  background-color: #0056b3;
}

.toggle-replies {
  display: flex;
  align-items: center;
}

.message-content {
  flex: 1; /* Allow the message content to take up remaining space */
}

.arrow-icon {
  cursor: pointer;
}

.personal-reviews {
  flex: 1;
}

.personal-review {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.personal-review .user {
  font-weight: bold;
}

.personal-review .rating {
  color: #f67280;
}

.personal-review .message {
  color: #333;
}

.subcourses-materials {
  flex: 1;
  padding: 20px;
}

.section-title {
  margin-top: 30px;
  margin-bottom: 10px;
  color: #333;
}

.subcourse {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.subcourse h4 {
  margin-bottom: 10px;
  color: #333;
}

.subcourse p {
  margin-bottom: 10px;
}

.subcourse ul {
  list-style: none;
  padding: 0;
}

.subcourse li {
  margin-bottom: 5px;
  color: #666;
}

.review {
  margin-top: 20px;
}

.flex-container {
  display: flex;
}

.average-rating {
  /* Existing styles... */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-box {
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
}

.average-rating-text {
  color: white;
  font-size: 24px; /* Adjust font size as needed */
  margin-bottom: 5px;
}

.esrb-rating {
  color: black;
  background-color: white;
  font-size: 14px; /* Adjust font size as needed */
  padding: 5px 10px;
  border-radius: 5px;
}

.average-rating,
.bar-chart {
  flex: 1;
  margin-right: 20px;
}

.average-rating h3,
.bar-chart h3 {
  margin-bottom: 10px;
}

.bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.review-bar-container {
  width: 60%;
  background-color: #ccc;
  height: 10px;
  border-radius: 5px;
}

.review-bar {
  height: 100%;
  background-color: #f67280; /* Adjust color as needed */
  border-radius: 5px;
}

.star-container {
  display: inline-block;
  width: 20px; /* Adjust as needed to fit your layout */
  text-align: center;
  color: #f67280;
}

.new-review {
  margin-top: 20px;
}

.star-rating {
  font-size: 24px;
}

.star-rating span {
  color: #ccc;
  cursor: pointer;
}

.star-rating span.filled {
  color: #f67280;
}

textarea {
  width: 98%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.review-button {
  background-color: #f67280;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  width: 50px;
  margin-left: auto;
}

.review-button:hover {
  background-color: #d9534f;
}

.bar-label {
  margin-right: 10px;
  margin-bottom: 5px;
}

.bar-percentage {
  margin-left: 10px;
  width: 55px;
  text-align: left;
}

.checkbox-and-material-tile {
  display: flex;
}

.checkbox-material {
  margin-bottom: 10px;
  margin-right: 10px;
}

.material-tile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 5px; /* Add spacing between tiles */
  cursor: pointer;
  flex: 1;
}
.material-tile-done {
  background-color: #adf792;
}
.material-tile:hover {
  background-color: #e0e0e0;
}
</style>

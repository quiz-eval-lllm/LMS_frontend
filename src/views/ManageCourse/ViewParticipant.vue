<template>
  <div class="view-participant-page">
    <h1>Daftar Peserta</h1>

    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari peserta"
        class="search-bar"
        @keyup.enter="search"
      />
      <button @click="search" class="search-button">Search</button>
    </div>
    <div v-show="participantTotal === 0">
      <h3 style="color: #666">Peserta tidak ditemukan</h3>
    </div>
    <div class="participant-list" v-show="participantTotal > 0">
      <table>
        <thead>
          <tr>
            <th style="width: 40%">Nama</th>
            <th style="width: 20%">Materi diselesaikan</th>
            <th style="width: 20%">Waktu daftar</th>
            <th style="width: 20%">Catatan Aktivitas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(participant, index) in participants" :key="index">
            <td>{{ participant.user.nama }}</td>
            <td>
              {{
                (
                  (participant.finishedMaterial / course.totalMaterial) *
                  100
                ).toFixed(0)
              }}
              %
            </td>
            <td>{{ formatDate(participant.createdAt) }}</td>
            <td>
              <router-link
                :to="`/view-participant/${course.slugName}/participant-logs/${participant.user.uuid}`"
                class="search-button"
                >Lihat Catatan Aktivitas</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination" v-if="participantTotal > 0">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span v-for="pageNumber in displayedPageNumbers" :key="pageNumber">
        <button
          v-if="pageNumber !== '...'"
          @click="goToPage(pageNumber)"
          :class="{ active: pageNumber === currentPage }"
        >
          {{ pageNumber }}
        </button>
        <span v-else>...</span>
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      participants: [],
      course: {},
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      maxDisplayedPages: 5,
      participantTotal: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.participantTotal / this.itemsPerPage);
    },
    displayedPageNumbers() {
      const totalPages = this.totalPages;
      const currentPage = this.currentPage;
      const maxDisplayedPages = this.maxDisplayedPages;
      let startPage, endPage;

      if (totalPages <= maxDisplayedPages) {
        startPage = 1;
        endPage = totalPages;
      } else {
        const halfMaxDisplayedPages = Math.floor(maxDisplayedPages / 2);
        if (currentPage <= halfMaxDisplayedPages) {
          startPage = 1;
          endPage = maxDisplayedPages;
        } else if (currentPage + halfMaxDisplayedPages >= totalPages) {
          startPage = totalPages - maxDisplayedPages + 1;
          endPage = totalPages;
        } else {
          startPage = currentPage - halfMaxDisplayedPages;
          endPage = currentPage + halfMaxDisplayedPages;
        }
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
      }
      if (endPage < totalPages) {
        pages.push("...");
      }

      return pages;
    },
  },
  methods: {
    async fetchParticipant() {
      try {
        const token = localStorage.getItem("token");
        const slugName = this.$route.params.slugName;
        const response = await this.$axios.get(
          `api/v1/admin/course/participant/${slugName}?name=${this.searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.participants = response.data.data.participants;
        this.participantTotal = response.data.data.total;
      } catch (error) {
        console.error("Error getting profile:", error);
      }
    },
    async fetchCourse() {
      try {
        const slugName = this.$route.params.slugName;
        const response = await this.$axios.get(`api/v1/course/${slugName}`);
        this.course = response.data.data;
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
    async search() {
      this.currentPage = 1;
      await this.fetchParticipant();
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      await this.fetchParticipant();
    },
    // Method to navigate to next page
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      await this.fetchParticipant();
    },
    async goToPage(pageNumber) {
      if (pageNumber !== "..." && pageNumber !== this.currentPage) {
        this.currentPage = pageNumber;
      }
      await this.fetchParticipant();
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
  },
  mounted() {
    this.checkIsAdmin();
    this.fetchParticipant();
    this.fetchCourse();
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
}

.search-bar {
  flex: 1; /* Take remaining space */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-right: 10px; /* Add space between input and button */
}

/* Style the search button */
.search-button {
  padding: 10px 20px;
  background-color: #1d3557;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
}

.search-button:hover {
  background-color: #0b1c2d;
}

/* Style the search bar placeholder text */
.search-bar::placeholder {
  color: #aaa; /* Adjust placeholder text color */
}

/* Style the search bar on focus */
.search-bar:focus {
  outline: none; /* Remove default focus outline */
  border-color: #1d3557; /* Change border color on focus */
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  background-color: #fff;
  color: #1d3557;
  border: 1px solid #1d3557;
}

.pagination button:hover {
  background-color: #1d3557;
  color: #fff;
}

.pagination .active {
  background-color: #1d3557;
  color: #fff;
}

.pagination span.disabled {
  pointer-events: none;
  opacity: 0.5;
}

.pagination span.ellipsis {
  font-weight: bold;
}

.pagination button:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.view-participant-page {
  background-color: #f0f0f0;
  padding: 50px;
  text-align: center;
  min-height: 100vh; /* Set min-height to 100% of viewport height */
  /* box-sizing: border-box; */
}

.view-participant-page h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.view-participant-page p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.view-participant-page .btn {
  padding: 10px 20px;
  background-color: #1d3557;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.view-participant-page .btn:hover {
  background-color: #0b1c2d;
}

/* .participant-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    gap: 5px;
  }
  
  .card {
    width: 700px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
    text-align: left;
    text-decoration: none;
    color: #0b1c2d;
  }
  .card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .card-content {
    padding: 20px;
  }
  
  .card-content h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .card-content p {
    margin-bottom: 20px;
  } */

.participant-list {
  margin-top: 50px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #1d3557;
  color: #ccc;
}

tr:hover {
  background-color: #f9f9f9;
}
</style>

<template>
  <div class="profile-container">
    <div class="sidebar">
      <ul>
        <li
          @click="selectedTab = 'profile'"
          :class="{ active: selectedTab === 'profile' }"
        >
          <i class="fas fa-user"></i> Profil
        </li>
        <li
          @click="selectedTab = 'activityLogs'"
          :class="{ active: selectedTab === 'activityLogs' }"
        >
          <i class="fas fa-chart-line"></i> Catatan Aktivitas
        </li>
        <li
          @click="selectedTab = 'transactionLogs'"
          :class="{ active: selectedTab === 'transactionLogs' }"
        >
          <i class="fas fa-money-bill-alt"></i> Daftar Transaksi
        </li>
      </ul>
    </div>
    <div class="profile-content">
      <div v-if="selectedTab === 'profile'">
        <h1>Profil</h1>
        <div class="profile-card">
          <div class="profile-column">
            <div class="profile-row">
              <span class="profile-label">Nama:</span>
              <span class="profile-value">{{ profile.nama }}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">Institusi:</span>
              <span class="profile-value">{{ profile.institusi }}</span>
            </div>
          </div>
          <div class="profile-column">
            <div class="profile-row">
              <span class="profile-label">Nomor Hp:</span>
              <span class="profile-value">{{ profile.nomorTelefon }}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">Pekerjaan:</span>
              <span class="profile-value">{{ profile.pekerjaan }}</span>
            </div>
            <div class="profile-row">
              <span class="profile-label">Tanggal Lahir:</span>
              <span class="profile-value">{{
                formatDateWithoutTime(profile.tanggalLahir)
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab === 'activityLogs'" class="" style="width: 800px">
        <h1>Catatan Aktivitas</h1>
        <div class="search-container">
          <input
            type="text"
            v-model="activityLogsSearchQuery"
            placeholder="Cari berdasarkan course"
            class="search-bar"
            @keyup.enter="search"
          />
          <button @click="search" class="search-button">Search</button>
        </div>
        <div v-show="logTotal === 0">
          <h3 style="color: #666; text-align: center">Catatan tidak ditemukan</h3>
        </div>
        <div v-for="(log, index) in activityLogs" :key="index" class="log-card">
          <div class="log-text">{{ log.log }}</div>
          <div class="log-time">{{ formatDate(log.createdAt) }}</div>
        </div>
        <div class="pagination" v-if="logTotal > 0">
          <button @click="prevPage" :disabled="currentPage === 1">
            Previous
          </button>
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
      <div v-if="selectedTab === 'transactionLogs'">
        <h1>Daftar Transaksi</h1>
        <div class="filter-container">
          <div class="year-month">
            <label for="month">Bulan:</label>
            <select v-model="chosenMonth">
              <option value="">Semua</option>
              <option value="1">Januari</option>
              <option value="2">Februari</option>
              <option value="3">Maret</option>
              <option value="4">April</option>
              <option value="5">Mei</option>
              <option value="6">Juni</option>
              <option value="7">Juli</option>
              <option value="8">Agustus</option>
              <option value="9">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
            <label for="year">Tahun:</label>
            <select v-model="chosenYear">
              <option value="">Semua</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <button @click="filterTransactionHistory" class="filter-button">
            Terapkan
          </button>
        </div>
        <div v-show="transactionTotal === 0">
          <h3 style="color: #666; text-align: center">Tidak ada transaksi</h3>
        </div>
        <div class="history-transaction" v-show="transactionTotal > 0">
          <table>
            <thead>
              <tr>
                <th style="width: 25%">Nama Course</th>
                <th style="width: 15%">Harga</th>
                <th style="width: 20%">Status Pembayaran</th>
                <th style="width: 15%">Tipe Pembayaran</th>
                <th style="width: 25%">Waktu Transaksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(transaction, index) in transactionHistory"
                :key="index"
              >
                <td>{{ transaction.courseName }}</td>
                <td>
                  Rp.
                  {{ transaction.coursePrice }}
                </td>
                <td>
                  {{
                    transaction.transactionStatus === "temporary"
                      ? "Menunggu Pembayaran"
                      : transaction.transactionStatus === "paid"
                      ? "Sudah Dibayar"
                      : transaction.transactionStatus
                  }}
                </td>
                <td>
                  {{
                    transaction.paymentType
                      ? transaction.paymentType.toUpperCase()
                      : "-"
                  }}
                </td>
                <td>
                  {{
                    transaction.transactionTime
                      ? formatDate(transaction.transactionTime)
                      : "-"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination" v-if="transactionTotal > 0">
          <button
            @click="prevPageTransaction"
            :disabled="currentPageTransaction === 1"
          >
            Previous
          </button>
          <span
            v-for="pageNumber in displayedPageNumbersTransaction"
            :key="pageNumber"
          >
            <button
              v-if="pageNumber !== '...'"
              @click="goToPageTransaction(pageNumber)"
              :class="{ active: pageNumber === currentPageTransaction }"
            >
              {{ pageNumber }}
            </button>
            <span v-else>...</span>
          </span>
          <button
            @click="nextPageTransaction"
            :disabled="currentPageTransaction === totalPagesTransaction"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: "profile",
      profile: {},
      activityLogs: [],
      activityLogsSearchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      maxDisplayedPages: 5,
      logTotal: 0,
      transactionHistory: [],
      chosenMonth: "",
      chosenYear: "",
      years: [],
      transactionTotal: 0,
      currentPageTransaction: 1,
      itemsPerPageTransaction: 10,
      maxDisplayedPagesTransaction: 5,
    };
  },
  methods: {
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
    formatDateWithoutTime(dateTimeString) {
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

      const formattedDateTime = `${day} ${month} ${year}`;
      return formattedDateTime;
    },
    async search() {
      this.currentPage = 1;
      await this.getLogs();
    },
    async getLogs() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(
          `api/v1/course/log-activity?page=${this.currentPage}&course=${this.activityLogsSearchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.activityLogs = response.data.data.activities;
        this.logTotal = response.data.data.total;
      } catch (error) {
        console.error("Error getting log:", error);
      }
    },
    async getProfile() {
      try {
        const token = localStorage.getItem("token");
        const response = await this.$axios.get(`api/v1/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.profile = response.data.data;
      } catch (error) {
        console.error("Error getting profile:", error);
      }
    },
    async filterTransactionHistory() {
      // Reset current page to 1 when applying filters
      this.currentPageTransaction = 1;
      await this.getTransactionHistory();
    },

    async getTransactionHistory() {
      try {
        const token = localStorage.getItem("token");
        let apiUrl = `/api/v1/course/history-transaction`;

        // Add month and year parameters if selected
        if (this.chosenMonth) {
          apiUrl += `?month=${this.chosenMonth}`;
        }
        if (this.chosenYear) {
          apiUrl += `${this.chosenMonth ? "&" : "?"}year=${this.chosenYear}`;
        }

        const response = await this.$axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.transactionHistory = response.data.data.transactions;
        this.transactionTotal = response.data.data.total;
      } catch (error) {
        console.error("Error getting transaction history:", error);
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      await this.getLogs();
    },
    // Method to navigate to next page
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      await this.getLogs();
    },
    async goToPage(pageNumber) {
      if (pageNumber !== "..." && pageNumber !== this.currentPage) {
        this.currentPage = pageNumber;
      }
      await this.getLogs();
    },
    async prevPageTransaction() {
      if (this.currentPageTransaction > 1) {
        this.currentPageTransaction--;
      }
      await this.getTransactionHistory();
    },
    // Method to navigate to next page
    async nextPageTransaction() {
      if (this.currentPageTransaction < this.totalPagesTransaction) {
        this.currentPageTransaction++;
      }
      await this.transactionHistory();
    },
    async goToPageTransaction(pageNumber) {
      if (pageNumber !== "..." && pageNumber !== this.currentPageTransaction) {
        this.currentPageTransaction = pageNumber;
      }
      await this.transactionHistory();
    },
    checkLoginStatus() {
      // Check if token exists in local storage
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
      }
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.logTotal / this.itemsPerPage);
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
    totalPagesTransaction() {
      return Math.ceil(this.transactionTotal / this.itemsPerPageTransaction);
    },
    displayedPageNumbersTransaction() {
      const totalPages = this.totalPagesTransaction;
      const currentPage = this.currentPageTransaction;
      const maxDisplayedPages = this.maxDisplayedPagesTransaction;
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
  created() {
    this.checkLoginStatus();
    this.getProfile();
    this.getLogs();
    this.getTransactionHistory();
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2023; year--) {
      years.push(year);
    }
    this.years = years;
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  background-color: #f0f0f0;
  padding-top: 50px;
  min-height: 94vh;
}

.sidebar {
  flex: 1;
  background-color: #34495e;
  color: #fff;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  padding: 15px 20px;
  cursor: pointer;
  font-size: 18px;
  border-bottom: 1px solid #2c3e50;
}

.sidebar ul li:last-child {
  border-bottom: none;
}

.sidebar ul li.active {
  background-color: #2c3e50;
}

.sidebar ul li i {
  margin-right: 10px;
}

.profile-content {
  flex: 3;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.profile-card {
  width: 500px;
  height: 150px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.profile-column {
  display: flex;
  flex-direction: column;
}

.profile-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.profile-label {
  font-weight: bold;
  font-size: 16px;
}

.profile-value {
  flex: 1;
  text-align: right;
  font-size: 16px;
}

h1 {
  text-align: center;
}

.log-card {
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}

.log-text {
  font-weight: bold;
}

.log-time {
  color: #777;
}

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

.history-transaction {
  margin-top: 20px;
  width: 100%;
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

.filter-container {
  min-width: 500px;
  justify-content: space-between;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.year-month {
  gap: 10px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.filter-container label {
  margin-right: 10px;
  font-weight: bold;
}

.filter-container select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
}

.filter-button {
  padding: 10px 20px;
  margin-bottom: 5px;
  background-color: #1d3557;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background-color: #0b1c2d;
}
</style>

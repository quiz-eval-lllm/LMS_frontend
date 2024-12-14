# LMS Frontend

## Project setup
```
npm install
```
Ketika baru pertama kali melakukan git clone, lakukan perintah berikut untuk menginstall dependency yang dibutuhkan.

### Compiles and hot-reloads for development
```
npm run serve
```
Untuk menjalankan kode selama development, lakukan perintah berikut.

### Compiles and minifies for production
```
npm run build
```
Lakukan perintah berikut untuk deployment di vm/server

### Jangan lupa untuk mengubah link backend pada file di bawah ini jika diperlukan

- main.js: untuk mengubah link backend production/development.
- LearningMaterial.vue pada method fetchDirectedUrl: untuk mengganti link server video streaming.
- RegisterPage.vue pada method submitForm: untuk mengganti link TC Exam registration.



### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

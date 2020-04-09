<template>
  <div>
    <Navbar 
      :page="page"
      :name="name"
      @showLoader="showLoader"
      @createTask="createTask"
      @changePage="changePage"
    >
    </Navbar>
    <Authentication 
      :page="page"
      :waiting="waiting"
      @changePage="changePage"
      @showError="showError"
      @showLoader="showLoader"
    >
    </Authentication>
    
    <Home :page="page"></Home>

    <ErrorMessage
      :message="message"
      :error="error"
      @closeError="closeError"
    >
    </ErrorMessage>
    <Loader 
      :waiting="waiting"
    >
    </Loader>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Authentication from "./views/Authentication";
import Home from "./views/Home";
import ErrorMessage from "./components/ErrorMessage";
import Navbar from "./components/Navbar"
import Loader from "./components/Loader"

const ToastSuccess = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
   components: {
    Authentication,
    Home,
    ErrorMessage,
    Navbar,
    Loader,
  },
  data() {
    return {
      page: 'login',
      error: false,
      message: '',
      waiting: false,
      name: 'NAMA_USERNYA',
      backlogTasks: [],
      todoTasks: [],
      doneTasks: [],
      completedTasks: [],
    };
  },
  methods: {
    changePage(nextPage) {
      this.page = nextPage;
      this.closeError()
    },
    showError(message){
      this.message = message;
      this.error = true;
    },
    showLoader(status) {
      this.waiting = status
    },
    closeError() {
      this.error = false;
      this.message = null;
    },
    createTask(data) {
      axios({
        method: 'POST',
        url: '/tasks',
        headers: {'access_token': localStorage.getItem('access_token')},
        data: data,
      })
      .then(result => {
        this.showLoader(false)
        console.log(result);
      })
      .catch(err => {
        this.showLoader(false)
        console.log(err);
      });
    },
    getTasks() {
      axios.defaults.baseURL = 'http://localhost:3000';
      if(localStorage.getItem('access_token')){
        axios({
          method: 'GET',
          url: '/tasks',
          headers: {
            'content-type': 'application/json',
            'access_token':  localStorage.getItem('access_token'),
          },
        })
        .then((result) => {
          // Olah data ke home
          console.log(result);
          this.page = 'home';
        })
        .catch((err) => {
          if(err.response.status === 401) {
            localStorage.removeItem('access_token');
            this.message = err.response.data.message;
            this.error = true;
          }else{
            this.message = err.response.data.message;
            this.error = true;
          }
          this.page = 'login';
        });
      }else {
        this.page = 'login';
      }
    },
  },
  created() {
    this.getTasks()
  },
  mounted() {
  },
  computed: {

  },
  watch: {

  },
};
</script>

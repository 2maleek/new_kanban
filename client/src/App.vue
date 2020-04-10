<template>
  <div>
    <Navbar 
      :page="page"
      :name="name"
      @showLoader="showLoader"
      @createTask="createTask"
      @changePage="changePage"
      @reset="reset"
    >
    </Navbar>

    <ErrorMessage
      :message="message"
      :error="error"
      @closeError="closeError"
    >
    </ErrorMessage>
    <Authentication 
      :page="page"
      :waiting="waiting"
      @changePage="changePage"
      @showError="showError"
      @showLoader="showLoader"
      @getTasks="getTasks"
    >
    </Authentication>
    
    <Home
      :page="page"
      :backlogTasks="backlogTasks"
      :todoTasks="todoTasks"
      :doneTasks="doneTasks"
      :completedTaks="completedTasks"
    >
    </Home>

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
      name: localStorage.getItem('username'),
      page: 'login',
      error: false,
      message: '',
      waiting: false,
      backlogTasks: [],
      todoTasks: [],
      doneTasks: [],
      completedTasks: [],
    };
  },
  methods: {
    getName() {
      this.name = localStorage.getItem('username');
    },
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
        this.pushTask(result.data)
        console.log('masuk ke push coyyy')
      })
      .catch(err => {
        this.showLoader(false)
        console.log(err);
      });
    },
    getTasks() {
      this.getName()
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
          result.data.forEach(task => {
            console.log(task)
            this.pushTask(task)
          })
          this.page = 'home';
        })
        .catch((err) => {
          console.log(err)
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
    pushTask(task) {
      if(task.category === 'Backlog') {
        this.backlogTasks.push(task)
      }else if(task.category === 'Todo') {
        this.todoTasks.push(task)
      }else if(task.category === 'Done') {
        this.doneTasks.push(task)
      }else if(task.category === 'Completed') {
        this.completedTasks.push(task)
      }
    },
    updateTask(data) {

    },
    reset() {
      this.name = null;
      this.backlogTasks = [];
      this.todoTasks = [];
      this.doneTasks = [];
      this.completedTasks = [];
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

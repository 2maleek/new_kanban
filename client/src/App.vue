<template lang="pug">
  <div>
    <div id="loader" v-if="waiting"></div>
    <div id="errorMessage" class="alert alert-warning alert-dismissible fade show" role="alert" v-if="error">
      <h6><strong>{{ message }}</strong></h6>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeError">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div id="register" class="todos mt-5" v-if="page === 'register'">
      <div class="row align-items-center">
        <div class="col-sm-12 col-md-8"></div>
        <div class="col">
          <h2>Sign up</h2>
          <form v-on:submit.prevent="register">
            <div class="form-group">
              <label for="">Name</label>
              <input type="text" class="form-control" v-model="nameRegister">
            </div>
            <div class="form-group">
              <label for="">Email address</label>
              <input type="email" class="form-control" v-model="emailRegister">
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" class="form-control" v-model="passwordRegister">
            </div>
            <button type="submit" class="btn btn-primary">Signup</button>
          </form>
          <p>Already have an account <a class="btn btn-outline-info" id="signinForm" v-on:click="changePage('login')">Signin here</a></p>
        </div>
      </div>
    </div>
    <div id="login" class="todos mt-5" v-else-if="page === 'login'">
      <div class="row align-items-center">
        <div class="col-sm-12 col-md-8"></div>
        <div class="col">
          <h2>Sign in</h2>
          <form v-on:submit.prevent="login">
            <div class="form-group">
              <label for="">Email address</label>
              <input type="email" class="form-control" v-model="emailLogin">
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" class="form-control" v-model="passwordLogin">
            </div>
            <button type="submit" class="btn btn-primary">Signin</button>
          </form>
          <p>Don't have an account ?<a class="btn btn-outline-info" id="signupForm" v-on:click="changePage('register')">Signup here</a></p>
        </div>
      </div>
    </div>

    <div id="home" v-else-if="page === 'home'">
      <div class="ui">
      <nav class="navbar app">Navbar</nav>

      <div class="board-container">
        <div class="board">
          <div class="board-header">Backlog</div>
          <ul>
            <li>List card</li>
            <li>Li LAgi</li>
            <li>List card</li>
            <li>Li LAgi</li>
            <li>List card</li>
            <li>Li LAgi</li>
            <li>List card</li>
            <li>Li LAgi</li>
            <li>List card Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quia illum alias dolores, velit earum mollitia corporis obcaecati, voluptatibus a sunt expedita tempora vero saepe! Totam asperiores adipisci alias non.</li>
            <li>Li LAgi</li>
            <li>List card</li>
            <li>Li LAgi</li>
            <li>List card</li>
            <li>Li LAgi</li>
          </ul>
          <div class="board-footer">Footer</div>
        </div>
        <div class="board">
          <div class="board-header">Todo</div>
          <ul>
            <li>List card</li>
            <li>Li LAgi</li>
          </ul>
          <div class="board-footer">Footer</div>
        </div>
        <div class="board">
          <div class="board-header">Done</div>
          <ul>
            <li>List card</li>
            <li>Li LAgi</li>
          </ul>
          <div class="board-footer">Footer</div>
        </div>
        <div class="board">
          <div class="board-header">Completed</div>
          <ul>
            <li>List card</li>
            <li>Li LAgi</li>
          </ul>
          <div class="board-footer">Footer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

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

export default Vue.extend({
  data() {
    return {
      page: null,
      error: false,
      message: '',
      waiting: false,
      nameRegister: null,
      emailRegister: null,
      passwordRegister: null,
      emailLogin: null,
      passwordLogin: null,
      
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
    closeError() {
      this.error = false;
      this.message = null;
    },
    register() {
      this.waiting = true;
      axios({
        method: 'POST',
        url: '/register',
        data: {
          name: this.nameRegister,
          email: this.emailRegister,
          password: this.passwordRegister,
        }
      })
      .then((result) => {
        this.waiting = false;
        ToastSuccess.fire({
          icon: 'success',
          title: 'Signed up successfully'
        });
        this.page = 'login';
      })
      .catch((err) => {
        if(err.response.status === 400) {
          this.showError(err.response.data[0].message)
        }else {
          this.showError(err.response.data.message)
        }
        this.waiting = false;
      })
    },
    login() {
      this.waiting = true;
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: this.emailLogin,
          password: this.passwordLogin,
        }
      })
      .then((result) => {
        localStorage.setItem('access_token', result.access_token);
        this.waiting = false;
        ToastSuccess.fire({
          icon: 'success',
          title: 'Signed in successfully'
        });
        this.page = 'home';
      })
      .catch((err) => {
        if(err.response.status === 400) {
          this.showError(err.response.data[0].message)
        }else {
          this.showError(err.response.data.message)
        }
        this.waiting = false;
      })
    },
    getTask() {
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
    this.getTask()
  },
  mounted() {
  },
  computed: {

  },
  watch: {

  }
});
</script>

<style lang="scss" scoped>
.container {
  color: green;
}
</style>
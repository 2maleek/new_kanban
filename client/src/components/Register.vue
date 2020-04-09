<template>
  <div id="register" class="todos mt-5"  v-if="page === 'register'">
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
</template>

<script>
import axios from 'axios';
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
  name: 'Register',
  props: [ 'page', 'waiting' ],
  data() {
    return {
      nameRegister: null,
      emailRegister: null,
      passwordRegister: null,
    }
  },
  methods: {
    register() {
      this.$emit('showLoader', true);
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
        this.$emit('showLoader', false);
        ToastSuccess.fire({
          icon: 'success',
          title: 'Signed up successfully'
        });
        this.changePage('login');
      })
      .catch((err) => {
        if(err.response.status === 400) {
          this.$emit('showError', err.response.data[0].message)
        }else {
          this.$emit('showError', err.response.data.message)
        }
        this.$emit('showLoader', false);
      })
    },
    changePage(nextPage) {
      this.$emit('changePage', nextPage)
    }
  },
};
</script>

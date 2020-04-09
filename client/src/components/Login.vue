<template>
  <div id="login" class="todos mt-5" v-if="page === 'login'">
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
  name: 'Login',
  props: [ 'page' ],
  data() {
    return {
      emailLogin: null,
      passwordLogin: null,
    };
  },
  methods: {
    login() {
      this.$emit('showLoader', true);
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: this.emailLogin,
          password: this.passwordLogin,
        }
      })
      .then((result) => {
        localStorage.setItem('access_token', result.data.access_token);
        this.$emit('showLoader', false);
        ToastSuccess.fire({
          icon: 'success',
          title: 'Signed in successfully'
        });
        this.changePage('home')
      })
      .catch((err) => {
        if(err.response.data.length > 0) {
          this.$emit('showError', err.response.data[0].message)
        }else {
          this.$emit('showError', err.response.data.message)
        }
        this.$emit('showLoader', false);
      })
    },
    changePage(nextPage) {
      this.$emit('changePage', nextPage)
    },
  }
}
</script>

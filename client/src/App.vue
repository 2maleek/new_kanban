<template lang="pug">
  <div>
    <div id="login" class="todos mt-5" v-if="page === 'login'">
      <div class="row align-items-center">
        <div class="col-sm-12 col-md-8"></div>
        <div class="col">
          <h2>Sign in</h2>
          <form id="login">
            <div class="form-group">
              <label for="">Email address</label>
              <input type="email" class="form-control" id="emailLogin">
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" class="form-control" id="passwordLogin">
            </div>
            <button type="submit" class="btn btn-primary">Signin</button>
            <p>OR</p>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <button type="button" class="btn btn-dark mt-2" id="signWithGithub">Signin With Github</button>
          </form>
          <p>Don't have an account ?<a class="btn btn-outline-info" id="signupForm" v-on:click="changePage('register')">Signup here</a></p>
        </div>
      </div>
    </div>
    <div id="register" class="todos mt-5" v-else-if="page === 'register'">
      <div class="row align-items-center">
        <div class="col-sm-12 col-md-8"></div>
        <div class="col">
          <h2>Sign up</h2>
          <form id="register">
            <div class="form-group">
              <label for="">Name</label>
              <input type="text" class="form-control" id="nameRegister">
            </div>
            <div class="form-group">
              <label for="">Email address</label>
              <input type="email" class="form-control" id="emailRegister">
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" class="form-control" id="passwordRegister">
            </div>
            <button type="submit" class="btn btn-primary">Signup</button>
          </form>
          <p>Already have an account <a class="btn btn-outline-info" id="signinForm" v-on:click="changePage('login')">Signin here</a></p>
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

export default Vue.extend({
  data() {
    return {
      page: null,
    };
  },
  methods: {
    changePage: function(nextPage) {
      this.page = nextPage;
    },
  },
  mounted: function() {
    this.page = 'register';
  }
});
</script>

<style lang="scss" scoped>
.container {
  color: green;
}
</style>
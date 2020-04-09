<template>
  <nav class="navbar app navbar-dark bg-primary" v-if="page === 'home'">
    <a class="navbar-brand" href="#">{{name}}</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <button class="btn btn-light my-2 my-sm-0 mr-3" type="button">+ Create Task</button>
        </li>
      </ul>
      <button class="btn btn-danger my-2 my-sm-0" type="button" @click="logout">Logout</button>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: [ 'page', 'name' ],
  data() {
    return {

    };
  },
  
  methods: {
    logout() {
      localStorage.removeItem('access_token');
      this.$emit('changePage', 'login');
      this.$emit('reset');
    },
  }
};

</script>

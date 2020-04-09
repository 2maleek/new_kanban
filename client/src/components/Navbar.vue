<template>
  <div>
    <nav class="navbar app navbar-dark bg-primary" v-if="page === 'home'">
      <a class="navbar-brand" href="#">{{name}}</a>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <button class="btn btn-light my-2 my-sm-0 mr-3" type="button" data-toggle="modal" data-target="#ModalCreate">+ Create Task</button>
          </li>
        </ul>
        <button class="btn btn-danger my-2 my-sm-0" type="button" @click="logout">Logout</button>
    </nav>

    <div class="modal fade" id="ModalCreate" tabindex="-1" role="dialog" aria-labelledby="ModalCreateLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalCreateLabel">Create Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label class="col-form-label">Title</label>
                <input type="text" class="form-control "v-model="title">
              </div>
              <div class="form-group">
                <label class="col-form-label">Category</label>
                <select class="custom-select" v-model="category">
                  <option>Backlog</option>
                  <option>Todo</option>
                  <option>Done</option>
                  <option>Complete</option>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label">Description</label>
                <textarea class="form-control" v-model="description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="createTask">Send message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: [ 'page', 'name' ],
  data() {
    return {
      title: null,
      description: null,
      category: null,
    };
  },
  
  methods: {
    logout() {
      localStorage.removeItem('access_token');
      this.$emit('changePage', 'login');
    },
    createTask() {
      this.$emit('showLoader', true);
      this.$emit('createTask', {
        title: this.title,
        description: this.description,
        category: this.category,
      });
    },
  },
};

</script>

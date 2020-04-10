<template>
  <div id="home" v-if="page === 'home'">
    <div class="ui">
    <div class="board-container">
      <div class="board ">
        <div class="board-header">Backlog</div>
        <div class="cards-container bg-danger">
          <Card v-for="task in backlogTasks" :title="task.title" :description="task.description" :Creator="task.Creator">
          </Card>
        </div>
        <div class="board-footer bg-danger text-light">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Todo</div>
          <div class="card-container bg-warning">
            <Card v-for="task in todoTasks" :title"task.title" :description="task.description" :Creator="task.Creator">
            </Card>
          </div>
        <div class="board-footer bg-warning text-light">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Done</div>
        <div class="cards-container bg-info">
            <Card v-for="task in doneTasks" :title"task.title" :description="task.description" :Creator="task.Creator">
            </Card>
        </div>
        <div class="board-footer text-light bg-info">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Completed</div>
        <div class="cards-container bg-success">
          <div class="card" v-for="task in completedTasks">
            <Card v-for="task in completedTasks" :title"task.title" :description="task.description" :Creator="task.Creator">
            </Card>
          </div>
        </div>
        <div class="board-footer text-light bg-success">Footer</div>
      </div>
    </div>
    <div class="modal fade" id="ModalEdit" tabindex="-1" role="dialog" aria-labelledby="ModalEditLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark" id="ModalEditLabel">Create Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label class="col-form-label text-dark">Title</label>
                <input type="text" class="form-control "v-model="title">
              </div>
              <div class="form-group">
                <label class="col-form-label text-dark">Category</label>
                <select class="custom-select" v-model="category">
                  <option>Backlog</option>
                  <option>Todo</option>
                  <option>Done</option>
                  <option>Complete</option>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label text-dark">Description</label>
                <textarea class="form-control" v-model="description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateTask">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card"

export default {
  name: 'Home',
  components: {
    Card,
  },
  props: [ 'page', 'backlogTasks', 'todoTasks', 'doneTasks', 'completedTasks' ],
  data() {
    return {
      title: null,
      description: null,
      category: null,
    };
  },
  methods: {
    getData(title, description, category) {
      this.title = title;
      this.description = description;
      this.category = category;
    },
    updateTask() {

    },
    deleteTask(id, category) {
      console.log(id)
      this.$emit('deleteTask', id, category)
    }
  },
  watch: {
    backlogTasks() {
      console.log('backlog nambah')
    },
    todoTasks() {
      console.log('todo nambah')
    },
    doneTasks() {
      console.log('done nambah')
    },
    completedTasks() {
      console.log('completed nambah')
    },
  }
}
</script>

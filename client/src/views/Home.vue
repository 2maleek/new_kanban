<template>
  <div id="home" v-if="page === 'home'">
    <div class="ui">
    <div class="board-container">
      <div class="board ">
        <div class="board-header">Backlog</div>
        <div class="cards-container bg-danger">
          <div class="card" v-for="task in backlogTasks">
            <h5 class="text-center">{{ task.title }}</h5>
            <p>{{ task.description }}</p>
            <p><strong style="color: blue;">{{ task.Creator }}</strong></p>

            <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 20%;"><a @click="updateTask(task.id)"><img src="https://img.icons8.com/material-sharp/24/000000/edit.png"></a></p>

            <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 5%;"><a @click="deleteTask(task.id)" data-toggle="modal" data-target="#exampleModal"><img src="https://img.icons8.com/color/24/000000/delete-forever.png"></a></p>
            <!-- Ntar ada icon edit delete dan yang bisa act hanya punyanya sendiri-->
          </div>
        </div>
        <div class="board-footer bg-danger text-light">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Todo</div>
          <div class="card-container bg-warning">
            <div class="card" v-for="task in todoTasks">
              <h5 class="text-center">{{ task.title }}</h5>
              <p>{{ task.description }}</p>
              <p><strong>{{ task.Creator }}</strong></p>
              <!-- Ntar ada icon edit delete dan yang bisa act hanya punyanya sendiri-->
              <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 20%;"><a @click="updateTask(task.id)"><img src="https://img.icons8.com/material-sharp/24/000000/edit.png"></a></p>

              <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 5%;"><a @click="deleteTask(task.id)" data-toggle="modal" data-target="#exampleModal"><img src="https://img.icons8.com/color/24/000000/delete-forever.png"></a>
              </p>
            </div>
          </div>
        <div class="board-footer bg-warning text-light">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Done</div>
        <div class="cards-container bg-info">
          <div class="card" v-for="task in doneTasks">
            <h5 class="text-center">{{ task.title }}</h5>
            <p>{{ task.description }}</p>
            <p><strong>{{ task.Creator }}</strong></p>
            <!-- Ntar ada icon edit delete dan yang bisa act hanya punyanya sendiri-->
            <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 20%;"><a @click="updateTask(task.id)"><img src="https://img.icons8.com/material-sharp/24/000000/edit.png"></a></p>

            <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 5%;"><a @click="deleteTask(task.id)" data-toggle="modal" data-target="#exampleModal"><img src="https://img.icons8.com/color/24/000000/delete-forever.png"></a></p>

          </div>
        </div>
        <div class="board-footer text-light bg-info">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Completed</div>
        <div class="cards-container bg-success">
          <div class="card" v-for="task in completedTasks">
            <h5 class="text-center">{{ task.title }}</h5>
            <p>{{ task.description }}</p>
            <p><strong>{{ task.Creator }}</strong></p>
            <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 20%;"><a @click="updateTask(task.id)"><img src="https://img.icons8.com/material-sharp/24/000000/edit.png"></a></p>

            <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 5%;"><a @click="deleteTask(task.id)" data-toggle="modal" data-target="#exampleModal"><img src="https://img.icons8.com/color/24/000000/delete-forever.png"></a>
            </p>
            <!-- Ntar ada icon edit delete dan yang bisa act hanya punyanya sendiri-->
          </div>
        </div>
        <div class="board-footer text-light bg-success">Footer</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: [ 'page', 'backlogTasks', 'todoTasks', 'doneTasks', 'completedTasks' ],
  data() {
    return {

    };
  },
  methods: {

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

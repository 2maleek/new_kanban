<template>
  <div id="home" v-if="page === 'home'">
    <div class="ui">
    <div class="board-container">
      <div class="board">
        <div class="board-header">Backlog</div>
        <ul class="card">
          <li>List card Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, quia illum alias dolores, velit earum mollitia corporis obcaecati, voluptatibus a sunt expedita tempora vero saepe! Totam asperiores adipisci alias non.</li>
        </ul>
        <div class="board-footer">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Todo</div>
        <ul class="card">
          <li>Li LAgi</li>
        </ul>
        <div class="board-footer">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Done</div>
        <ul class="card">
          <li>Li LAgi</li>
        </ul>
        <div class="board-footer">Footer</div>
      </div>
      <div class="board">
        <div class="board-header">Completed</div>
        <ul class="card">
          <li>Li LAgi</li>
        </ul>
        <div class="board-footer">Footer</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: [ 'page' ],
  data() {
    return {

    };
  },
  methods: {

  },
}
</script>

<template>
	<div class="card">
    <h5 class="text-center">{{ title }}</h5>
    <p>{{ description }}</p>
    <p><strong style="color: blue;">{{ Creator }}</strong></p>

    <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 20%;" data-toggle="modal" data-target="#ModalEdit" @click="getData(title, description, category)">
      <a><img src="https://img.icons8.com/material-sharp/24/000000/edit.png">
      </a>
    </p>

    <p class="btn btn-sm text-right" style="position:absolute; bottom:0; right: 5%;" @click="deleteTask(task.id, 'backlogTasks')">
      <a>
        <img src="https://img.icons8.com/color/24/000000/delete-forever.png">
      </a>
    </p>
    <!-- Ntar ada icon edit delete dan yang bisa act hanya punyanya sendiri-->
  </div>
</template>

<script>
export default {
	name: 'Card',
	props: [ 'title', 'description', 'Creator' ],
	data() {
		return {

		};
	},
	methods: {
		getData() {

		},
	},
};
</script>

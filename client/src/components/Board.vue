<template>
  <div class="board ">
    <div class="board-header">{{ category }}</div>
    <div :class="classBody">
      <slot></slot>
    </div>
    <div :class="classFooter">{{ boardFooter }}</div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: [ 'category', 'boardFooter', 'classBody', 'classFooter' ]
};
</script>

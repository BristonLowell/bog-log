<template>
  <div class="col-12">
    <router-link :to="{ name: 'ActiveBug', params: { bugId: bug.id } }">
      <div class="bug-component col-11 m-4 text-white">
        <div
          class="d-flex justify-content-between align-items-center grow border border-dark rounded bg-dark"
        >
          <h1 class="ml-2">
            {{ bug.title }}
          </h1>
          <button class="btn btn-danger m-3" @click.prevent="closeBug()">
            X
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'BoardComponent',
  props: {
    bugProp: Object
  },
  setup(props) {
    return {
      bug: computed(() => props.bugProp)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.1);
  box-shadow: 10px 10px black;
}
</style>

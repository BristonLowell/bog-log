<template>
  <div
    class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center container-fluid"
  >
    <div class="row">
      <bug-component v-for="bug in bugs" :key="bug" :bug-prop="bug" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import BugComponent from '../components/BugComponent'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      await bugService.getBugs()
    })
    return {
      bugs: computed(() => AppState.bugs)
    }
  },
  components: { BugComponent }
}
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  user-select: none;
}
</style>

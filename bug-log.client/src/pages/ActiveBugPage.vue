<template>
  <div class="active-page container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center display-3">
          {{ bug[0].title }}
        </h1>
        <div class="col-4 offset-4">
          <p>{{ bug[0].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { bugService } from '../services/BugService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'ActivePage',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await bugService.getActiveBug(route.params.bugId)
    })
    return {
      bug: computed(() => AppState.ActiveBug)
    }
  }
}
</script>

<style scoped lang="scss">
</style>

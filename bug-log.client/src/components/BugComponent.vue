<template>
  <div class="col-12">
    <div v-if="bug.closed">
      <div class="bug-component col-12 my-2 text-white">
        <div class="border border-dark rounded bg-danger row text-left mx-4">
          <h5 class=" col-3">
            {{ bug.title }}
          </h5>
          <p class="col-4">
            Reported By: {{ bug.profile.name }}
          </p>
          <p class="col">
            Closed
          </p>
          <p class="m-1 col text-right">
            Closed: {{ bug.updatedAt.split("T")[0] }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <router-link :to="{ name: 'ActiveBug', params: { bugId: bug.id } }">
        <div class="bug-component col-12 my-2 text-white">
          <div class="border border-dark rounded bg-success grow row text-left mx-4">
            <h5 class=" col-3">
              {{ bug.title }}
            </h5>
            <p class="col-4">
              Reported By: {{ bug.profile.name }}
            </p>
            <p class="col">
              Active
            </p>
            <button class="btn btn-danger m-1 py-1 col-1" @click.prevent="closeBug()" v-if="bug.profile.email === profile.email">
              Close
            </button>
            <div class="m-1 py-1 col-1" v-else>
              {{ bug.createdAt.split("T")[0] }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
export default {
  name: 'BoardComponent',
  props: {
    bugProp: Object
  },
  setup(props) {
    const state = reactive({
      closedBug: {
        closed: true
      }
    })
    return {
      state,
      bug: computed(() => props.bugProp),
      profile: computed(() => AppState.profile),
      closeBug() {
        bugService.closeBug(this.bug.id, state.closedBug)
      }
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
  transform: scale(1.05);
  box-shadow: 10px 10px black;
}
</style>

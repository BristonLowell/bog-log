<template>
  <div
    class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center container-fluid gray"
  >
    <div class="row justify-content-center w-100 h-100">
      <div class="col-8 bg-white">
        <div class="row">
          <div class="col-12">
            <h1 class="my-3 display-3 ">
              Reported Bugs
            </h1>
          </div>
          <bug-component v-for="bug in bugs" :key="bug" :bug-prop="bug" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center w-100 h-100 mt-2">
      <div class="col-8 bg-white">
        <h1 class="mt-2">
          New Bug To Report?
        </h1>
      </div>
      <div class="col-8 bg-white">
        <form class="form-group col-8 offset-2">
          <input type="text"
                 class="form-control"
                 placeholder="Title"
                 v-model="state.newBug.title"
          >
          <div class="form-group">
            <textarea class="form-control my-2" id="exampleFormControlTextarea1" rows="5" placeholder="Description..." v-model="state.newBug.description"></textarea>
          </div>
          <button class="btn btn-block btn-success" @click.prevent="createBug()">
            Report
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import BugComponent from '../components/BugComponent'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBug: {}
    })
    onMounted(async() => {
      await bugService.getBugs()
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      createBug() {
        bugService.createBug(state.newBug)
      }
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
.gray{
  background-color: rgb(185, 183, 183);
}
</style>

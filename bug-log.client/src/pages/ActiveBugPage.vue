<template>
  <div class="active-page flex-grow-1 d-flex flex-column container-fluid gray" v-if="bug.profile">
    <div class="row justify-content-center h-100 w-100">
      <div class="col-7 text-center bg-white" v-if="bug.profile.name === profile.name">
        <form class="form-group" type="onsubmit" @submit.prevent="editBug">
          <input type="text"
                 class="form-control text-center border-none border-0 bg-transparent font-size"
                 :placeholder="bug.title"
                 v-model="state.editedBug.title"
          >
          <div class="form-group">
            <textarea class="form-control text-center border-none border-0 bg-transparent" id="exampleFormControlTextarea1" rows="5" :placeholder="bug.description" v-model="state.editedBug.description"></textarea>
          </div>
          <p><b>Reported By: {{ bug.profile.name }}</b></p>
          <button class="btn btn-warning">
            Edit
          </button>
        </form>
      </div>
      <div class="col-7 text-center" v-else>
        <h1 class="display-3">
          {{ bug.title }}
        </h1>
        <p>{{ bug.description }}</p>
        <p><b>Reported By: {{ bug.profile.name }}</b></p>
      </div>
      <div class="col-7">
        <div class="row align-items-center h-100">
          <div class="col-3">
            <h3>User</h3>
          </div>
          <div class="col-7">
            <h3>Message</h3>
          </div>
          <div class="col-2 text-right">
            <button class="rounded btn btn-success" data-toggle="modal" data-target="#exampleModal">
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="col-7">
        <div class="row">
          <div class="col-12">
            <note-component v-for="note in notes" :key="note" :note-prop="note" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Add a new Message
          </h5>
        </div>
        <div class="modal-body">
          <form class="form-group">
            <div class="form-group">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="New Message..." v-model="state.newNote.content"></textarea>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary float-right" data-dismiss="modal" @click.prevent="createNote()">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'
import { noteService } from '../services/NoteService'
import NoteComponent from '../components/NoteComponent'
export default {
  name: 'ActivePage',

  setup() {
    const state = reactive({
      editedBug: {
        title: AppState.activeBug.title,
        description: AppState.activeBug.description
      },
      newNote: {
      }
    })
    const route = useRoute()
    onMounted(async() => {
      await profileService.getProfile()
      await bugService.getActiveBug(route.params.bugId)
      await noteService.getNotes(route.params.bugId)
    })
    return {
      state,
      bug: computed(() => AppState.activeBug),
      profile: computed(() => AppState.profile),
      notes: computed(() => AppState.notes),
      createNote() {
        noteService.createNote(route.params.bugId, state.newNote)
      },
      editBug(event) {
        bugService.editBug(route.params.bugId, state.editedBug)
        event.target.reset()
      }
    }
  },
  components: { NoteComponent }
}
</script>

<style scoped lang="scss">
.font-size{
  font-size: 75px;
}
.gray{
  background-color: rgb(185, 183, 183);
}
</style>

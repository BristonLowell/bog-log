<template>
  <div class="row align-items-center bg-white border-top border-dark py-2" v-if="note.profile.name === profile.name">
    <div class="col-3">
      {{ note.profile.name }}
    </div>
    <div class="col-7" v-if="note.profile.name === profile.name">
      <form class="form-group d-flex">
        <textarea class="form-control border-none border-0 bg-transparent" id="exampleFormControlTextarea1" rows="5" v-model="state.editedNote.content"></textarea>
        <button class="btn btn-info h-50 align-self-center mt-3 ml-2" @click.prevent="editNote()">
          Edit
        </button>
      </form>
    </div>
    <div class="col-7" v-else>
      {{ note.content }}
    </div>
    <div class="col-2 text-right">
      <button class="rounded btn btn-danger" @click.prevent="deleteNote()">
        Delete
      </button>
    </div>
  </div>
  <div class="row align-items-center bg-white border-top border-dark py-2" v-else>
    <div class="col-3">
      {{ note.profile.name }}
    </div>
    <div class="col-7">
      {{ note.content }}
    </div>
    <div class="col-2 text-right" v-if="!note.flagged">
      <button :id="note.id" class="rounded btn btn-warning" @click.prevent="flagNote()">
        Flag
      </button>
    </div>
    <div class="col-2 text-right" v-else>
      <button :id="note.id" class="rounded yellow" disabled>
        Flagged
      </button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { noteService } from '../services/NoteService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'NoteComponent',
  props: {
    noteProp: Object
  },
  setup(props) {
    const state = reactive({
      editedNote: {
        content: props.noteProp.content
      },
      flaggedNote: {
        flagged: true,
        profile: props.noteProp.profile
      }
    })
    const route = useRoute()
    return {
      state,
      note: computed(() => props.noteProp),
      profile: computed(() => AppState.profile),
      deleteNote() {
        noteService.deleteNote(route.params.bugId, props.noteProp.id)
      },
      flagNote() {
        noteService.flagNote(route.params.bugId, props.noteProp.id, state.flaggedNote)
      },
      editNote() {
        noteService.editNote(route.params.bugId, props.noteProp.id, state.editedNote)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.yellow{
  background-color: yellow;
}
</style>

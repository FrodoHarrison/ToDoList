<script setup>
import { ref } from 'vue'

const todosInProgress = ref([])
const todosCompleted = ref([])
const newToDo = ref('')
const ToDo_Index_ForEditing = ref(0) //Do I really need this?
const ToDo_Text_ForEditing = ref('')
const isVisible = ref(true)

function addToDo() {
  todosInProgress.value.push(newToDo.value)
  newToDo.value = ''
}

function removeToDo(index) {
  todosInProgress.value.splice(index, 1)
}

function editeToDo(index) {
  isVisible.value = !isVisible.value
  ToDo_Index_ForEditing.value = index
  ToDo_Text_ForEditing.value = todosInProgress.value.at(ToDo_Index_ForEditing.value)
}

function saveToDo() {
  todosInProgress.value[ToDo_Index_ForEditing.value] = ToDo_Text_ForEditing.value
  isVisible.value = !isVisible.value
}

function completeToDo(index) {
  todosCompleted.value.push(todosInProgress.value[index])
  removeToDo(index)
}
</script>

<template>
  <div class="mainToDo" v-if="isVisible">
    <div>
      <input v-model="newToDo" placeholder="Enter your ToDo" />
      <button @click="addToDo">Add ToDo</button>
    </div>
    <div>
      <h1>In Progress:</h1>
      <ul>
        <li v-for="(todo, index) in todosInProgress" :key="index">
          {{ todo }}
          <button @click="removeToDo(index)">Delete</button>
          <button @click="editeToDo(index)">Edite</button>
          <button @click="completeToDo(index)">Complete</button>
        </li>
      </ul>
      <h1>Completed:</h1>
      <ul>
        <li v-for="(todo, index) in todosCompleted" :key="index">
          {{ todo }}
        </li>
      </ul>
    </div>
  </div>
  <div class="editToDo" v-if="!isVisible">
    <!-- <h1>{{ ToDo_Text_ForEditing }}</h1> -->
    <textarea v-model="ToDo_Text_ForEditing"></textarea>
    <button @click="saveToDo">Save</button>
    <!-- <input v-model="newToDo" text="" /> -->
  </div>
</template>

<style>
.li {
  color: antiquewhite;
}

.mainToDo {
  display: flex;
}

.editToDo {
  display: flex;
}
</style>

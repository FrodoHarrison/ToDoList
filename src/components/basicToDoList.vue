<script setup>
import { ref } from 'vue'

const toDosInProgress = ref([])
const todosCompleted = ref([])
const newToDo = ref('')
const toDoIndexForEditing = ref(0) //Do I really need this?
const toDoTextForEditing = ref('')
const isVisible = ref(true)

function addToDo() {
  toDosInProgress.value.push(newToDo.value)
  newToDo.value = ''
}

function removeToDo(index) {
  toDosInProgress.value.splice(index, 1)
}

function editeToDo(index) {
  isVisible.value = !isVisible.value
  toDoIndexForEditing.value = index
  toDoTextForEditing.value = toDosInProgress.value.at(toDoIndexForEditing.value)
}

function saveToDo() {
  toDosInProgress.value[toDoIndexForEditing.value] = toDoTextForEditing.value
  isVisible.value = !isVisible.value
}

function completeToDo(index) {
  todosCompleted.value.push(toDosInProgress.value[index])
  removeToDo(index)
}
</script>

<template>
  <div>
    <div v-if="isVisible" class="mainToDo">
      <div class="inputSection">
        <input v-model="newToDo" class="inputToDo" placeholder="Enter your ToDo" />
        <button class="addToDo-button" @click="addToDo">Add ToDo</button>
      </div>
      <div>
        <h1 class="toDoHeader">In Progress:</h1>
        <ul>
          <li v-for="(todo, index) in toDosInProgress" :key="index" class="toDoList">
            <span>{{ todo }}</span>
            <button class="toDoButton" @click="removeToDo(index)">Delete</button>
            <button class="toDoButton" @click="editeToDo(index)">Edite</button>
            <button class="toDoButton" @click="completeToDo(index)">Complete</button>
          </li>
        </ul>
        <h1 class="toDoHeader">Completed:</h1>
        <ul>
          <li v-for="(todo, index) in todosCompleted" :key="index" class="toDoList">
            {{ todo }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!isVisible" class="editToDo">
      <!-- <h1>{{ toDoTextForEditing }}</h1> -->
      <textarea v-model="toDoTextForEditing"></textarea>
      <button @click="saveToDo">Save</button>
      <!-- <input v-model="newToDo" text="" /> -->
    </div>
  </div>
</template>

<style scoped>
.toDoList {
  color: rgb(255, 255, 255);
}

.toDoHeader {
  margin-left: 8px;
  margin-top: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: rgb(208, 172, 219);
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 12px;
  font-weight: bold;
  color: rgb(129, 143, 132);
}

.mainToDo {
  display: flex;
  background-color: rgb(43, 35, 59);
  border-radius: 12px;
}

.inputSection {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputToDo {
  margin-left: 8px;
  margin-top: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: none;
  padding-left: 20px;
}

.addToDo-button {
  margin-left: 8px;
  margin-top: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  width: 100px;
  height: 35px;
  border-radius: 12px;
  background-color: rgb(208, 172, 219);
  border: none;
  color: white;
  font-weight: bold;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
}

.toDoButton {
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 12px;
  background-color: rgb(208, 172, 219);
  color: white;
  border: none;
  font-weight: bold;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
}

.editToDo {
  display: flex;
}
</style>

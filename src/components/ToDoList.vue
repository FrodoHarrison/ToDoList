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
    <div class="input-section">
      <input class="input-ToDo" v-model="newToDo" placeholder="Enter your ToDo" />
      <button class="addToDo-button" @click="addToDo">Add ToDo</button>
    </div>
    <div>
      <h1 class="ToDo-Header">In Progress:</h1>
      <ul>
        <li class="ToDoList" v-for="(todo, index) in todosInProgress" :key="index">
          {{ todo }}
          <button class="ToDoButton" @click="removeToDo(index)">Delete</button>
          <button class="ToDoButton" @click="editeToDo(index)">Edite</button>
          <button class="ToDoButton" @click="completeToDo(index)">Complete</button>
        </li>
      </ul>
      <h1 class="ToDo-Header">Completed:</h1>
      <ul>
        <li class="ToDoList" v-for="(todo, index) in todosCompleted" :key="index">
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
.ToDoList {
  color: rgb(255, 255, 255);
}

.ToDo-Header {
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

.input-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-ToDo {
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

.ToDoButton {
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

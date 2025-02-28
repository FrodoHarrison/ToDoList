<script setup>
import { ref } from 'vue'

const todos = ref([])
const newToDo = ref('')
const ToDo_Index_ForEditing = ref(0) //Do I really need this?
const ToDo_Text_ForEditing = ref('')
const isVisible = ref(true)

function addToDo() {
  todos.value.push(newToDo.value)
  newToDo.value = ''
}

function removeToDo(index) {
  todos.value.splice(index, 1)
}

function editeToDo(index) {
  isVisible.value = !isVisible.value
  ToDo_Index_ForEditing.value = index
  ToDo_Text_ForEditing.value = todos.value.at(ToDo_Index_ForEditing.value)
}

function saveToDo() {
  todos.value[ToDo_Index_ForEditing.value] = ToDo_Text_ForEditing.value
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="mainToDo" v-if="isVisible">
    <div>
      <input v-model="newToDo" placeholder="Enter your ToDo" />
      <button @click="addToDo">Add ToDo</button>
    </div>
    <div>
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          {{ todo }}
          <button @click="removeToDo(index)">Delete</button>
          <button @click="editeToDo(index)">Edite</button>
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

import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    id: 0,
  }),
  actions: {
    addToDo(item) {
      this.todoList.push({ item, id: this.id++, completed: false })
    },
    deleteToDo(itemID) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== itemID
      })
    },
    completeToDo(idToFind) {
      const todo = this.todoList.find((obj) => obj.id === idToFind)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

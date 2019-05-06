<template>
  <div>
    <h1>
      <input v-model="doc.title" @change="change">
    </h1>
    <textarea v-model="doc.body" @change="change"></textarea>
    <br>
    <label></label>
    <button @click="remove(doc.id)">Remove</button>
  </div>
</template>

<script>
import Proxy from "../proxy";
export default {
  name: "Editor",
  props: {
    doc: {
      default: {
        title: "",
        text: ""
      }
    }
  },
  methods: {
    async remove(id) {
      await Proxy.delete(id);
      this.$emit("render");
    },
    change() {
      this.$emit("change");
    }
  }
};
</script>

<style scoped>
textarea {
  width: 98%;
  border: none;
  border-right: 1px solid #ccc;
  /* resize: none; */
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}
label {
  width: 49%;
}
</style>
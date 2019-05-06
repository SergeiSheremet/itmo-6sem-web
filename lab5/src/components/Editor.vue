<template>
  <div>
    <h1>
      <input v-model="doc.title" @change="change">
    </h1>
    <div class="input-output-wrapper">
      <textarea v-model="doc.content" @change="change"></textarea>
      <div class = "preview-md" v-html="compiledMarkdown"></div>
    </div>
    <br>
    <label></label>
    <button @click="remove(doc.id)">Remove</button>
  </div>
</template>

<script>
import ProxyService from "../proxy";
import marked from "marked";
export default {
  name: "Editor",
  props: {
    doc: Object
  },
  methods: {
    async remove(id) {
      await ProxyService.delete(id);
      this.$emit("render");
    },
    change() {
      this.$emit("change");
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.doc.content, { sanitize: true });
    }
  }
};
</script>

<style scoped>
textarea {
  width: 45%;
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
.input-output-wreapper {
  display: flex;
}
</style>
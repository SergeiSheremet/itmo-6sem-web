<template>
  <div>
    <h2>
      <input v-model="doc.title" @change="change">
      <button @click="save">Save</button>
      <button @click="create">Create</button>
    </h2>
    <div class="input-output-wrapper">
      <textarea v-model="doc.content" @change="change"></textarea>
      <div class="preview-md" v-html="compiledMarkdown"></div>
    </div>
    <br>
    <!-- <button @click="remove(doc.id)">Remove</button> -->
  </div>
</template>

<script>
const {ProxyService} = require('../proxy.js');
import marked from "marked";
export default {
  name: "Editor",
  props: {
    doc: {
      title: "new title",
      content: "# new document"
    }
  },
  methods: {
    remove: function(id) {
      ProxyService.delete(id);
      this.$emit("render");
    },
    create: function() {
      this.doc = new Object({
        title: "New",
        content: "# New"
      })
      this.renderList();
    },
    save: function() {
      var res = ProxyService.insert(doc.title, doc.content);
      //this.currentDoc = res.data;
      this.renderList();
    },
    change: function() {
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
  border: none;
  border-right: 1px solid #ccc;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
  display: block;
  resize: none;
}
label {
  width: 49%;
}
.input-output-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
}
.preview-md {
  border: none;
  border-right: 1px solid #ccc;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
  text-align: start;
  word-wrap: break-word;
}
</style>
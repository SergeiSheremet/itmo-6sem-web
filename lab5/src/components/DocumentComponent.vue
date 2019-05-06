<template>
  <div>
    <Editor :doc="currentDoc" v-on:render="rerenderList" v-on:change="onChange"/>
    <p>
      <Preview :text="currentDoc.body"/>
    </p>
    <h1>Documents</h1>
    <div>
      <div
        v-for="document in documents"
        v-bind:key="document._id"
        @click="select(document)"
      >{{document.title}}</div>
    </div>
    <button @click="add(doc)">Save</button>
  </div>
</template>

<script>
import Editor from "./Editor";
import Preview from "./Preview";
import Proxy from "../proxy";
export default {
  name: "DocumentComponent",
  data() {
    return {
      currentDoc: {
        body: "",
        title: ""
      },
      documents: []
    };
  },
  async created() {
    var res = await Proxy.get();
    this.documents = res.data;
    if (res.data.length > 0) {
      this.currentDoc = res.data[0];
    }
  },
  methods: {
    select(document) {
      this.currentDoc = document;
    },
    async onChange() {
      if (this.currentDoc._id) {
        await Proxy.update(
          this.currentDoc._id,
          this.currentDoc.title,
          this.currentDoc.body
        );
      } else {
        var res = await Proxy.insert(
          this.currentDoc.title,
          this.currentDoc.body
        );
        this.currentDoc._id = res.body;
      }
      this.rerenderList();
    },
    async add() {
      var res = await Proxy.insert("New Title", "New text");
      this.currentDoc = res.data;
      this.rerenderList();
    },
    async rerenderList() {
      var res = await Proxy.get();
      this.documents = res.data;
    }
  },
  components: {
    Editor,
    Preview
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
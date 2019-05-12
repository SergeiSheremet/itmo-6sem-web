<template>
  <div>
    <Editor :doc="currentDoc" v-on:render="renderList" v-on:change="onChange"/>
    <h1>Documents</h1>
    <div>
      <div
        v-for="document in documents"
        v-bind:key="document._id"
      ><button @click="select(document)">{{document.title}}</button> </div>
    </div>
    
  </div>
</template>

<script>
import Editor from "./Editor";
const {ProxyService} = require('../proxy.js');

export default {
  name: "DocumentComponent",
  data() {
    return {
      currentDoc: {
        title: "new title",
        content: "# new document"
      },
      documents: []
    };
  },
  mounted() {
    var res = {};
    const thisRef = this;
    ProxyService.index().then(
      function (result) {
        res = result;
      }
    ).then(function(){
    thisRef.documents = res.data;
    if (res.data.length > 0) {
      thisRef.currentDoc = res.data[0];
    }});
  },
  methods: {
    select(document) {
      this.currentDoc = document;
    },
    onChange() {
      if (this.currentDoc._id) {
        ProxyService.update(
          this.currentDoc._id,
          this.currentDoc.title,
          this.currentDoc.body
        );
      } else {
        var res = ProxyService.insert(
          this.currentDoc.title,
          this.currentDoc.body
        );
        this.currentDoc._id = res.body;
      }
      this.renderList();
    },
    add() {
      var res = ProxyService.insert("New Title", "New text");
      this.currentDoc = res.data;
      this.renderList();
    },
    renderList() {
      var res = ProxyService.index();
      this.documents = res.data;
    }
  },
  components: {
    Editor
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
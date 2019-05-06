<template>
  <div>
    <!-- <div class = "preview-md" v-html="compiledMarkdown"></div> -->
  </div>
</template>

<script>
import marked from "marked";
export default {
  name: "Preview",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.text, { sanitize: true });
    }
  }
};
</script>

<style>
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
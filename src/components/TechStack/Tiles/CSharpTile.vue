<script setup lang="ts">
import { ref, onMounted } from 'vue';
import jsonData from '@/data/techstack/csharp.json';

const title = ref('');
const description = ref('');
const icon = ref('');

onMounted(() => {
  try {
    title.value = jsonData.title;
    description.value = jsonData.description;
    icon.value = jsonData.icon;
  } catch (error) {
    console.error("Could not load C# data:", error);
    title.value = "C#";
    description.value = "Error loading content.";
    icon.value = "⚠️";
  }
});
</script>

<template>
  <div class="tile-content">
    <h2>{{ title }}</h2>
    <span class="separator"></span>
    <p>{{ description }}</p>
  </div>
</template>

<style scoped>
.tile-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: flex-start !important;
  height: 100%;
  width: 100%;
}

.separator{
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin-bottom: 8px;
}

h2 {
  font-size: 2rem; /* Adjust as needed */
  margin-bottom: 8px;
  color: #fff;
}

p {
  font-size: 1.1rem; /* Adjust as needed */
  color: #ccc;
  line-height: 1.4;
  text-align: left;
}
</style>

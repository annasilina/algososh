import {defineConfig} from "cypress";

export default defineConfig({
  projectId: 'wf9tpg',
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1400,
    viewportHeight: 900,
  },
});

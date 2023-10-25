# Para Testging

Dependencias:

- vitest
- happy-dom
- @testing-library/react
- @testing-library/user-event

# configurar vite.config.ts

```
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
  },
});
```

* Configurar las variables de entorno de VITE_BACKEND_URL

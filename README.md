# 🚀 Project Technology Stack Guide

### (Boilerplate for Next.js Applications)

Welcome to the **Next.js Boilerplate**! This guide provides a **comprehensive overview** of the core technologies used in this setup. It serves as a **reference for developers** to understand the stack, follow best practices, and efficiently utilize each tool.

By adhering to this guide, we ensure **consistency, scalability, and maintainability** across all projects using this boilerplate.

## 1. Styling & UI Components 🎨

### Tailwind CSS

**Why Tailwind?**

<ul>
<li>A utility-first CSS framework that enables rapid UI development.</li>
<li>Eliminates the need for writing custom CSS files.</li>
<li>Provides built-in responsive design utilities (sm:, md:, lg:, etc.).</li>
<li>Optimized for performance with purging unused styles in production.</li>
</ul>

**Example Usage:**

```
<div className="bg-gray-100 p-4 rounded-lg shadow-md">
  <h1 className="text-xl font-bold text-gray-900">Welcome to Tailwind</h1>
</div>
```

🔗 Docs: https://tailwindcss.com/docs

### ShadCN

**Why ShadCN?**

<ol>
<li>A collection of pre-built, customizable UI components.</li>
<li>Built on Radix UI and Tailwind CSS.</li>
<li>Fully accessible and themeable.</li>
<li>Great for building modern UIs quickly.</li>
</ol>

**Example Usage (Button Component)**

```
import { Button } from "@/components/ui/button";

export default function Example() {
    return <Button variant="outline">Click Me</Button>;
}
```

🔗 Docs: https://ui.shadcn.com

### 2. State Management 🔄

## Redux (Global State Management)

**Why Redux?**

<ul>
<li>Centralized state management.</li>
<li>Makes debugging and testing easier with tools like Redux DevTools.</li>
<li>Prevents prop drilling by providing a single source of truth.</li>
</ul>

**Example Usage (Setup Store)**

```
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
    reducer: {
    counter: counterReducer,
    },
});
```

🔗 Docs: https://redux.js.org/

## 🔹 RTK Query (Server State Management & API Fetching)

**Why RTK Query?**

<ul>
<li>Provides built-in caching, pagination, and optimistic updates.</li>
<li>Reduces boilerplate compared to traditional Redux API slices.</li>
<li>Handles loading, error, and success states efficiently.</li>
</ul>

**Example Usage (Fetching Data with RTK Query)**

```
import loginReducer from "@/lib/redux/slices/authSlice";
import { apiService } from "@/services";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      loginReducer,
      [apiService.reducerPath]: apiService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiService.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

```

🔗 Docs: https://redux-toolkit.js.org/rtk-query/overview

## 3. Form Handling & Validation ✅

### React Hook Form

**Why React Hook Form?**

<ul>
<li>Minimal re-renders → Improves performance.</li>
<li>Works with both controlled & uncontrolled components.</li>
<li>Simple integration with validation libraries like Zod.</li>
</ul>

Example Usage

```
import { useForm } from "react-hook-form";

export default function Example() {
const { register, handleSubmit } = useForm();

const onSubmit = (data) => console.log(data);

return (
<form onSubmit={handleSubmit(onSubmit)}>
<input {...register("email")} placeholder="Email" className="border p-2" />
<button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
</form>
);
}
```

🔗 Docs: https://react-hook-form.com/

## Zod (Schema Validation)

**Why Zod?**

<ul>
<li>TypeScript-first schema validation.</li>
<li>Ensures type safety for form data.</li>
<li>Works well with React Hook Form.</li>
</ul>

Example Usage (With React Hook Form)

```
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
email: z.string().email("Invalid email address"),
password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Example() {
const { register, handleSubmit, formState: { errors } } = useForm({
resolver: zodResolver(schema),
});

const onSubmit = (data) => console.log(data);

return (
<form onSubmit={handleSubmit(onSubmit)}>
<input {...register("email")} placeholder="Email" />
{errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} placeholder="Password" type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Submit</button>
    </form>

);
}
```

🔗 Docs: https://zod.dev/

## 4. Additional Tools & Best Practices 🔥

## Folder Structure Suggestion

```
📂 src
├── 📂 app
│   ├── 📂 auth
│   │   ├── 📂 components
│   │   ├── 📂 login
│   │   ├── 📂 layout
│   ├── 📂 protected
│   ├── 📂 public
├── 📂 components  # Reusable UI components
├── 📂 assets      # Static assets (images, fonts, etc.)
├── 📂 constants   # Constants and configuration files
├── 📂 hooks       # Custom React hooks
├── 📂 lib         # Utility functions and helpers
├── 📂 providers   # Context and global providers
├── 📂 services    # API service functions
├── 📂 types       # TypeScript type definitions

```

### Best Practices

<ul>
 <li>Use TypeScript for type safety.</li>
<li>Keep components small & reusable.</li>
<li>Use Redux only when necessary. RTK Query handles most server-state needs.</li>
<li>Write tests to maintain stability.</li>
</ul>

**Conclusion 🎯**

This guide serves as a reference for developers working on the project. By following these conventions, we ensure a consistent, scalable, and maintainable codebase.

Clone the repo and use It as a base for your project

```
git clone git@github.com:silveridahosa/web-app-boilerplate-nextjs.git
```

run the project with

```
npm run dev
```

or

```
yarn run dev
```

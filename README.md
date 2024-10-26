# Writer Hub Frontend

This is the frontend application for Writer Hub, built with Vue.js, TypeScript, Vue Router, and TanStack Query.

## Project setup

```bash
yarn create vue@latest writer-hub-fe
```

Install dependencies

```bash 
yarn add vue-router @tanstack/vue-query axios pinia pinia-plugin-persistedstate vue-quilly
```

Run the development server

``` bash
yarn dev
```

## Folder structure

```
├── src
│   ├── components
│   │   ├── auth
│   │   │   ├── TheLoginForm.vue
│   │   │   └── TheLoginRegisterLink.vue
│   │   ├── articles
│   │   │   └── TheArticleForm.vue
│   │   ├── companies
│   │   │   └── TheCompanyForm.vue
│   │   └── users
│   │       └── TheUserForm.vue
│   ├── views
│   │   ├── auth
│   │   │   └── LoginView.vue
│   │   ├── articles
│   │   │   ├── CreateArticleView.vue
│   │   │   └── EditArticleView.vue
│   │   ├── companies
│   │   │   ├── CreateCompanyView.vue
│   │   │   └── EditCompanyView.vue
│   │   ├── HomeView.vue
│   │   └── users
│   │       ├── CreateUserView.vue
│   │       └── EditUserView.vue
│   ├── router
│   │   └── index.ts
│   ├── stores
│   │   └── useUserStore.ts
│   ├── App.vue
│   └── main.ts
├── index.html
└── vite.config.ts
```

## Features

* Authentication (login, logout, protected routes)
* User management (for Editor role)
* Company management (for Editor role)
* Article management (create, edit, publish, list)
* Editor's dashboard
* Writer's dashboard

### Technologies used

* Vue.js 3
* TypeScript
* Vue Router
* TanStack Query
* Axios
* Pinia
* vue-quilly (WYSIWYG editor)
* Tailwind CSS

### Styling and layout

The application uses a top navigation bar inspired by Shadcn UI and a responsive layout.

### Error handling

Basic error handling is implemented to display user-friendly error messages.

### Validation

Basic form validation is implemented.

### Testing

No tests have been written yet.

### Future improvements

* Implement more robust error handling and validation.
* Write unit and end-to-end tests.
* Add more features and functionality as needed.

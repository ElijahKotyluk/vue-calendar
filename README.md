# vue-calendar

This is a static version of my vue-flask-calendar project, made for the purpose of deploying and posting the link on my portfolio.
Instead of Flask/Vuex to create events on the calendar, I am using purely Vuex.

## file structure

```
vue-moment-calendar/
  ├── *dist/
  ├── *node_modules/
  ├── vue_calendar/
  |   ├── assets/
  |   |   ├── js/
  |   |   |   ├── components/
  |   |   |   |   ├── App.vue
  |   |   |   |   ├── Calendar.vue
  |   |   |   |   ├── CalendarDays.vue
  |   |   |   |   ├── CurrentMonth.vue
  |   |   |   |   └── EventForm.vue
  |   |   |   ├── store/
  |   |   |   |   └── store.js
  |   |   |   ├── App.vue
  |   |   |   ├── main.js
  |   |   |   ├── routes.js
  |   |   |   └── services.js
  |   |   ├── styles/
  |   |   |   ├── _reset.scss
  |   |   |   ├── _variables.scss
  |   |   |   └── main.scss
  ├── .gitignore
  ├── app.yaml
  ├── Makefile
  ├── package.json
  ├── README.md
  ├── webpack.config.js
  └── *yarn.lock

```

Filenames denoted with an asterisk `*` are auto generated and should not be modified.

## file explanation

- `dist/` : Folder for bundled files.
  - `main.bundle.css` : Bundled CSS file.
  - `main.bundle.js` : Bundled Javascript file.
- `node_modules/` : Downloaded dependencies.
- `vue_calendar/` : Main application folder.
  - `assets/` : Assets folder.
    - `js/` : Javascript folder.
      - `components/` : Vue components.
        - `Calendar.vue` : Calendar component.
        - `CalendarDays.vue` : Component for rendering days in the calendar.
        - `CurrentMonth.vue` : Displays current month/selected month in header.
        - `EventForm.vue` : Component for displaying and saving events in the calendar.
      - `store/` : Vuex store folder.
        - `store.js` : Entrypoint for Vuex store.
      - `App.vue` : Main application component.
      - `main.js` : Main application entry point for Javascript.
      - `routes.js` : Application routes and routing utilities.
      - `services.js` : Application service bootstrap, classes and utilities.
    - `styles/` : Styles folder.
      - `_reset.scss` : Global style reset partial.
      - `_variables.scss` : SCSS variables partial.
      - `main.scss` : Main application entry point for SCSS.
- `.gitignore` : Tells git what files not to check in.
- `app.yaml` : App engine configuration settings file.
- `Makefile` : Project Makefile. Configures project build using `make`.
- `package.json` : Project metadata and dependencies.
- `README.md` : Project README.
- `webpack.config.js` : Webpack config. Configures bundling of frontend assets.
- `yarn.lock` : Yarn lockfile.

## getting started

1. Check out this repo: `git clone https://github.com/ElijahKotyluk/vue-calendar`
2. Locate and open `vue-calendar` file directory in the command line/terminal.
4. Run `make init` to install all Javascript.
5. Run `make` to bundle the front-end assets and run the webpack development server, then visit [http://localhost:8080](http://localhost:8080)

### to run subsequent times

1. `make`

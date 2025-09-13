# Angular Todolist App

<div style="display: flex; align-items: center;">
  <img src="images/5922789266331650669-portrait.png" width="256" alt="Example Image">
  <div style="display:flex; flex-direction: column;">
    <p style="margin-left: 15px;">
    A simple and flexible <b>Todo app built with Angular.</b> Originally created by AdrielHercules and NestorLT as a training project. It uses TailwindCSS for styling and CapacitorJS for cross-platform support.
    </p>
    <p>
        <h2>Features</h2>
        <ul>
            <li>
            📝 Create multiple lists to organize your tasks
            </li>
            <li>
            💾 Local persistence with SQLite (offline support)
            </li>
            <li>
            📱 Multiplatform support via CapacitorJS (Android, iOS, Web, Desktop)
            </li>
            <li>
            🎨 Multi-theme support with TailwindCSS
            </li>
        </ul>
    </p>
  </div>
</div>

## Download

1. Download the latest version from the Releases page (or build it yourself from source).
2. Run it on your preferred platform.

## Tech Stack

- Framework: Angular 20
- Cross-platform: CapacitorJS
- Styling: TailwindCSS
- Database: SQLite (via Capacitor plugin)
- Package Manager: npm

## How to Build

### Requirements

- Angular 20
- Node.js & npm

#### Clone the Project

``` bash
git clone https://github.com/AdrielHercules/todolist-frontend
cd folder
```

#### Install Dependencies

``` bash
npm install
```

#### Run Development Server

```bash
ng serve
```

### Building for android 📱

1. Build the project

```bash
ng build
```

2. Configure Android Build
Generate an [Android keystore](https://developer.android.com/studio/publish/app-signing?hl=es-419) and create a .env file with the following data:

```
KEYSTORE_PATH=""
KEYSTORE_PASSWORD=""
KEYSTORE_ALIAS=""
KEYSTORE_ALIAS_PASSWORD=""
```

3. Sync angular project with capacitor:

```bash
npx cap sync android
```

4. Build the Capacitor project:

```bash
npx cap build android
```

5. Or open it directly in Android Studio:

```bash
npx cap open android
```

> Check out the [CapacitorJS](https://capacitorjs.com/docs/) Docs for instructions on building for iOS or Desktop.

## Contributing

We welcome contributions! 🎉

- Submit issues
- Open pull requests
- Suggest or build new features

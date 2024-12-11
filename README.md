# StyleMirror

<h3>Backend</h3>
<ul>
  <li>https://github.com/wgraupmann/StyleMirrorBackend</li>
</ul>


# Setting Up the App

To run the application code in this repository, you need to update the following files with your configuration details:

## 1. Update Firebase Configuration

In the file `firebase.jsx`, locate the `firebaseConfig` object and replace the placeholder values with your Firebase project's configuration details:

```javascript
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 2. Update FAL API Configuration

1. Open the file `vtonService.jsx` in your preferred code editor.
2. Locate the configuration for `fal.config()`.
3. Update it to include your API key.

Replace or ensure the following line exists in `vtonService.jsx`:
```javascript
fal.config({
  credentials: "API_KEY"
});
```

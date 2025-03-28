# SimpleUI

SimpleUI is a lightweight, React-inspired framework for JavaScript front-end development that doesn't require any build or compilation steps. It provides a simple API for creating components with state and props, much like React, while abstracting away much of the boilerplate.

## Features

- **Component-based architecture:** Define UI components as functions.
- **State management with hooks:** Use `useState` to manage component state.
- **Props support:** Pass configuration data (props) to components.
- **Easy rendering:** Render components into selected DOM elements with a jQuery‑like API.
- **No build step required:** Write plain JavaScript and HTML, simplifying debugging and setup.

## Getting Started

### Installation

1. Download or clone the repository.
2. Include the `simpleUI.js` file in your HTML file:
   ```html
   <script src="simpleUI.js"></script>
   ```

### Basic Usage

1. Registering a Component:

Define a component as a function that accepts a props object and returns a DOM element. Use the provided useState hook to add state to your component.

```javascript
// Register the "Counter" component.
$UI.component("Counter", function(props) {
  // Initialize state with a default value of 0.
  const [count, setCount] = $UI.useState(0);

  // Create a container element.
  const container = document.createElement("div");

  // Use props for a custom title or fall back to a default.
  const title = document.createElement("h2");
  title.textContent = props.title || "Default Counter Title";
  container.appendChild(title);

  // Display the current count.
  const display = document.createElement("p");
  display.textContent = "Count: " + count;
  container.appendChild(display);

  // Button to increment the count.
  const button = document.createElement("button");
  button.textContent = "Increment";
  button.onclick = () => setCount(count + 1);
  container.appendChild(button);

  return container;
});
```

2. Rendering a Component:

Use the jQuery‑like selector provided by SimpleUI to render your component into a specific container. You can also pass props to configure the component.

```javascript
// Render the "Counter" component into the #app container with props.
$UI.$("#app").renderComponent("Counter", { title: "Counter Example with Props" });
```

### Complete Example
Below is a complete HTML example that demonstrates how to use SimpleUI:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SimpleUI Example</title>
  <style>
    body { font-family: Arial, sans-serif; }
    button { margin-top: 10px; }
  </style>
</head>
<body>
  <!-- Container where the component will be rendered -->
  <div id="app"></div>

  <!-- Include the SimpleUI library -->
  <script src="simpleUI.js"></script>
  <script>
    // Register a component named "Counter".
    $UI.component("Counter", function(props) {
      const [count, setCount] = $UI.useState(0);
      const container = document.createElement("div");

      // Display a title based on props.
      const title = document.createElement("h2");
      title.textContent = props.title || "Default Counter Title";
      container.appendChild(title);

      // Show the current count.
      const display = document.createElement("p");
      display.textContent = "Count: " + count;
      container.appendChild(display);

      // Create a button to increment the count.
      const button = document.createElement("button");
      button.textContent = "Increment";
      button.onclick = () => setCount(count + 1);
      container.appendChild(button);

      return container;
    });

    // Render the "Counter" component into the element with id "app" and pass a prop.
    $UI.$("#app").renderComponent("Counter", { title: "Counter Example with Props" });
  </script>
</body>
</html>
```

## API Documentation

`$UI.component(name, renderFn)`
* Purpose: Registers a new component.
* Parameters:
    * name (string): The unique name for the component.
    * renderFn (function): The function that defines the component. It receives a props object and must return a DOM element.

`$UI.useState(initialValue)`
* Purpose: A hook to manage state within a component.
* Parameters:
    * initialValue (any): The initial state value.
    * Returns: An array with two elements:
        * The current state.
        * A function to update the state, which triggers a re-render of the component.

`$UI.render(name, container, props)`
* Purpose: Renders a registered component into a given DOM container.
* Parameters:
    * name (string): The name of the registered component.
    * container (DOM element): The container element where the component should be rendered.
    * props (object, optional): An object containing properties passed to the component.

`$UI.$(selector)`
* Purpose: A jQuery-like selector to easily reference DOM elements and render components.
    * Returns: An object with:
        * renderComponent(name, props): Renders a component into the selected container.
        *2.* container: The DOM element matching the selector.

## Contributing
Contributions are welcome! If you have suggestions or improvements, please feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

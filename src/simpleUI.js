(function(global) {
  // Storage for registered components.
  const components = {};
  // Global storage for each component's hook values keyed by component name.
  const componentState = {};

  // Variables to track the current rendering component's state.
  let currentComponent = null;
  let hookIndex = 0;

  // Register a component by name.
  function component(name, renderFn) {
    components[name] = renderFn;
  }

  // A simple useState hook that persists state across re-renders.
  function useState(initialValue) {
    const stateIndex = hookIndex;
    // Initialize state if it doesn't exist.
    if (currentComponent.hooks[stateIndex] === undefined) {
      currentComponent.hooks[stateIndex] = initialValue;
    }
    const setState = (newValue) => {
      // Update the hook state.
      currentComponent.hooks[stateIndex] = newValue;
      // Save the updated state in our global storage.
      componentState[currentComponent.name] = currentComponent.hooks;
      // Re-render the component, preserving its props.
      render(currentComponent.name, currentComponent.container, currentComponent.props);
    };
    hookIndex++;
    return [currentComponent.hooks[stateIndex], setState];
  }

  // Render a registered component into a container element, with optional props.
  function render(name, container, props = {}) {
    const compFn = components[name];
    if (!compFn) {
      console.error(`Component "${name}" is not registered.`);
      return;
    }
    // Retrieve previous hooks if available, otherwise start with an empty array.
    const previousHooks = componentState[name] || [];
    // Set up the current component context.
    currentComponent = { hooks: previousHooks, name, container, props };
    hookIndex = 0;
    // Call the component render function with props and expect a DOM element.
    const element = compFn(props);
    // Clear container and attach the new element.
    container.innerHTML = "";
    container.appendChild(element);
  }

  // Simple jQuery-like selector to render a component.
  function $(selector) {
    const container = document.querySelector(selector);
    return {
      renderComponent: function(name, props = {}) {
        render(name, container, props);
      },
      container: container
    };
  }

  // Expose our API on a global object.
  global.$UI = {
    component,
    useState,
    render,
    $
  };
})(window);

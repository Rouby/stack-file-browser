# How to run

Run `yarn install`

Run `yarn start`

# How to test

I wanted to add cypress component tests to test my components. I couldnt get the webpack config to "just work" with cypress and settled on using vite-dev-server which works for this simple use-case.

# Where did I put my stuff?

## Reading directories

I put the code to read directories straight into the ipc event handler in [main.ts](./src/main/main.ts). The frontend sends a message to the backend to read a directory. The backend sends a message to the frontend with the result.

## Rendering directories

There are two main components responsible for handling the logic and ui of rendering directories.

`FilePanel` utilizes a hook to send the event and receive the results of a directory-listing. It also delegates the rendering of the list to `FileList` and depending if the user wants to see further subdirectories, it delegates the rendering of the subdirectories to another `FilePanel`.

The `FileList`s are rendered on the same level in the DOM and simply aligned within a grid.

## Key navigation

The key navigation is a little naive in the sense that it relies on the structure of the DOM. I wanted to utilize default browser behavior (focus) and chose to pass the normal focus instead of handling it via state and styling. This way the user can use the arrow keys, as well as default tabbing, or even screen reader / assistant navigation.


# This is the project that shows lists of products:
When you open the project it loads a list of products either from the seed or from the localStorage:
![alt text](image.png)
When pressing an element the details panel opens on the right:
![alt text](image-1.png)
you can update the item
when you press the 'add' button an empty detail page should open so that you can add a new product, validation pending
pressing delete button on an ittem leads to the deletion of the product
adressing the route '/products/:id' when ID is an ID of an existing object
will open the page with the panel open with the chosen product.
if you want to know which items are available you can watch the list of products in the console.log
![alt text](image-2.png)
it has pagination and filtering based on the select box and the text box above:
![alt text](image-3.png)
the pages are paginated
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `npm install`
because I erased the node_modules. and then
### `npm start`
that's what I did to run the project
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

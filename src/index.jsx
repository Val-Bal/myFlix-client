import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
// import "bootstrap/dist/css/bootstrap.min.css";
// remove above and add after adding @import '~bootstrap/scss/bootstrap.scss' to index.scss;

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

import { Container } from "react-bootstrap";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Container>
    <MainView />
  </Container>
);
  };

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);

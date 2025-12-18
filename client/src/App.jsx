import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 className="text-red-400">Hello</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

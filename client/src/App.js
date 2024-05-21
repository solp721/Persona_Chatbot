import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./Components/Test";
import RootLayout from "./Layouts/RootLayout/RootLayout";
import Main from "./Pages/Main/MainPage";
import Chat from "./Pages/Chat/ChatPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/test" element={<Test />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

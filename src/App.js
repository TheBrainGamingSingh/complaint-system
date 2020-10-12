import React from 'react';
import Navbar from "./components/Navbar";
import ComplaintForm from "./components/ComplaintForm";

const App = () =>
{
  return(
    <div>
      <Navbar />
      <ComplaintForm />
      <p>My Token = {window.token} (this line to be removed once development complete)</p>
    </div>
  );
}

export default App;

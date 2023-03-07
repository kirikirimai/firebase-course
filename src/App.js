import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);

  const moveisCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      //read the data
      //set the movie list
      try {
        const data = await getDocs(moveisCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieList();
  }, []);

  return (
    <div className="App">
      <Auth />
    </div>
  );
}

export default App;

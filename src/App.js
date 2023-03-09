import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/auth";
import { db,auth } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  //newmovie
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //update title
  const [updateTitle, setUpdateTitle] = useState("")

  const moveisCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    //read the data
    //set the movie list
    try {
      const data = await getDocs(moveisCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moveisCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId:auth?.currentUser?.uid
      });

      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
    getMovieList();
  }

  const updateMovieTitle = async (id,) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc,{title:updateTitle})
    getMovieList();
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>RecievedOscar</label>
        <button onClick={onSubmitMovie}>登録</button>
      </div>
      <div>
        {movieList.map((movie, idx) => (
          <div key={idx}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date:{movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>削除</button><br/>
            <input onChange={(e) => setUpdateTitle(e.target.value)} type="tex" placeholder="update..." />
            <button onClick={()=>updateMovieTitle(movie.id)}>タイトル更新</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

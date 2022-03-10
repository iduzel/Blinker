import React from 'react'
import Blink from './Blink'

const Home = () => {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);

  // States
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!userData) navigate("/"); // check if user is logged in and if not redirect him to login page

    const getData = async () => {
      const response = await axios.get("/posts/list");

      console.log("home loading: response is", response);

      setPosts([...response.data]);
    };

    getData();
  }, []);

  return (
    <div>
      <h1>HELLO FROM HOME</h1>
    </div>
  );
};

export default Home;

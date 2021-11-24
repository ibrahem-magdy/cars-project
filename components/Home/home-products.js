import { Box } from "@chakra-ui/react";

const HomeProducts = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:4000/products");
      const data = await response.json();
      setLoading(false);
      setCars(data);
    };
    getData();
  }, []);
  return <Box></Box>;
};

export default HomeProducts;

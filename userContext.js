import { createContext, useState } from "react";

const UserContext = createContext();
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

const CarContext = createContext();
const CarProvider = CarContext.Provider;
const CarConsumer = CarContext.Consumer;

const User = ({ children }) => {
  const [user, setUser] = useState("");

  const updateUser = (update) => {
    setUser(update);
  };
  console.log(user);

  return <UserProvider value={{ user, updateUser }}>{children}</UserProvider>;
};

const Car = ({ children }) => {
  const [cars, setCars] = useState([]);

  const addCar = (id) => {
    console.log(typeof cars);

    setCars(new Set([...cars, id]));
  };

  const removeCar = (id) => {
    const currentCars = [...cars];

    const deletation = currentCars.filter((e) => {
      return e != id;
    });

    setCars(deletation);
  };
  console.log(cars);

  return (
    <CarProvider value={{ cars, addCar, removeCar }}>{children}</CarProvider>
  );
};

export { UserConsumer, UserContext, CarContext, Car };

export default User;

import { createContext, useState, useEffect } from "react";

const UserContext = createContext();
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

const CarContext = createContext();
const CarProvider = CarContext.Provider;
const CarConsumer = CarContext.Consumer;

// const storage = () => {
//   const store = localStorage.getItem("cars");

//   return store;
// };

const User = ({ children }) => {
  const [user, setUser] = useState("");

  const updateUser = (update) => {
    setUser(update);
  };

  return <UserProvider value={{ user, updateUser }}>{children}</UserProvider>;
};

const Car = ({ children }) => {
  const [cars, setCars] = useState([]);

  // useEffect(() => {
  //   const storeCars = () => {
  //     const storeCar = cars;
  //     localStorage.setItem("cars", JSON.stringify(storeCar));
  //   };
  //   storeCars();
  // }, [cars]);

  const addCar = (id, img, name, date) => {
    const currentCars = [...cars, { id, date, img, name }];

    const filteredArr = Array.from(
      currentCars.reduce((map, obj) => map.set(obj.id, obj), new Map()).values()
    );

    setCars(filteredArr);
  };

  const removeCar = (id) => {
    const currentCars = [...cars];

    const deletation = currentCars.filter((e) => {
      return e.id != id;
    });

    setCars(deletation);
  };

  return (
    <CarProvider value={{ cars, addCar, removeCar }}>{children}</CarProvider>
  );
};

export { UserConsumer, UserContext, CarContext, Car };

export default User;

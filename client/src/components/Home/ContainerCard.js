import React from "react";
import Swipe from "./Swipe";

export default function ContainerCard() {
  const URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    fetch(`${URL}/questions/?nb=3`)
      .then((res) => res.json())
      .then((res) => {
        //console.log(res);
      });
  }, []);

  return (
    <div className="container-cards">
      <Swipe />
    </div>
  );
}

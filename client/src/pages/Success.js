import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import {ADD_ORDER} from "../utils/mutations.js";
import Jumbotron from "../components/Jumbotron";
import {idbPromise} from "../utils/helpers";

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
    async function saveOrder() {
        const cart = await idbPromise('cart', 'get');

        const products = cart.map(item => item._id);

        if (products.length) {
            const { data } = await addOrder({ variables: { products } });
            const productData = data.addOrder.products;
          
            productData.forEach((item) => {
              idbPromise('cart', 'delete', item);
            });
        }

        // after 3 seconds on the "thank you for your purchase" page, relocate to homepage
        setTimeout(() => {
            window.location.assign('/');
        }, 3000);
    }

    saveOrder();
    }, [addOrder]);

    return (
      <div>
        <Jumbotron>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
        </Jumbotron>
      </div>
    );
};
  
export default Success;
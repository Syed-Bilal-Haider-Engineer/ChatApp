import React, {lazy, Suspense} from "react";

//Dynamic routing
const Cat = lazy(()=> import('../../components/Cat'))

const GeneralApp = () => {
  return (
    <>
      <Suspense fallback="Loading ...">
        <Cat/>
      </Suspense>
    </>
  );
};

export default GeneralApp;

import React from "react";
import IconLoadingComponent from "../asseets/icons/IconLoading.component";

const Preloader = () => {
  return (
    <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0">
      <IconLoadingComponent></IconLoadingComponent>
    </div>
  );
};

export default React.memo(Preloader);

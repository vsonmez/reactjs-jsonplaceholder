import React from "react";
import TPhoto from "../../models/photo/photo.type";
import UpperCaseComponent from "../../components/UpperCase.component";

const PhotoListItem = ({ photo }: { photo: TPhoto }) => {
  return (
    <div className="border rounded overflow-hidden">
      <img src={photo.thumbnailUrl} alt={photo.title} className="w-full" />
      <span className="p-2 block text-center">
        <UpperCaseComponent
          value={photo.title}
          isOnlyFirstLetter
        ></UpperCaseComponent>
      </span>
    </div>
  );
};

export default React.memo(PhotoListItem);

import React from "react";
import { Link } from "react-router-dom";

const block = { display: "block" };

const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <h2>お探しのページは見つかりませんでした</h2>
      <Link to="/" style={block}>
        ホームページに戻る
      </Link>
    </div>
  );
};

export default NotFoundPage;

import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>Couldn't find that page. Sorry!</p>
        <Link className="button button--link" to="/">Head home</Link>
      </div>
    </div>
  );
}

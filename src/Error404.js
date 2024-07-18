import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="error">
      <h1>
        404: page not found
      </h1>
      <div>
        Back to <Link to="/">home page</Link>
      </div>
      
    </div>
  );
}
 
export default Error404;
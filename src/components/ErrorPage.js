import { useRouteError } from "react-router"

function ErrorPage() {
  const errObj = useRouteError();
// console.log(errObj);

  return (<>
    <h2>Error page   
    </h2>
    <h1>{errObj.status}:{errObj.statusText}</h1>
  </>
  )
}

export default ErrorPage

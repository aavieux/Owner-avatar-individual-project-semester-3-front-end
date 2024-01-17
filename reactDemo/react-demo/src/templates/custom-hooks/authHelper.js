import FetchData from "./FetchData";
export const isAuthenticated = () => {

    const token = localStorage.getItem('authToken');
    if (!token){
        return false;
    }

    // console.log(JSON.stringify(localStorage.getItem("authToken")));
    const {data: isTokenExpired, error: isTokenValidError, loading: loading} = FetchData("POST", "/auth/tokenexpired", 0,
       token)

    if (isTokenValidError || isTokenExpired === true){
        console.log("Error: " + isTokenValidError)
        if(isTokenExpired){
            console.log("Data: " + isTokenExpired)
        }
        return false;
    }
    return true; // return true

};
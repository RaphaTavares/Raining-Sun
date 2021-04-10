import useFetch from "./useFetch";

const Home = () => {
  const {data: weather} = useFetch('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_ACCESSKEY + '&query=Juiz de Fora');

    console.log(process.env.REACT_APP_ACCESSKEY);
    if(weather)
      if(weather.current)
        console.log(weather.current.temperature);
    return (
        <div className="home">
            <h1>Hello World</h1>
        </div>
      );
}
 
export default Home;
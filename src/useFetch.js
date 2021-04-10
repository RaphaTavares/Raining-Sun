import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() =>{
        fetch(url)
        .then(res =>{
            if(!res.ok){ throw Error('ta dando erro fodas');}
            return res.json()})
        .then(data =>{ setData(data)
        console.log("data: " + data)})
        .catch(err =>{setError(err)
        console.log("erro2r: " + err.message)})
    }, [])

    return {data};
}
 
export default useFetch;
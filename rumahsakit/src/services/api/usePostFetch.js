import Endpoint from "./endpoint"

async function usePostFetch(path, data){
    return await new Promise((resolve, reject)=>{
        fetch(`${Endpoint}/${path}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default usePostFetch
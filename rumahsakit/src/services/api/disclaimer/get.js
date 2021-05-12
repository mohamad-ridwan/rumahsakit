import Endpoint from "../endpoint"

const GetDisclaimer = async (path) => {
    return await new Promise((resolve, reject) => {
        fetch(`${Endpoint}/${path}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default GetDisclaimer;
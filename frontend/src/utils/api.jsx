//import axios from "axios";

export const makePOSTrequest = async (url, data, token="") => {

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json()
        console.log(responseData);
        return responseData;
    } catch(error) {
        console.log("Error posting data:", data);
        return error;
    }
};
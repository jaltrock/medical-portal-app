//import axios from "axios";

export const makeGETrequest = async(url, token = "") => {
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error fetching data:", error);
        return error;
    }
};

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
import axios from "axios";

export const register = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.body) return;

  const result = await response.json();

  return result.data;
};

export const login = async (url, data) => {
  try {
    const response = await axios.post(url, {data},
      {
        headers : {
          "Content-Type" : "application/json"
        }
      })
    const result = await response.json();
    console.log(result.data.token)
    return result.data.token
  } catch (error) {
    console.log(error)
  }
  
};

export const getUserProfile = async(url,token) => {
  try {
    const result = await axios.get(url,{
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : token
      }
    })
    // return console.log(result.data)
    return result?.data?.data
  } catch (error) {
    if(error)return console.error(error)
  }
}


export const getPostApi = async (url,token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const getAllProfile = async(url,token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error)
  }
}

export const postApi = async(url,data,token) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : token
      },
      body: JSON.stringify(data),
    });
  
    if (!response.body) return;
  
    const result = await response.json();
    return result.data;

  } catch (error) {
    console.error(error)
  }
}

// export const postApi = async(url,data,token) => {
//   try {
//     const response = await axios.post(url, data, {
//       headers : {
//         "Content-Type" : "application/json",
//         "Accept" : "application/json",
//         "Authorization" : token
//       }
//     })

//     const result = await response.json()
//     return result.data
//   } catch (error) {
//     console.error(error)
//   }
// }
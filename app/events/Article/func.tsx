
import { API_KEY, ROOT_URL } from "@/components/data/func";
import axios from "axios";

export async function uploadImage(file: any) {
  const URL: string = `${ROOT_URL}upload.php?api=${API_KEY}`;
  const formData = new FormData();
  formData.append("file", file);

  const resp = await fetch(URL, {
    method: "POST",
    body: formData,
  });
  const data = await resp.json();
  if (data.success) {
    return data;
  } else {
    return false;
  }
}
export async function uploadArticle(
  title: string,
  body: string,
  image: string,
  type: string,
  url: string,
  tags: string,
  status:string
) {
  const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}`;

  try {
    const response = await axios.post(
      URL,
      JSON.stringify({
        title,body,image,type,url,tags,status
      })
    );

    if (response.status === 201) {
      const data = response.data;
      console.log("News Added");
      return true;
    } else {
      const data = response.data;
      console.log("Failed to Add News");
      return false;
    }
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}




export async function updateArticle(
  id:string,
  title: string,
  body: string,
  image: string,
  type: string,
  url: string,
  tags: string,
  status:string
) {
  const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}&id=${id}`;

  try {
    const response = await axios.put(
      URL,
      JSON.stringify({
        title,body,image,type,url,tags,status
      })
    );

    if (response.status === 200) {
      const data = response.data;
      console.log("Article Updated");
      return true;
    } else {
      const data = response.data;
      console.log("Failed to Update Article");
      return false;
    }
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}
// export async function uploadImage(file: any,folder:string) {
//   const URL: string = `${ROOT_URL}admin/upload.php?api=${API_KEY}`;
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("folder", folder);

//   const resp = await fetch(URL, {
//     method: "POST",
//     body: formData,
//   });
//   const data = await resp.json();
//   return data;
// }




export async function getArticle(
    quary:any
) {
  const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}&${quary}`;
  
  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to get News:", response.statusText);
      return null; 
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}


export async function getArticlebyId(
    id:string
) {
  const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}&id=${id}`;
  
  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Failed to get Article ${id} :`, response.statusText);
      return null; 
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getArticlebyCategory(
  category:string
) {
const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}&category=${category}`;

try {
  const response = await axios.get(URL);

  if (response.status === 200) {
    return response.data;
  } else {
    console.error(`Failed to get ${category} Articles :`, response.statusText);
    return null; 
  }
} catch (error) {
  console.error("Error:", error);
  return null;
}
}

export async function getArticlebyCount(
  count:string
) {
const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}&count=${count}`;

try {
  const response = await axios.get(URL);

  if (response.status === 200) {
    return response.data;
  } else {
    console.error(`Failed to get ${count} Articlesb:`, response.statusText);
    return null; 
  }
} catch (error) {
  console.error("Error:", error);
  return null;
}
}

export async function getArticlebyCategorywithCount(
  count:string,category:string
) {
const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}&count=${count}&category=${category}`;

try {
  const response = await axios.get(URL);

  if (response.status === 200) {
    return response.data;
  } else {
    console.error(`Failed to get ${count} Articlesb:`, response.statusText);
    return null; 
  }
} catch (error) {
  console.error("Error:", error);
  return null;
}
}


export async function getArticlesasNewArray(
) {
const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}&action=catbasedarray`;

try {
  const response = await axios.get(URL);

  if (response.status === 200) {
    return response.data;
  } else {
    console.error(`Failed to get Articlesb:`, response.statusText);
    return null; 
  }
} catch (error) {
  console.error("Error:", error);
  return null;
}
}




export async function deleteArticle(
    id:string
) {
  const URL: string = `${ROOT_URL}news/actions.php?api=${API_KEY}&id=${id}`;
  
  try {
    const response = await axios.delete(URL);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to delete Article:", response.statusText);
      return null; 
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export const apiService = {
  baseUrl: "http://localhost:8000", // Change to your Django backend URL

  async request(endpoint, method = "GET", data = null) {
    const url = this.baseUrl + endpoint;
    const headers = {
      "Content-Type": "application/json"
    };
    
    // Add authorization header if token exists
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Token ${token}`;  // Changed from Bearer to Token for Django REST framework
    }
    
    const options = {
      method,
      headers,
      credentials: "include" // Include cookies for sessions if needed
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(url, options);
      
      // Parse JSON response if available
      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      
      // Handle API error responses
      if (!response.ok) {
        const error = new Error(responseData.message || "API request failed");
        error.response = { 
          status: response.status, 
          data: responseData 
        };
        throw error;
      }
      
      return responseData;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  },
  
  get(endpoint) {
    return this.request(endpoint);
  },
  
  post(endpoint, data) {
    return this.request(endpoint, "POST", data);
  },
  
  put(endpoint, data) {
    return this.request(endpoint, "PUT", data);
  },
  
  delete(endpoint) {
    return this.request(endpoint, "DELETE");
  }
}; 
import apiService from "@/config/api/apiService";
import { processErrorResponse, processResponseData } from "@/config/api/responseApi";

export async function getAllUser(params: any, staticUrl = "") {
    try {
      const url = staticUrl !== "" ? staticUrl : "user";
      const response = await apiService.get(url, { params });
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }
  
  export async function createUser(data: any) {
    try {
      const response = await apiService.post("user", data);
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }
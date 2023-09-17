import apiService from "@/config/api/apiService";
import { processErrorResponse, processResponseData } from "@/config/api/responseApi";

export async function getAllProduct(params: any, staticUrl = "") {
    try {
      const url = staticUrl !== "" ? staticUrl : "/product";
      const response = await apiService.get(url, { params });
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }
  
  export async function addProduct(data: any) {
    try {
      const response = await apiService.post("/product", data);
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }

  export async function editProduct(data: any) {
    try {
      const response = await apiService.put("/product", data);
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }

  export async function deleteProduct(id: number) {
    try {
      const response = await apiService.delete(`/product/${id}`);
      return processResponseData(response);
    } catch (error) {
      return processErrorResponse(error);
    }
  }
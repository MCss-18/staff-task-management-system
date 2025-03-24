import { HTTPSTATUS } from "../../config/http.config.js";
import { CategoryDelayService } from "./categoryDelay.service.js";

export class CategoryDelayController {

  async getCategoryDelay(req, res) {
    try {
      let categoryDelayService = new CategoryDelayService();
      const categoryDelay = await categoryDelayService.getCategoryDelay();

      return res.status(HTTPSTATUS.OK).json({
        message: "Category delay successfully obtained",
        categoryDelay: categoryDelay
      });
    } catch (error) {
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: "Error al obtener las categorias de demora", error 
      });
    }
  }

}
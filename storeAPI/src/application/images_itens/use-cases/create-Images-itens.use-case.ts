import { v4 as uuidv4 } from "uuid";
import ImageItens from "../../../models/images_itens.model";
import { S3Controller } from "../../s3/controller/s3.cotroller";

export class CreateImageItemUseCase {
  static async execute(createImageItemDTO: any) {
    const { file, fk_id_item } = createImageItemDTO;

    if (!file) {
      throw new Error("No file provided");
    }

    try {
      // Simula o objeto `req` do Express
      const req = {
        file, // Passa o arquivo para o `req.file`
      };

      // Simula o objeto `res` do Express
      let s3Response: any;
      const res = {
        status(code: number) {
          console.log(`Status code: ${code}`);
          return this;
        },
        json(data: any) {
          console.log("Response data:", data);
          s3Response = data; // Armazena a resposta para ser usada no use case
          return data;
        },
      };

      // Chama o método do S3Controller com os objetos simulados
      await S3Controller.CreateImage(req, res);

      // Verifica se a resposta do S3 é válida
      if (
        !s3Response ||
        !s3Response.data || // A resposta do S3 está dentro de `data`
        !s3Response.data.Location ||
        !s3Response.data.Key
      ) {
        throw new Error("Invalid response from S3Controller");
      }

      // Extrai a URL e a chave do S3 da resposta
      const { Location: url, Key: key } = s3Response.data;

      // Cria o registro no banco de dados
      const newFile = await ImageItens.create({
        id: uuidv4(),
        url,
        key,
        fk_id_item,
      });

      return newFile;
    } catch (error) {
      console.error("Error in CreateImageItemUseCase:", error);
      throw new Error("Failed to create image item");
    }
  }
}

import { Router } from "express";
import merchantRoutes from "../application/merchant/merchant.routes";
import authRoutes from "../application/auth/auth.routes";
import categoryRoutes from "../application/categories/categories.routes";
import storeRoutes from "../application/store/store.routes";
import storeCustomizationsRoutes from "../application/store/store-customizations.routes";
import itensRoutes from "../application/itens/itens.routes";
import S3Routes from "../application/s3/s3routes/s3.routes";
import S3banner from "../application/s3/s3routes/banner.s3.routes";
import S3item from "../application/s3/s3routes/item.s3.routes";
import ImagesItens from "../application/images_itens/images_itens.routes";
import stripeRoutes from "../application/stripe/stripe.routes";

const routes = Router();

routes.use("/merchant", merchantRoutes);
routes.use("/auth", authRoutes);
routes.use("/category", categoryRoutes);
routes.use("/store", storeRoutes);
routes.use("/storeCustomizations", storeCustomizationsRoutes);
routes.use("/item", itensRoutes);
routes.use("/S3", S3Routes);
routes.use("/S3banner", S3banner);
routes.use("/S3item", S3item);
routes.use("/imagesItens", ImagesItens);
routes.use("/stripe", stripeRoutes);

export default routes;

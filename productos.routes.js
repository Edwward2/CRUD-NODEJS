import {
    Router
} from "express";

import {

    createProducto,
    deleteProducto,
    getProducto,
    getProductos,
    updateProducto
} from "../controllers/producto.controllers";


const router = Router()

router.get("/productos", getProductos);

router.get("/producto/:id", getProducto);

router.post("/producto", createProducto);

router.put("/producto/:id", updateProducto);

router.delete("/producto/:id", deleteProducto);


export default router
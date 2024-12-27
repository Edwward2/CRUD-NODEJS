 import nodemon from "nodemon"
 import {
     getConecction
 } from "../database/connection"

 import sql from 'mssql'


 export const getProductos = async (req, res) => {
     const pool = await getConecction()

     const result = await pool.request().query('SELECT * FROM productos')
     res.json(result.recordset)
 }


 export const getProducto = async (req, res) => {

     const pool = await getConecction()
     const result = await pool
         .request()
         .input('id', sql.Int, req.params.id)
         .query('SELECT * FROM productos WHERE id = @id')
     console.log(result);


     if (result.arrowAffected[0] === 0) {
         return res.status(400).json({
             message: "producto no encontrado"
         });

     }
     return res.json(result.recordset[0]);

 }

 export const createProducto = async (req, res) => {
     console.log(req.body)

     const pool = await getConecction()
     pool.request()
         .input('NombreProd', sql.VarChar, req.body.NombreProd)
         .input('Descripcion', sql.VarChar, req.body.Descripcion)
         .input('Precio', sql.Decimal, req.body.Precio)

         .query('INSERT INTO Productos (NombreProd, Descripcion, Precio) VALUES (@nombre, @descripcion, @precio); SELECT SCOPE_IDENTITY() AS id;'

         );

     res.json({
         id: result.recordset[0].id,
         NombreProd: req.body.nombre,
         Descripcion: req.body.Descripcion,
         Precio: req.body.Precio
     })
 }

 export const updateProducto = async (req, res) => {

     const pool = await getConecction()
     const result = await pool.request()

         .input("id", sql.Int, req.params.id)
         .input("NomcbreProd", sql.VarChar, req.body.NombreProd)
         .input("Descripcion", sql.VarChar, req.body.Descripcion)
         .input("precio", sql.Decimal, req.body.Precio)
         .query('UPDATE productos SET NombreProd, Descripcion, Precio) VALUES (@nombre, @descripcion, @precio WHERE id = @id')

     console.log(result);
     if (result.arrowAffected[0] === 0) {
         return res.status(400).json({
             message: "producto no encontrado"
         });

         res.json({
             id: req.params.id,
             NombreProd: req.body.NombreProd,
             Descripcion: req.body.Descripcion,
             Precio: req.body.Precio,
         });
     }
 }


 export const deleteProducto = async (req, res) => {

     const pool = await getConecction()
     const result = await pool.request()
         .input("id", sql.Int, req.params.id)
         .query("DELETE FROM productos WHERE id = @id");

     console.log(result)
     res.send("eliminando un  producto");

     if (result.arrowAffected[0] === 0) {
         return res.status(400).json({
             message: "producto no encontrado"
         });

     }
     return res.json({
         message: "producto eliminado"
     })
 }
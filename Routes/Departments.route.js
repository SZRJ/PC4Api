const express = require('express');
const router = express.Router();

const Department = require('../Models/Departments.model')

/**
 * @swagger
 * components:
 *  schemas:
 *    Department:
 *      type: object
 *      properties:
 *          name:
 *            type: string
 *            description: Nombre del departamento
 *            example: Medicina
 *          location:
 *            type: string
 *            description: Nombre de la direccion
 *            example: AvCalleWallaby
 *      required:
 *        -name
 *        -location
 
 *         
 */    

/**
 * @swagger
 * /Departments:
 *  get:
 *      summary: Ver todos los departamentos
 *      tags: [Department]
 *      responses:
 *        200:
 *          description: Todos los departamentos
 *          content:
 *              application/json:
 *                  schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Department'
 *      
 */
router.get('/',async (req,res,next)=>{
    try{
        const results = await Department.find();
        res.send(results);
    }catch(error){
        console.log(error.message);
    }

})

/**
 * @swagger
 * /Departments:
 *  post:
 *      summary: Crear un departamento
 *      tags: [Department]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Department'
 *      responses:
 *        200:
 *          description: Departamento creado
 *      
 */
router.post('/',async (req,res,next)=>{
    try{
        const deparment = new Department(req.body);
        const result = await deparment.save();
        res.send(result);
    }catch(error){
        console.log(error.message);
    }
    
});
/**
 * @swagger
 * /Departments/{id}:
 *  delete:
 *      summary: Borrar departamento
 *      tags: [Department]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           required: true
 *           description: Departamento id
 *      responses:
 *        200:
 *          description: Departamento borrado
 *      
 */
router.delete('/:id',async (req,res,next)=>{
    const id =req.params.id;
    try{
        const result = await Department.findByIdAndDelete(id);
        res.send(result);
    }catch(error){
        console.log(error.message);
    }
});
/**
 * @swagger
 * /Departments/{id}:
 *  patch:
 *   summary: Actualizar departamento
 *   tags: [Department]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: Departamento id
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *      schema:
 *        type: object
 *        $ref: '#/components/schemas/Department'
 *  responses:
 *      200:
 *          description: Departamento borrado
 *      
 */
router.patch('/:id',async (req,res,next)=>{
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = {new : true};

        const result = await Department.findByIdAndUpdate(id,updates);
        res.send(result)
    } catch (error){
        console.log(error.message)
    }
});
module.exports= router;
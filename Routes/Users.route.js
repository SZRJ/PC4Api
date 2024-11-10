const express = require('express');
const router = express.Router();

const User = require('../Models/Users.model')
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *          firstName:
 *            type: string
 *            description: Nombre
 *            example: Tenko
 *          lastName:
 *            type: string
 *            description: Apellido
 *            example: Chabashira
 *          email:
 *            type: string
 *            description: correo
 *            example: tenkobeloved@email.com
 *          role:
 *            type: string
 *            description: Cargo que tiene en la empresa
 *            example: CEO
 *          password:
 *            type: string
 *            description: contraseña
 *            example: nilouisherwife
 *          creationDate:
 *            type: date
 *            description: Cuando se creo la cuenta
 *            example: 2021/06/16
 *      required:
 *        -firstName
 *        -lastName
 *        -email
 *        -role
 */ 

/**
 * @swagger
 * /Users:
 *  get:
 *      summary: Ver todos los usuarios
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: Todos los Usuarios
 *          content:
 *              application/json:
 *                  schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Users'
 *      
 */
router.get('/',async (req,res,next)=>{
    try{
        const results = await User.find()
        res.send(results)
    }catch(error){
        console.log(error.message)
    }
})
/**
 * @swagger
 * /Users:
 *  post:
 *      summary: Crear un usuario
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Usuario creado
 */

router.post('/',async (req,res,next)=>{
    try{
        const user = new User(req.body);
        const result = await user.save();
        res.send(result);
    }catch(error){
        console.log(error.message);
    }
});
/**
 * @swagger
 * /Users/{id}:
 *  delete:
 *      summary: Borrar usuario
 *      tags: [Users]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           required: true
 *           description: user id
 *      responses:
 *        200:
 *          description: Usuario borrado
 *      
 */
router.delete('/:id',async (req,res,next)=>{
    const id =req.params.id;
    try{
        const result = await User.findByIdAndDelete(id);
        res.send(result);
    }catch(error){
        console.log(error.message);
    }
});

/**
 * @swagger
 * /Users/{id}:
 *  patch:
 *   summary: Actualizar Usuario
 *   tags: [Users]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: User id
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *      schema:
 *        type: object
 *        $ref: '#/components/schemas/Message'
 *  responses:
 *      200:
 *          description: Usuario Actualizado
 *      
 */

router.patch('/:id',async (req,res,next)=>{
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = {new : true};

        const result = await User.findByIdAndUpdate(id,updates);
        res.send(result)
    } catch (error){
        console.log(error.message)
    }
});
module.exports= router;
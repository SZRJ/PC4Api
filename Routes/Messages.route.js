const express = require('express');
const router = express.Router();

const Message = require('../Models/Messages.model')

/**
 * @swagger
 * components:
 *  schemas:
 *    Message:
 *      type: object
 *      properties:
 *          senderId:
 *            type: ObjectId
 *            description: Id del que mando el mensaje
 *          recipientId:
 *            type: ObjectId
 *            description: Id del que recibe el mensaje
 *          content:
 *            type: string
 *            description: Contenido del mensaje
 *          sentDate:
 *            type: date
 *            description: Fecha que se envia el mensaje
 *          readDate:
 *            type: date
 *            description: Fecha en que leyo el mensaje
 *      required:
 *        -senderID
 *        -content
 *        -sentDate
 *      example:
 *         senderID: 263165sd4f65s
 *         recipientId: 1651651651651sds
 *         content: Hola
 *         sentDate: 2016/08/20
 *         readDate: 2016/09/20
 */ 


/**
 * @swagger
 * /Messages:
 *  get:
 *      summary: Ver todos los Mensajes
 *      tags: [Messages]
 *      responses:
 *        200:
 *          description: Todos los Mensajes
 *          content:
 *              application/json:
 *                  schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *      
 */
router.get('/',async (req,res,next)=>{
    try{
        const results = await Message.find()
        res.send(results)
    }catch(error){
        console.log(error.message)
    }
})

/**
 * @swagger
 * /Messages:
 *  post:
 *      summary: Publicar un mensaje 
 *      tags: [Messages]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Message'
 *      responses:
 *        200:
 *          description: Mensaje creado
 */
router.post('/',async (req,res,next)=>{
    const id =req.params.id;
    try{
        
        const message = new Message(req.body);
        const result = await message.save();
        res.send(result);
    }catch(error){
        console.log(error.message);
    }
});

/**
 * @swagger
 * /Messages/{id}:
 *  delete:
 *      summary: Borrar mensaje
 *      tags: [Messages]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *              type: string
 *           required: true
 *           description: Mensaje id
 *      responses:
 *        200:
 *          description: Mensaje borrado
 *      
 */

router.delete('/:id',async (req,res,next)=>{
    const id =req.params.id;
    try{
        const result = await Message.findByIdAndDelete(id);
        res.send(result);
    }catch(error){
        console.log(error.message);
    }
});

/**
 * @swagger
 * /Messages/{id}:
 *  patch:
 *   summary: Actualizar Mensaje
 *   tags: [Messages]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *      type: string
 *      required: true
 *      description: Mensaje id
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *      schema:
 *        type: object
 *        $ref: '#/components/schemas/Message'
 *  responses:
 *      200:
 *          description: Mensaje Actualizado
 *      
 */
router.patch('/:id',async (req,res,next)=>{
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = {new : true};

        const result = await Message.findByIdAndUpdate(id,updates);
        res.send(result)
    } catch (error){
        console.log(error.message)
    }
});
module.exports= router;
import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';
import { response } from 'express';

@Controller('mensajes')
export class MensajesController {

    constructor(private MensajesService: MensajesService){

    }

    @Post()
    create (@Body() createMensajeDto: CreateMensajeDto, @Res() response){
        this.MensajesService.createMensaje(createMensajeDto).then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creacion del mensaje'});
        });
    }

    @Get()
    getAll(@Res() response){
        this.MensajesService.getAll().then(mensajeList => {
            response.status(HttpStatus.OK).json(mensajeList);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la obtención del mensaje'});
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje){
        this.MensajesService.updateMensaje(idMensaje, updateMensajeDto).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la edición del mensaje'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje){
        this.MensajesService.deleteMensaje(idMensaje).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la eliminación del mensaje'});
        });
    }

}

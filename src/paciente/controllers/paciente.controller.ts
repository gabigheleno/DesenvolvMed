import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Put } from "@nestjs/common";
import { Paciente } from "../entities/paciente.entity";
import { PacienteService } from "../services/paciente.service";

@Controller('/paciente')
export class PacienteController {
    
    constructor(
        private readonly service : PacienteService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Paciente[]> {
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id : number) : Promise<Paciente> {
        return this.service.findById(id)
    }

    //@Put()
    //@HttpCode(HttpStatus.OK)
    //update(@Body() paciente: Paciente): Promise<Paciente> {
        //return this.service.update(paciente)
   // }
}
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Comentario } from "../entities/comentario.entity";

@Injectable()
export class ComentarioService {
    
    constructor(
        @InjectRepository(Comentario)
        private comentarioRepository : Repository<Comentario>
    ){}

    async create(comentario: Comentario): Promise<Comentario>{
        return this.comentarioRepository.save(comentario)
    }

    async findAll(): Promise<Comentario[]> {
        
        return this.comentarioRepository.find({
            relations: {
                postagem: true,
                cadastro: true
            }
        })
 
    }

    async findById(id: number): Promise<Comentario> {

        let comentario_search = await this.comentarioRepository.findOne({
            where : {
                id
            } , relations: {
                postagem: true,
                cadastro: true
            }
        })

        if(!comentario_search){
           throw new HttpException('Comentário nao encontrado!', HttpStatus.NOT_FOUND)
        }

        return comentario_search
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let comentario_delete = this.findById(id)

        if(!comentario_delete){
            throw new HttpException('Comentário nao encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.comentarioRepository.delete(id)
    }

    async update(comentario : Comentario): Promise<Comentario> {

        let comentario_update = await this.findById(comentario.id)

        if(!comentario_update || !comentario.id){
            throw new HttpException('Comentário nao encontrado!', HttpStatus.NOT_FOUND)
        }

        return this.comentarioRepository.save(comentario_update)
    }

}
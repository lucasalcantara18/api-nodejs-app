const connection = require('../database/connection');

 

module.exports = {
    async create(request, response) {
      const { title, description, value} = request.body;
      const ong_id = request.headers.auth;
        
      const [id] = await connection('incidents').insert({
          title,
          description,
          value,
          ong_id
      });


     
      return response.json({ id });
    },    
    async list(request, response){

        const [count] = await connection('incidents').count()
        console.log(count);
        

        const {page = 1} = request.query;
        const incidents = await connection('incidents').join("ongs", "ongs.id", "=", "incidents.ong_id").limit(5).offset((page - 1) * 5).select(["incidents.*", "ongs.name", "ongs.uf"]);


        response.header('X-Total-Count', count['count(*)']);//mandando a responta do contador pelo header do response
        return response.send(incidents);
    },
    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.auth;//pegando o id da ong pelo header do request

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if(incident.ong_id == ong_id){
            await connection('incidents').where('id', id).delete();
            return response.status(204).send();
        }else{
            return response.status(401).json({error: "Operação negada"})
        }

    }, async get(request, response){

        const ong_id = request.headers.auth;
        const incident = await connection("incidents").where('ong_id', ong_id).select("*");

        return response.json(incident);
        
    
      }
  
  
  
  };
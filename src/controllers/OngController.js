const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');


module.exports = {
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id });
  },
  async list(request, response){
    const ongs = await connection('ongs').select("*");
    return response.send(ongs);
  },
  async alter(request, response){
      
    const ong = request.body;
    const ong_id = request.headers.auth;

    const ong_old = await connection('ongs').where("id", ong_id).select("*").first();

    console.log(ong_old);
    
    if(ong_old){
        await connection("ongs").where("id", ong_id).update({
            id: ong.id,
            name: ong.name,
            email: ong.email,
            whatsapp: ong.whatsapp,
            city: ong.city,
            uf: ong.uf
        })
        return response.status(204).send();
    }else{
        return response.status(401).json({error: "Operação negada"});
    }


  }
};
